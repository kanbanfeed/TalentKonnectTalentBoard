// export default function CreateProfilePage() {
//   const airtableFormUrl = "https://airtable.com/embed/app4W62sco26oE44X/pagywU0x4Rg2zLXoG/form"; // Replace with your actual URL

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Create Your MyTalentBoard Profile
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Showcase your skills in one line, select what you are good at, and get discovered instantly
//           </p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Info Banner */}
//           <div className="bg-blue-600 text-white p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="font-semibold text-lg">Your $7 payment has been processed!</h2>
//                 <p className="text-blue-100">You have 7 credits available in your wallet</p>
//               </div>
//               <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 Verified ✓
//               </div>
//             </div>
//           </div>

//           {/* Airtable Form */}
//           <div className="p-1">
//             <iframe 
//               className="w-full h-[600px] border-0"
//               src={airtableFormUrl}
//               title="TalentKonnect Profile Form"
//             />
//           </div>

//           {/* Footer Note */}
//           <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
//             <p className="text-gray-600 text-sm">
//               After submitting, you will appear on the Talent Board within 24 hours
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 text-center">
//           <a 
//             href="/talent-board"
//             className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
//           >
//             ← View Talent Board to see other profiles
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    spark_line: '',
    skills: [] as string[],
    city: '',
    price_usd: '',
    price_local: '',
    availability: 'Tonight',
    youtube_link: '',
  });

  const skillsOptions = [
    'Resume Writer', 'Financial Analyst', 'CTO', 'Software Developer', 
    'Web Designer', 'Data Scientist', 'Indian Cooking', 'Music Vocals',
    'Vodka Cocktails', 'Party Planning', 'Marketing Manager', 'Content Writer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price_usd: Number(formData.price_usd),
          status: 'Active'
        }),
      });

      if (response.ok) {
        router.push('/talent-board?success=true');
      } else {
        alert('Error creating profile. Please try again.');
      }
    } catch (error) {
      alert('Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      return { ...prev, skills };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your MyTalentBoard Profile
          </h1>
          <p className="text-xl text-gray-600">
            Showcase your skills and get discovered instantly
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">Your $7 payment has been processed!</h2>
              <p className="text-blue-100">You have 7 credits available in your wallet</p>
            </div>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Verified ✓
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {/* Spark Line */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Spark Line (256 characters) *
            </label>
            <textarea
              required
              maxLength={256}
              value={formData.spark_line}
              onChange={(e) => setFormData({...formData, spark_line: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="Describe what you do in one compelling line..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.spark_line.length}/256 characters
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (select up to 10) *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {skillsOptions.map(skill => (
                <label key={skill} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Selected: {formData.skills.length}/10
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your city"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.price_usd}
                onChange={(e) => setFormData({...formData, price_usd: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Equivalent *
              </label>
              <input
                type="text"
                required
                value={formData.price_local}
                onChange={(e) => setFormData({...formData, price_local: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="₹2,000"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Tonight', '24h', 'This Week', 'Weekend'].map(option => (
                <label key={option} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    checked={formData.availability === option}
                    onChange={() => setFormData({...formData, availability: option})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Intro Video (Optional)
            </label>
            <input
              type="url"
              value={formData.youtube_link}
              onChange={(e) => setFormData({...formData, youtube_link: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://youtube.com/your-video"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Profile...' : 'Create My Talent Profile'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            You will appear on the Talent Board instantly after submission
          </p>
        </form>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <a 
            href="/talent-board"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← View Talent Board to see other profiles
          </a>
        </div>
      </div>
    </div>
  );
}