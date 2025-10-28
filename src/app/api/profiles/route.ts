import { NextResponse } from 'next/server';
import { profilesTable } from '../../../lib/airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const record = await profilesTable.create([
      {
        fields: {
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
        }
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      id: record[0].id 
    });
    
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}