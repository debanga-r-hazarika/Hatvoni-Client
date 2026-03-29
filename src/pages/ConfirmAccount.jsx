import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ConfirmAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3">Account Created!</h2>
            <p className="text-slate-600 mb-8">
              Welcome to Hatvoni Heritage
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-slate-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">Your account is ready to use</p>
                  <p className="text-sm text-slate-600">
                    You can now access your profile and start shopping for authentic heritage products.
                  </p>
                  {email && (
                    <p className="text-sm text-slate-500 mt-2">
                      Account email: <span className="font-medium text-slate-700">{email}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/profile"
                className="block w-full py-3 px-4 bg-slate-900 text-white text-center rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
              >
                Go to My Profile
              </Link>
              <Link
                to="/products"
                className="block w-full py-3 px-4 bg-white border-2 border-slate-300 text-slate-700 text-center rounded-lg font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
              >
                Start Shopping
              </Link>
              <Link
                to="/"
                className="block w-full py-2 text-slate-600 text-center text-sm hover:text-slate-900 transition-colors duration-200"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Questions? Contact us at{' '}
          <a href="mailto:hello@hatvoni.com" className="font-medium text-slate-700 hover:text-slate-900 underline">
            hello@hatvoni.com
          </a>
        </p>
      </div>
    </div>
  );
}
