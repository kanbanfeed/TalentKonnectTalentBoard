import { getActiveProfiles } from '../../lib/airtable';

export default async function TestAirtable() {
  try {
    const profiles = await getActiveProfiles();
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Airtable Connection Test</h1>
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <p className="text-green-800">✅ Successfully connected to Airtable!</p>
          <p className="text-sm mt-2">Found {profiles.length} active profiles.</p>
        </div>

        <div className="grid gap-4">
          {profiles.map(profile => (
            <div key={profile.id} className="border rounded-lg p-4 bg-white shadow">
              <h3 className="font-bold text-lg">{profile.full_name}</h3>
              <p className="text-gray-600">{profile.spark_line}</p>
              <div className="flex gap-2 mt-2">
                {profile.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {profile.city} • ${profile.price_usd} ({profile.price_local}) • {profile.availability}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Airtable Connection Test</h1>
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-800">❌ Failed to connect to Airtable</p>
          <p className="text-sm mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
  }
}