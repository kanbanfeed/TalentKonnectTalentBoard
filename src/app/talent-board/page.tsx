import { getActiveProfiles } from '../../lib/airtable';

export default async function TalentBoardPage() {
  const profiles = await getActiveProfiles();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔍 Find a skill. Book it tonight.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From vodka cocktails to party planning to resume makeovers — discover real people ready to help now.
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg max-w-md mx-auto">
            <p className="font-semibold">🎉 Profile Created Successfully!</p>
            <p className="text-sm">You are now visible on the Talent Board</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Skill Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Skills</option>
                <option>Resume Writer</option>
                <option>Indian Cooking</option>
                <option>Music Vocals</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Any Budget</option>
                <option>Under $20</option>
                <option>$20 - $50</option>
                <option>Over $50</option>
              </select>
            </div>

            {/* When Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">When</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Any Time</option>
                <option>Tonight</option>
                <option>Within 24h</option>
                <option>This Week</option>
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Cities</option>
                <option>Pune</option>
                <option>Mumbai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <div key={profile.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {/* Profile Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{profile.full_name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{profile.city}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {profile.availability}
                  </div>
                </div>
                <p className="text-gray-700 mt-3 line-clamp-2">{profile.spark_line}</p>
              </div>

              {/* Skills */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 3).map(skill => (
                    <span 
                      key={skill} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${profile.price_usd}</span>
                    <span className="text-gray-600 ml-2">({profile.price_local})</span>
                  </div>
                  <div className="text-sm text-gray-500">45-min video</div>
                </div>

                <div className="flex gap-3">
                  {profile.youtube_link && (
                    <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2">
                      <span>▶</span> Play Intro
                    </button>
                  )}
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                    Book ${profile.price_usd}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {profiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600">Be the first to create a profile and showcase your skills!</p>
          </div>
        )}
      </div>
    </div>
  );
}