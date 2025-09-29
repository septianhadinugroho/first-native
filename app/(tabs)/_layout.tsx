import { useAuth } from '@/context/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator className="flex-1 bg-background dark:bg-dark-background" />;
  }

  // Jika tidak ada sesi dan loading selesai, redirect ke login
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#93c5fd' : '#1d4ed8',
        tabBarInactiveTintColor: isDark ? '#94a3b8' : '#64748b',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#0f172a' : '#eff6ff',
          borderTopColor: isDark ? '#1e293b' : '#dbeafe',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="note-multiple" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}