import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('=== DEBUG API CALLED ===');
    
    // Check environment variables
    const hasApiKey = !!process.env.AIRTABLE_API_KEY;
    const hasBaseId = !!process.env.AIRTABLE_BASE_ID;
    
    console.log('Env vars - API Key:', hasApiKey, 'Base ID:', hasBaseId);
    
    // Try to parse form data
    let formData;
    try {
      formData = await request.formData();
      console.log('Form data parsed successfully');
    } catch (formError) {
      console.log('Form data parse error:', formError);
    }

    // Return debug info
    return NextResponse.json({
      success: true,
      debug: true,
      environment: {
        hasApiKey,
        hasBaseId,
        apiKeyLength: hasApiKey ? process.env.AIRTABLE_API_KEY!.length : 0,
        baseIdLength: hasBaseId ? process.env.AIRTABLE_BASE_ID!.length : 0,
      },
      message: 'Debug endpoint working'
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      {
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}