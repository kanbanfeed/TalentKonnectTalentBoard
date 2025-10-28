// app/api/profiles/route.ts
import { NextResponse } from 'next/server';
import Airtable, { FieldSet, Records } from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!,
}).base(process.env.AIRTABLE_BASE_ID!);

const profilesTable = base('Profiles');

interface ProfileFields extends FieldSet {
  full_name?: string;
  email?: string;
  spark_line?: string;
  skills?: string[];
  city?: string;
  price_usd?: number;
  price_local?: string;
  availability?: string;
  youtube_link?: string;
  photo_url?: string;
  status?: string;
  resume?:[];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const spark_line = formData.get('spark_line');
    const skills = formData.get('skills');
    const city = formData.get('city');
    const price_usd = formData.get('price_usd');
    const price_local = formData.get('price_local');
    const availability = formData.get('availability');
    const youtube_link = formData.get('youtube_link');
    const resume = formData.get('resume');

    // Validate required fields and types
    if (
      typeof full_name !== 'string' || !full_name ||
      typeof email !== 'string' || !email ||
      typeof spark_line !== 'string' || !spark_line ||
      typeof city !== 'string' || !city ||
      typeof price_usd !== 'string' || !price_usd
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    const airtableData: ProfileFields = {
      full_name,
      email,
      spark_line,
      skills: typeof skills === 'string' ? JSON.parse(skills) : [],
      city,
      price_usd: Number(price_usd),
      price_local: typeof price_local === 'string' ? price_local : '',
      availability: typeof availability === 'string' ? availability : '',
      youtube_link: typeof youtube_link === 'string' ? youtube_link : '',
      status: 'Active',
      // resume: handle separately if needed
    };

    if (resume instanceof File && resume.size > 0) {
      console.log('Resume file received:', resume.name, resume.size);
      // Upload handling here if needed
    }

    const record = await profilesTable.create([{ fields: airtableData }]);

    return NextResponse.json({
      success: true,
      id: record[0].id,
      message: 'Profile created successfully in Airtable'
    });

  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    console.error('Error creating profile:', message);
    return NextResponse.json(
      {
        error: 'Failed to create profile',
        details: message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records: Records<ProfileFields> = await profilesTable.select({
      filterByFormula: "{status} = 'Active'",
      maxRecords: 100
    }).firstPage();

    const profiles = records.map(record => ({
      id: record.id,
      full_name: record.fields.full_name ?? '',
      email: record.fields.email ?? '',
      spark_line: record.fields.spark_line ?? '',
      skills: Array.isArray(record.fields.skills) ? record.fields.skills : [],
      city: record.fields.city ?? '',
      price_usd: record.fields.price_usd ?? 0,
      price_local: record.fields.price_local ?? '',
      availability: record.fields.availability ?? '',
      status: record.fields.status ?? 'Active',
      youtube_link: record.fields.youtube_link ?? '',
      photo_url: record.fields.photo_url ?? '',
    }));

    return NextResponse.json({
      success: true,
      profiles
    });

  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    console.error('Error fetching profiles:', message);
    return NextResponse.json(
      {
        error: 'Failed to fetch profiles',
        details: message,
      },
      { status: 500 }
    );
  }
}
