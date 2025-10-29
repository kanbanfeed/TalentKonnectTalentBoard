import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request: Request) {
  try {
    console.log('🔍 API Route Called - Testing Airtable Connection');

    // Check environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Environment variables missing' },
        { status: 500 }
      );
    }

    console.log('✅ Environment variables found');

    // Parse form data
    const formData = await request.formData();
    console.log('✅ FormData parsed');

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

    // Parse skills
    let skillsArray = [];
    try {
      skillsArray = skills ? JSON.parse(String(skills)) : [];
      console.log('✅ Skills parsed:', skillsArray);
    } catch (parseError) {
      console.error('❌ Skills parse error:', parseError);
      skillsArray = [];
    }

    // Test Airtable connection
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

    console.log('✅ Airtable base initialized');

    // Prepare record data with proper formatting
    const recordData = {
      fields: {
        full_name: String(full_name).trim(),
        email: String(email).trim().toLowerCase(), // Format email for email field type
        spark_line: String(spark_line).trim(),
        skills: skillsArray,
        city: String(city).trim(),
        price_usd: Number(price_usd),
        price_local: String(price_local || '').trim(),
        availability: String(availability || 'Tonight').trim(),
        youtube_link: String(youtube_link || '').trim(),
        status: 'Active',
      }
    };

    console.log('📦 Record data prepared:', JSON.stringify(recordData, null, 2));

    try {
      console.log('🔄 Creating Airtable record...');
      const records = await base('Profiles').create([recordData]);
      const recordId = records[0].getId();
      
      console.log('✅ Record created successfully:', recordId);

      return NextResponse.json({
        success: true,
        id: recordId,
        message: 'Profile created successfully in Airtable'
      });

    } catch (airtableError: any) {
      console.error('❌ Airtable create error:', airtableError);
      
      // More detailed error parsing
      let errorDetails = 'Unknown Airtable error';
      let fieldErrors = [];
      
      if (airtableError.error && airtableError.error.message) {
        errorDetails = airtableError.error.message;
      } else if (airtableError.message) {
        errorDetails = airtableError.message;
      }
      
      // Check for field-specific errors
      if (airtableError.error && airtableError.error.errors) {
        fieldErrors = airtableError.error.errors;
        console.error('🔍 Field errors:', fieldErrors);
      }

      return NextResponse.json(
        {
          error: 'Airtable creation failed',
          details: errorDetails,
          fieldErrors: fieldErrors,
          attemptedData: recordData // Include what we tried to send
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('💥 General API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message
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
    return NextResponse.json({ success: true, profiles: [] });
  }
}