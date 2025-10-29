import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    apiKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
    baseIdPrefix: process.env.AIRTABLE_BASE_ID?.substring(0, 10) || 'none'
  });
}