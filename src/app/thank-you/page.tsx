export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to TalentKonnect!
        </h1>
        
        <div className="text-left mb-6">
          <p className="text-gray-600 mb-4">
            You have unlocked your MyTalentBoard Profile — your mini showcase to share your skills and videos.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
              <span>Create your profile</span>
            </div>
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
              <span>See yourself on the Talent Board within 24 hours</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>You have earned 7 credits in your wallet!</strong>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <a 
            href="/create-profile"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 block"
          >
            Create MyTalentBoard Profile
          </a>
          <a 
            href="/talent-board"
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition duration-200 block"
          >
            View Talent Board
          </a>
        </div>
      </div>
    </div>
  );
}