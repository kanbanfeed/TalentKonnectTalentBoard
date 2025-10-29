import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY!,
    }).base(process.env.AIRTABLE_BASE_ID!);

    // Test with minimal required fields only
    const testRecord = {
      fields: {
        full_name: 'Test User Simple',
        email: 'simpletest@example.com', // Valid email format
        spark_line: 'Simple test profile',
        city: 'Test City',
        price_usd: 25,
        status: 'Active',
        // Skip optional fields for this test
      }
    };

    console.log('🧪 Testing with simple record:', testRecord);
    
    const records = await base('Profiles').create([testRecord]);
    const recordId = records[0].getId();

    return NextResponse.json({
      success: true,
      message: 'Simple test successful!',
      recordId: recordId
    });

  } catch (error: any) {
    console.error('💥 Simple test failed:', error);
    
    let errorDetails = 'Unknown error';
    if (error.error) {
      errorDetails = JSON.stringify(error.error);
    } else if (error.message) {
      errorDetails = error.message;
    }

    return NextResponse.json({
      success: false,
      error: 'Simple test failed',
      details: errorDetails
    }, { status: 500 });
  }
}