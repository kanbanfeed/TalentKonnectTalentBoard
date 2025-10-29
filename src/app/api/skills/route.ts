import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base( process.env.AIRTABLE_BASE_ID);

  try {
    const records = await base('Profiles').select({
      // Add filter if needed
      maxRecords: 100
    }).firstPage();

    // Collect all skill values from all profiles
    const allSkills = records.flatMap(record => Array.isArray(record.fields.skills) ? record.fields.skills : []);

    // Get unique skills
    const uniqueSkills = Array.from(new Set(allSkills));

    return NextResponse.json({ success: true, skills: uniqueSkills });

  } catch (error) {
    console.error('Failed to fetch skills', error);
    return NextResponse.json({ success: false, skills: [] });
  }
}
