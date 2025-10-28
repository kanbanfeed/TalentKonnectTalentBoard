import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!,
}).base(process.env.AIRTABLE_BASE_ID!);

export const profilesTable = base('Profiles');

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
  resume?: any[];
}

export async function createProfile(data: Omit<Profile, 'id'>) {
  return profilesTable.create([{ fields: data }]);
}

export async function getProfiles() {
  try {
    const records = await profilesTable.select({
      filterByFormula: "{status} = 'Active'"
    }).firstPage();
    
    return records.map(record => ({
      id: record.id,
      full_name: record.fields.full_name as string,
      email: record.fields.email as string,
      spark_line: record.fields.spark_line as string,
      skills: record.fields.skills as string[],
      city: record.fields.city as string,
      price_usd: record.fields.price_usd as number,
      price_local: record.fields.price_local as string,
      availability: record.fields.availability as string,
      status: record.fields.status as string,
      youtube_link: record.fields.youtube_link as string,
    })) as Profile[];
  } catch (error) {
    console.error('Error fetching profiles from Airtable:', error);
    return [];
  }
}

export async function getActiveProfiles() {
  const profiles = await getProfiles();
  return profiles.filter(profile => profile.status === 'Active');
}