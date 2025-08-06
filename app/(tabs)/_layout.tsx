
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="phone.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="travel-essentials"
        options={{
          title: 'Essentials',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="backpack" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gurdwaras"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          href: null, // Hide from tab bar since it's accessed from main buttons
        }}
      />
      <Tabs.Screen
        name="authorization"
        options={{
          href: null, // Hide from tab bar since it's accessed from main buttons
        }}
      />
    </Tabs>
  );
}
