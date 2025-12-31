
import { useEffect } from 'react';
import { supabase } from './services/supabaseClient';


export default function Login() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error('Google login error:', error);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log('User logged in:', session.user);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
