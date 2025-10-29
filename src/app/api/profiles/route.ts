import { NextResponse } from 'next/server';
import Airtable from 'airtable';


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form data
    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const spark_line = formData.get('spark_line');
    const skills = formData.get('skills');
    const city = formData.get('city');
    const price_usd = formData.get('price_usd');
    const price_local = formData.get('price_local');
    const availability = formData.get('availability');
    const youtube_link = formData.get('youtube_link');

    // Basic validation
    if (!full_name || !email || !spark_line || !city || !price_usd) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Airtable is configured
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Service not configured properly' },
        { status: 500 }
      );
    }

 
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

    // Create record in Airtable
    const records = await base('Profiles').create([
      {
        fields: {
          full_name: String(full_name),
          email: String(email),
          spark_line: String(spark_line),
          skills: skills ? JSON.parse(String(skills)) : [],
          city: String(city),
          price_usd: Number(price_usd),
          price_local: String(price_local || ''),
          availability: String(availability || 'Tonight'),
          youtube_link: String(youtube_link || ''),
          status: 'Active',
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      id: records[0].getId(),
      message: 'Profile created successfully'
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create profile',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if Airtable is configured
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json({ success: true, profiles: [] });
    }

    const Airtable = require('airtable');
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

    const records = await base('Profiles')
      .select({ 
        filterByFormula: "{status} = 'Active'",
        maxRecords: 100 
      })
      .firstPage();

    const profiles = records.map((record: any) => ({
      id: record.id,
      full_name: record.fields.full_name || '',
      email: record.fields.email || '',
      spark_line: record.fields.spark_line || '',
      skills: Array.isArray(record.fields.skills) ? record.fields.skills : [],
      city: record.fields.city || '',
      price_usd: record.fields.price_usd || 0,
      price_local: record.fields.price_local || '',
      availability: record.fields.availability || '',
      status: record.fields.status || 'Active',
      youtube_link: record.fields.youtube_link || '',
      photo_url: record.fields.photo_url || '',
    }));

    return NextResponse.json({ success: true, profiles });

  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { success: true, profiles: [] },
      { status: 200 }
    );
  }
}