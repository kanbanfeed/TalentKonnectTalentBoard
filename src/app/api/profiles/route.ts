import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('=== PROFILE CREATION STARTED ===');

    // Check environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('MISSING ENVIRONMENT VARIABLES');
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          details: 'Airtable environment variables not set'
        },
        { status: 500 }
      );
    }
console.log('API Key:', process.env.AIRTABLE_API_KEY);
console.log('Base ID:', process.env.AIRTABLE_BASE_ID);

    const Airtable = require('airtable');
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

    const formData = await request.formData();

    // Extract and validate data
    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const spark_line = formData.get('spark_line');
    const skills = formData.get('skills');
    const city = formData.get('city');
    const price_usd = formData.get('price_usd');
    const price_local = formData.get('price_local');
    const availability = formData.get('availability');
    const youtube_link = formData.get('youtube_link');

    // Simple validation
    if (!full_name || !email || !spark_line || !city || !price_usd) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fields = {
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
    };

    console.log('Creating Airtable record with:', fields);

    // Create record
    const records = await base('Profiles').create([{ fields }]);
    const record = records[0];

    console.log('Record created successfully:', record.id);

    return NextResponse.json({
      success: true,
      id: record.id,
      message: 'Profile created successfully'
    });

  } catch (error: any) {
    console.error('FULL ERROR DETAILS:', error);
    
    // More detailed error logging
    let errorDetails = 'Unknown error';
    if (error.error) {
      errorDetails = JSON.stringify(error.error);
    } else if (error.message) {
      errorDetails = error.message;
    }

    return NextResponse.json(
      {
        error: 'Failed to create profile',
        details: errorDetails,
        type: error?.name || 'Unknown'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
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

    const profiles = records.map(record => ({
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
      { success: true, profiles: [], error: 'Failed to fetch from Airtable' },
      { status: 200 } // Don't fail the page load
    );
  }
}