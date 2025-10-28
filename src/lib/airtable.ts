import Airtable from 'airtable';

// Only initialize if we have the required environment variables
let base;
let profilesTable;

if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
  base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);

  profilesTable = base('Profiles');
} else {
  console.warn('Airtable environment variables not found. Using fallback data.');
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  spark_line: string;
  skills: string[];
  city: string;
  price_usd: number;
  price_local: string;
  availability: string;
  status: string;
  youtube_link?: string;
  resume?: any; // Add resume field
}

export async function getActiveProfiles(): Promise<Profile[]> {
  // If Airtable isn't configured, return empty array
  if (!profilesTable) {
    return [];
  }

  try {
    const records = await profilesTable.select({
      filterByFormula: "{status} = 'Active'"
    }).firstPage();
    
    return records.map(record => ({
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
    })) as Profile[];
  } catch (error) {
    console.error('Error fetching profiles from Airtable:', error);
    return [];
  }
}