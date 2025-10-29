// app/api/skills/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // Check if environment variables exist
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json({ 
        success: true, 
        skills: [] 
      });
    }

    // Now TypeScript knows these are not undefined
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);

    const records = await base('Skills')
      .select({ 
        filterByFormula: "{status} = 'Active'",
        maxRecords: 100 
      })
      .firstPage();

    const skills = records.map((record: any) => record.fields.name).filter(Boolean);

    return NextResponse.json({ success: true, skills });

  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ success: true, skills: [] });
  }
}