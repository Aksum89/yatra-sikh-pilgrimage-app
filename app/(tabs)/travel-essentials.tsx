
import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

const essentialTips = [
  {
    category: 'Document Preparation',
    icon: '📋',
    tips: [
      'Valid passport with at least 6 months validity',
      'Pakistani visa (obtained in advance)',
      'Travel insurance documentation',
      'Emergency contact information',
      'Medical prescriptions and health records',
      'Digital and physical copies of all documents'
    ]
  },
  {
    category: 'Cultural Guidelines',
    icon: '🕌',
    tips: [
      'Dress modestly, especially at religious sites',
      'Remove shoes before entering Gurdwaras',
      'Cover your head with a scarf or turban in Gurdwaras',
      'Be respectful during prayer times',
      'Learn basic Punjabi/Urdu greetings',
      'Respect local customs and traditions'
    ]
  },
  {
    category: 'Health & Safety',
    icon: '🏥',
    tips: [
      'Get necessary vaccinations before travel',
      'Carry a basic first-aid kit',
      'Drink bottled or filtered water',
      'Be cautious with street food initially',
      'Keep emergency contacts handy',
      'Register with your embassy upon arrival'
    ]
  },
  {
    category: 'Money & Communication',
    icon: '💰',
    tips: [
      'Pakistani Rupee (PKR) is the local currency',
      'ATMs are widely available in cities',
      'Keep some cash for smaller vendors',
      'International roaming or local SIM card',
      'Download offline maps and translation apps',
      'Inform your bank about international travel'
    ]
  },
  {
    category: 'Transportation',
    icon: '🚗',
    tips: [
      'Book reliable transport through trusted sources',
      'Keep driver contact information',
      'Agree on fares before starting journey',
      'Use registered tour operators',
      'Keep important addresses written in Urdu',
      'Plan buffer time for traffic delays'
    ]
  },
  {
    category: 'Weather & Clothing',
    icon: '🌤️',
    tips: [
      'Check seasonal weather before packing',
      'Light cotton clothes for summer',
      'Warm layers for winter visits',
      'Comfortable walking shoes',
      'Sun protection (hat, sunscreen)',
      'Modest clothing for religious sites'
    ]
  }
];

export default function TravelEssentialsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderTipCard = (tipData: typeof essentialTips[0]) => (
    <ThemedView key={tipData.category} style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.tipHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <ThemedText style={styles.categoryIcon}>{tipData.icon}</ThemedText>
        </View>
        <ThemedText type="subtitle" style={[styles.categoryTitle, { color: colors.text }]}>
          {tipData.category}
        </ThemedText>
      </View>
      
      <View style={styles.tipsContainer}>
        {tipData.tips.map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <View style={[styles.bullet, { backgroundColor: colors.tint }]} />
            <ThemedText style={[styles.tipText, { color: colors.text }]}>
              {tip}
            </ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <View style={[styles.headerIcon, { backgroundColor: colors.primary + '20' }]}>
            <IconSymbol name="backpack" size={32} color={colors.primary} />
          </View>
          <View>
            <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
              Travel Essentials
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
              Tips & Guidelines for Your Journey
            </ThemedText>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <ThemedView style={[styles.welcomeCard, { backgroundColor: colors.secondary }]}>
          <ThemedText style={[styles.welcomeTitle, { color: colors.accent }]}>
            Welcome to Pakistan! 🇵🇰
          </ThemedText>
          <ThemedText style={[styles.welcomeText, { color: colors.accent }]}>
            These essential tips will help ensure your pilgrimage is safe, respectful, and memorable. 
            Please read through each section carefully before your journey.
          </ThemedText>
        </ThemedView>

        {/* Tips Cards */}
        {essentialTips.map(renderTipCard)}

        {/* Emergency Note */}
        <ThemedView style={[styles.emergencyCard, { backgroundColor: '#FFF3E0', borderColor: '#FF9800' }]}>
          <View style={styles.emergencyHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#FF9800" />
            <ThemedText type="subtitle" style={[styles.emergencyTitle, { color: '#E65100' }]}>
              Important Reminder
            </ThemedText>
          </View>
          <ThemedText style={[styles.emergencyText, { color: '#BF360C' }]}>
            Always keep your emergency contacts accessible and inform someone about your daily itinerary. 
            Use the Emergency tab in this app for quick access to help.
          </ThemedText>
        </ThemedView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  tipCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tipsContainer: {
    gap: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
    flexShrink: 0,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  emergencyCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});
