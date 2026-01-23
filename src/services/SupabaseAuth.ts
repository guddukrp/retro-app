import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { App as CapApp } from "@capacitor/app";

const syncUserProfile = async (session: Session) => {
  const { user } = session;
  const userProfile = {
    id: user.id,
    email: user.email || null,
    name: user.user_metadata.full_name || user.user_metadata.name || null,
    image: user.user_metadata.avatar_url || user.user_metadata.picture || null,
    provider: user.app_metadata.provider || null,
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userProfile));

  const { error } = await supabase.from("user").upsert(userProfile);
  if (error) {
    console.error("Error syncing user profile:", error);
  }
};

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) syncUserProfile(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        syncUserProfile(session);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
};

export const useBackButton = () => {
  useEffect(() => {
    CapApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        CapApp.exitApp();
      }
    });
  }, []);
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        prompt: "select_account",
      },
    },
  });
  if (error) console.error('Google login error:', error);
  return { error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Sign out error:', error);
  return { error };
};
