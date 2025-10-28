import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Initialize Airtable directly in the API route
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!,
}).base(process.env.AIRTABLE_BASE_ID!);

const profilesTable = base('Profiles');

export async function POST(request: Request) {
  // Check if environment variables are set
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return NextResponse.json(
      { error: 'Server configuration error: Airtable credentials missing' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['full_name', 'email', 'spark_line', 'skills', 'city', 'price_usd', 'price_local', 'availability'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare fields for Airtable
    const fields: any = {
      full_name: body.full_name,
      email: body.email,
      spark_line: body.spark_line,
      skills: body.skills,
      city: body.city,
      price_usd: body.price_usd,
      price_local: body.price_local,
      availability: body.availability,
      youtube_link: body.youtube_link || '',
      status: 'Active'
    };

    // Add resume field if provided
    if (body.resume) {
      fields.resume = body.resume;
    }

    const record = await profilesTable.create([
      {
        fields: fields
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      id: record[0].id,
      message: 'Profile created successfully'
    });
    
  } catch (error: any) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create profile',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Add GET method for fetching profiles
export async function GET() {
  // Check if environment variables are set
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return NextResponse.json(
      { error: 'Server configuration error: Airtable credentials missing' },
      { status: 500 }
    );
  }

  try {
    const records = await profilesTable.select({
      filterByFormula: "{status} = 'Active'"
    }).firstPage();
    
    const profiles = records.map(record => ({
      id: record.id,
      full_name: record.fields.full_name as string || '',
      email: record.fields.email as string || '',
      spark_line: record.fields.spark_line as string || '',
      skills: record.fields.skills as string[] || [],
      city: record.fields.city as string || '',
      price_usd: record.fields.price_usd as number || 0,
      price_local: record.fields.price_local as string || '',
      availability: record.fields.availability as string || '',
      status: record.fields.status as string || 'Active',
      youtube_link: record.fields.youtube_link as string || '',
      resume: record.fields.resume || null, // Add resume field
    }));

    return NextResponse.json({ 
      success: true, 
      profiles 
    });
    
  } catch (error: any) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch profiles',
        details: error.message 
      },
      { status: 500 }
    );
  }
}