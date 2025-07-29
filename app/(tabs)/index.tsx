import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenHeight < 700;

const NAVIGATION_BUTTONS = [
  {
    id: 'gurdwaras',
    title: 'Gurdwaras',
    subtitle: 'Discover Sacred Sites',
    icon: '🏛️',
    route: '/index',
    color: '#FF9933', // Primary saffron
  },
  {
    id: 'itinerary',
    title: 'My Itinerary',
    subtitle: 'Plan Your Journey',
    icon: '📋',
    route: '/itinerary',
    color: '#000080', // Deep blue
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Religious Celebrations',
    icon: '🎉',
    route: '/events',
    color: '#228B22', // Forest green
  },
  {
    id: 'data',
    title: 'Buy Data',
    subtitle: 'Network Packages',
    icon: '📶',
    route: '/services',
    color: '#9C27B0', // Purple
  },
  {
    id: 'sos',
    title: 'SOS Button',
    subtitle: 'Emergency Help',
    icon: '🆘',
    route: '/emergency',
    color: '#F44336', // Red
  },
  {
    id: 'auth',
    title: 'Authorization',
    subtitle: 'QR Code Entry',
    icon: '🔐',
    route: '/services',
    color: '#607D8B', // Blue grey
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const navigateToScreen = (route: string) => {
    router.push(route as any);
  };

  const renderButton = (button: typeof NAVIGATION_BUTTONS[0], index: number) => {
    return (
      <TouchableOpacity
        key={button.id}
        style={[
          styles.button,
          { 
            backgroundColor: colors.card,
            shadowColor: colorScheme === 'dark' ? '#000' : '#000',
            borderColor: colors.border,
          }
        ]}
        onPress={() => navigateToScreen(button.route)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: button.color + '15' }]}>
          <ThemedText style={[styles.buttonIcon, { color: button.color }]}>
            {button.icon}
          </ThemedText>
        </View>

        <View style={styles.buttonTextContainer}>
          <ThemedText 
            style={[styles.buttonTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {button.title}
          </ThemedText>
          <ThemedText 
            style={[styles.buttonSubtitle, { color: colors.icon }]}
            numberOfLines={1}
          >
            {button.subtitle}
          </ThemedText>
        </View>

        <View style={[styles.chevron, { backgroundColor: button.color + '20' }]}>
          <ThemedText style={[styles.chevronText, { color: button.color }]}>
            ›
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.welcomeTitle, { color: colors.primary }]}>
          Sikh Pilgrimage
        </ThemedText>
        <ThemedText style={[styles.welcomeSubtitle, { color: colors.text }]}>
          Your spiritual journey through Pakistan
        </ThemedText>
      </View>

      {/* Navigation Grid */}
      <View style={styles.gridContainer}>
        {NAVIGATION_BUTTONS.map((button, index) => renderButton(button, index))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <ThemedText style={[styles.footerText, { color: colors.icon }]}>
          ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 20 : 30,
  },
  welcomeTitle: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    gap: isSmallScreen ? 12 : 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallScreen ? 16 : 20,
    borderRadius: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    minHeight: isSmallScreen ? 75 : 85,
  },
  iconContainer: {
    width: isSmallScreen ? 50 : 56,
    height: isSmallScreen ? 50 : 56,
    borderRadius: isSmallScreen ? 25 : 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonIcon: {
    fontSize: isSmallScreen ? 24 : 28,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  buttonSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    opacity: 0.7,
  },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});