import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenHeight < 700;

const MAIN_BUTTONS = [
  {
    id: 'gurdwaras',
    title: 'Gurdwaras',
    subtitle: 'Sacred Sites',
    icon: '🏛️',
    route: '/gurdwaras',
    color: '#FF9933',
  },
  {
    id: 'itinerary',
    title: 'My Itinerary',
    subtitle: 'Plan Journey',
    icon: '📋',
    route: '/itinerary',
    color: '#4A90E2',
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Celebrations',
    icon: '🎉',
    route: '/events',
    color: '#66BB6A',
  },
  {
    id: 'data',
    title: 'Buy Data',
    subtitle: 'Packages',
    icon: '📶',
    route: '/data',
    color: '#AB47BC',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const navigateToScreen = (route: string) => {
    if (route === '/gurdwaras') {
      router.push('/gurdwaras' as any);
    } else if (route === '/data') {
      router.push('/data' as any);
    } else {
      router.push(route as any);
    }
  };

  const handleSOSPress = () => {
    Alert.alert(
      'SOS Alert Sent',
      'Emergency alert has been sent to local authorities and your emergency contacts. Help is on the way.',
      [{ text: 'OK' }]
    );
  };

  const handleAuthorizationPress = () => {
    router.push('/authorization' as any);
  };

  const getButtonBackground = (id: string) => {
    switch (id) {
      case 'gurdwaras': return colors.saffronLight || '#FFF3E6';
      case 'itinerary': return colors.blueLight || '#E3F2FD';
      case 'events': return colors.greenLight || '#E8F5E8';
      case 'data': return colors.purpleLight || '#F3E5F5';
      default: return colors.gridButtonBg || '#F8F9FA';
    }
  };

  const renderGridButton = (button: typeof MAIN_BUTTONS[0]) => {
    const buttonSize = (screenWidth - 60) / 2; // Account for padding and gap

    return (
      <TouchableOpacity
        key={button.id}
        style={[
          styles.gridButton,
          { 
            backgroundColor: getButtonBackground(button.id),
            width: buttonSize,
            height: buttonSize,
            borderColor: colors.border,
          }
        ]}
        onPress={() => navigateToScreen(button.route)}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.gridButtonIcon, { color: button.color }]}>
          {button.icon}
        </ThemedText>

        <ThemedText 
          style={[styles.gridButtonTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {button.title}
        </ThemedText>
        <ThemedText 
          style={[styles.gridButtonSubtitle, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {button.subtitle}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.welcomeTitle, { color: colors.primary }]}>
          Sat Sri Akaal
        </ThemedText>
        <ThemedText style={[styles.welcomeSubtitle, { color: colors.text }]}>
          Your spiritual journey through Pakistan
        </ThemedText>
      </View>

      {/* 2x2 Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          {renderGridButton(MAIN_BUTTONS[0])}
          {renderGridButton(MAIN_BUTTONS[1])}
        </View>
        <View style={styles.gridRow}>
          {renderGridButton(MAIN_BUTTONS[2])}
          {renderGridButton(MAIN_BUTTONS[3])}
        </View>
      </View>

      {/* Full-width buttons */}
      <View style={styles.fullWidthButtonsContainer}>
        {/* Authorization Button */}
        <TouchableOpacity
          style={[
            styles.fullWidthButton, 
            { 
              backgroundColor: colors.secondary,
              shadowColor: colorScheme === 'dark' ? '#000' : '#000',
            }
          ]}
          onPress={handleAuthorizationPress}
          activeOpacity={0.8}
        >
          <View style={[styles.fullWidthIconContainer, { backgroundColor: colors.accent + '20' }]}>
            <ThemedText style={[styles.fullWidthButtonIcon, { color: colors.accent }]}>
              🔐
            </ThemedText>
          </View>
          <View style={styles.fullWidthButtonTextContainer}>
            <ThemedText style={[styles.fullWidthButtonTitle, { color: colors.accent }]}>
              Authorization
            </ThemedText>
            <ThemedText style={[styles.fullWidthButtonSubtitle, { color: colors.accent + 'CC' }]}>
              QR Code Entry Verification
            </ThemedText>
          </View>
          <View style={[styles.chevron, { backgroundColor: colors.accent + '20' }]}>
            <ThemedText style={[styles.chevronText, { color: colors.accent }]}>
              ›
            </ThemedText>
          </View>
        </TouchableOpacity>

        {/* SOS Emergency Button */}
        <TouchableOpacity
          style={[
            styles.fullWidthButton, 
            styles.sosButton,
          ]}
          onPress={handleSOSPress}
          activeOpacity={0.8}
        >
          <View style={[styles.fullWidthIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.25)' }]}>
            <ThemedText style={[styles.fullWidthButtonIcon, { color: '#FFFFFF' }]}>
              🆘
            </ThemedText>
          </View>
          <View style={styles.fullWidthButtonTextContainer}>
            <ThemedText style={[styles.fullWidthButtonTitle, { color: '#FFFFFF' }]}>
              SOS Emergency
            </ThemedText>
            <ThemedText style={[styles.fullWidthButtonSubtitle, { color: '#FFFFFF' + 'DD' }]}>
              Tap for immediate emergency assistance
            </ThemedText>
          </View>
          <View style={[styles.chevron, { backgroundColor: 'rgba(255, 255, 255, 0.25)' }]}>
            <ThemedText style={[styles.chevronText, { color: '#FFFFFF' }]}>
              !
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: isSmallScreen ? 40 : 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 16 : 24,
    paddingHorizontal: 8,
  },
  welcomeTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: isSmallScreen ? 14 : 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: isSmallScreen ? 12 : 16,
    marginBottom: isSmallScreen ? 16 : 20,
    maxHeight: screenHeight * 0.5,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: isSmallScreen ? 12 : 16,
  },
  gridButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallScreen ? 16 : 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  gridButtonIcon: {
    fontSize: isSmallScreen ? 28 : 32,
    marginBottom: isSmallScreen ? 8 : 10,
  },
  gridButtonTitle: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginBottom: 3,
    textAlign: 'center',
  },
  gridButtonSubtitle: {
    fontSize: isSmallScreen ? 11 : 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  fullWidthButtonsContainer: {
    gap: isSmallScreen ? 10 : 12,
    marginBottom: isSmallScreen ? 16 : 20,
    paddingHorizontal: 4,
  },
  fullWidthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallScreen ? 16 : 20,
    borderRadius: 14,
    minHeight: isSmallScreen ? 70 : 80,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sosButton: {
    backgroundColor: '#FF5349',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fullWidthIconContainer: {
    width: isSmallScreen ? 44 : 50,
    height: isSmallScreen ? 44 : 50,
    borderRadius: isSmallScreen ? 22 : 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isSmallScreen ? 12 : 16,
  },
  fullWidthButtonIcon: {
    fontSize: isSmallScreen ? 20 : 24,
  },
  fullWidthButtonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullWidthButtonTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  fullWidthButtonSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    opacity: 0.8,
  },
  chevron: {
    width: isSmallScreen ? 28 : 32,
    height: isSmallScreen ? 28 : 32,
    borderRadius: isSmallScreen ? 14 : 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
  },
});