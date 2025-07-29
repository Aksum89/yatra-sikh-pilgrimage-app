
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
        onPress={() => navigateToScreen(button.route)}
        activeOpacity={0.7}
        style={({ pressed }) => [
          styles.gridButton,
          { 
            backgroundColor: getButtonBackground(button.id),
            width: buttonSize,
            height: buttonSize,
            borderColor: colors.border,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          }
        ]}
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
          Sikh Pilgrimage
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
          style={({ pressed }) => [
            styles.fullWidthButton, 
            { 
              backgroundColor: colors.secondary,
              shadowColor: colorScheme === 'dark' ? '#000' : '#000',
              transform: [{ scale: pressed ? 0.98 : 1 }],
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
          style={({ pressed }) => [
            styles.fullWidthButton, 
            styles.sosButton,
            {
              transform: [{ scale: pressed ? 0.98 : 1 }],
            }
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
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  gridButtonIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  gridButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  gridButtonSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  fullWidthButtonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  fullWidthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    minHeight: 80,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sosButton: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fullWidthIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fullWidthButtonIcon: {
    fontSize: 24,
  },
  fullWidthButtonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullWidthButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  fullWidthButtonSubtitle: {
    fontSize: 14,
    opacity: 0.8,
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
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
