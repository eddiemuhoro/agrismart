import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Auth from "@/components/authentication/Auth";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ThemedView } from "@/components/ThemedView";
import { Redirect } from "expo-router";

const index = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemedView>
      {session && session.user ? <Redirect href="/(tabs)/" /> : <Auth />}
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({});
