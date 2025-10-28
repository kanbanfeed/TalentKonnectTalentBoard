export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">TalentKonnect</div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/talent-board" className="text-gray-600 hover:text-blue-600 font-medium">
                Browse Talents
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Showcase Your Skills,
            <span className="block text-blue-600">Get Booked Instantly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From <span className="font-semibold">vodka cocktails</span> to <span className="font-semibold">party planning</span> to <span className="font-semibold">resume makeovers</span> — 
            discover real people ready to help <span className="text-green-600 font-semibold">tonight</span>.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your One-Time $7 Ticket to Endless Opportunities
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Create Your Profile</h3>
                <p className="text-gray-600 text-sm">Showcase your skills in one compelling line</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Discovered</h3>
                <p className="text-gray-600 text-sm">Appear in searches instantly</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Earn Money</h3>
                <p className="text-gray-600 text-sm">Get paid for what you love doing</p>
              </div>
            </div>

            {/* Stripe Payment Button */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to Showcase Your Talent?</h3>
              <p className="mb-6 opacity-90">One-time $7 payment • Lifetime access • 7 credits included</p>
              
              <a 
                href="https://buy.stripe.com/test_dRm4gBdqEdsq4gueKa3cc03" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold text-lg py-4 px-12 rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg hover:shadow-xl"
              >
                🚀 Get Your Talent Profile - $7 One-Time
              </a>
              
              <p className="text-sm opacity-80 mt-4">
                Secure payment via Stripe • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How TalentKonnect Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Pay Once, Access Forever</h3>
                    <p className="text-gray-600">A single $7 payment unlocks your permanent spot in our talent marketplace.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Create Your Mini-Showcase</h3>
                    <p className="text-gray-600">Build your profile with skills, intro video, and availability in minutes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Get Discovered & Booked</h3>
                    <p className="text-gray-600">When people search for skills, you appear instantly. Get paid for 45-minute video calls.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h4 className="font-semibold text-lg mb-4">What You Get for $7:</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Lifetime profile access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>7 booking credits included</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Up to 10 skills showcase</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Video intro support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Instant visibility in searches</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Keep 100% of your earnings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Skills That Get Booked
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            From professional services to creative talents and everything in between
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              'Resume Writer', 'Financial Analyst', 'Indian Cooking', 'Music Vocals',
              'Vodka Cocktails', 'Party Planning', 'Web Design', 'Career Coaching'
            ].map(skill => (
              <div key={skill} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <span className="font-medium text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600">
            And 500+ more skills waiting to be discovered...
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Monetize Your Skills?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the live skill marketplace where real people find real help, instantly.
          </p>
          
          <a 
            href="https://buy.stripe.com/test_dRm4gBdqEdsq4gueKa3cc03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-blue-600 font-bold text-lg py-4 px-12 rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg hover:shadow-xl"
          >
            🚀 Start Earning Today - $7
          </a>
          
          <p className="text-blue-200 mt-4 text-sm">
            No recurring fees • One-time payment • Instant access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">TalentKonnect</div>
          <p className="text-gray-400 mb-8">
            The live skill marketplace connecting talent with opportunity
          </p>
          <div className="text-gray-500 text-sm">
            © 2024 TalentKonnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}