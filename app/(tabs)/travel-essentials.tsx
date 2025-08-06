
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
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

const exchangeRates = [
  {
    currency: 'Indian Rupee (INR)',
    symbol: '₹',
    flag: '🇮🇳',
    rate: '1 INR = 3.25 PKR',
    notes: 'Most commonly used by Sikh pilgrims'
  },
  {
    currency: 'US Dollar (USD)',
    symbol: '$',
    flag: '🇺🇸',
    rate: '1 USD = 278.50 PKR',
    notes: 'Widely accepted, good for emergencies'
  },
  {
    currency: 'British Pound (GBP)',
    symbol: '£',
    flag: '🇬🇧',
    rate: '1 GBP = 352.75 PKR',
    notes: 'Accepted at major establishments'
  },
  {
    currency: 'Euro (EUR)',
    symbol: '€',
    flag: '🇪🇺',
    rate: '1 EUR = 291.20 PKR',
    notes: 'Limited acceptance, exchange recommended'
  },
  {
    currency: 'Canadian Dollar (CAD)',
    symbol: 'C$',
    flag: '🇨🇦',
    rate: '1 CAD = 195.80 PKR',
    notes: 'Exchange at banks or authorized dealers'
  },
  {
    currency: 'Australian Dollar (AUD)',
    symbol: 'A$',
    flag: '🇦🇺',
    rate: '1 AUD = 174.45 PKR',
    notes: 'Limited acceptance, exchange recommended'
  }
];

const currencyTips = [
  {
    title: 'Where to Exchange',
    icon: '🏦',
    items: [
      'Banks offer the best exchange rates',
      'Authorized money changers are reliable',
      'Airport exchanges available but rates may vary',
      'Avoid street money changers',
      'Hotels may exchange but at higher rates'
    ]
  },
  {
    title: 'Payment Methods',
    icon: '💳',
    items: [
      'Cash is king for small vendors and local transport',
      'Credit cards accepted at hotels and restaurants',
      'ATMs widely available in cities',
      'Mobile payment apps like JazzCash, EasyPaisa',
      'Keep small denominations for tips and donations'
    ]
  },
  {
    title: 'Banking Tips',
    icon: '🏧',
    items: [
      'Inform your bank about travel plans',
      'Carry multiple cards as backup',
      'Note emergency contact numbers for your bank',
      'Check international transaction fees',
      'Use bank ATMs when possible for security'
    ]
  }
];

export default function TravelEssentialsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedSection, setSelectedSection] = useState('tips');

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

  const renderExchangeRateCard = (rateData: typeof exchangeRates[0], index: number) => (
    <ThemedView key={index} style={[styles.rateCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.rateHeader}>
        <View style={styles.currencyInfo}>
          <ThemedText style={styles.flagIcon}>{rateData.flag}</ThemedText>
          <View style={styles.currencyDetails}>
            <ThemedText style={[styles.currencyName, { color: colors.text }]}>
              {rateData.currency}
            </ThemedText>
            <ThemedText style={[styles.currencySymbol, { color: colors.secondaryText }]}>
              {rateData.symbol}
            </ThemedText>
          </View>
        </View>
        <View style={[styles.rateContainer, { backgroundColor: colors.primary + '15' }]}>
          <ThemedText style={[styles.exchangeRate, { color: colors.primary }]}>
            {rateData.rate}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.rateNotes, { color: colors.secondaryText }]}>
        {rateData.notes}
      </ThemedText>
    </ThemedView>
  );

  const renderCurrencyTipCard = (tipData: typeof currencyTips[0]) => (
    <ThemedView key={tipData.title} style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.tipHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <ThemedText style={styles.categoryIcon}>{tipData.icon}</ThemedText>
        </View>
        <ThemedText type="subtitle" style={[styles.categoryTitle, { color: colors.text }]}>
          {tipData.title}
        </ThemedText>
      </View>

      <View style={styles.tipsContainer}>
        {tipData.items.map((item, index) => (
          <View key={index} style={styles.tipRow}>
            <View style={[styles.bullet, { backgroundColor: colors.tint }]} />
            <ThemedText style={[styles.tipText, { color: colors.text }]}>
              {item}
            </ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );

  const renderTipsSection = () => (
    <>
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
    </>
  );

  const renderCurrencySection = () => (
    <>
      {/* Currency Info Header */}
      <ThemedView style={[styles.welcomeCard, { backgroundColor: colors.secondary }]}>
        <ThemedText style={[styles.welcomeTitle, { color: colors.accent }]}>
          Pakistani Rupee (PKR) 💰
        </ThemedText>
        <ThemedText style={[styles.welcomeText, { color: colors.accent }]}>
          Current exchange rates and money tips for your visit. Rates are approximate and may vary.
          Last updated: {new Date().toLocaleDateString()}
        </ThemedText>
      </ThemedView>

      {/* Exchange Rates */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Current Exchange Rates
        </ThemedText>
        <View style={styles.ratesGrid}>
          {exchangeRates.slice(0, 4).map(renderExchangeRateCard)}
        </View>
        {exchangeRates.length > 4 && (
          <View style={styles.additionalRates}>
            <ThemedText style={[styles.additionalRatesTitle, { color: colors.text }]}>
              Additional Currencies
            </ThemedText>
            {exchangeRates.slice(4).map(renderExchangeRateCard)}
          </View>
        )}
      </ThemedView>

      {/* Currency Tips */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Money & Banking Tips
        </ThemedText>
        {currencyTips.map(renderCurrencyTipCard)}
      </ThemedView>

      {/* Important Note */}
      <ThemedView style={[styles.emergencyCard, { backgroundColor: '#E8F5E8', borderColor: '#4CAF50' }]}>
        <View style={styles.emergencyHeader}>
          <IconSymbol name="info.circle.fill" size={24} color="#4CAF50" />
          <ThemedText type="subtitle" style={[styles.emergencyTitle, { color: '#2E7D32' }]}>
            Exchange Rate Notice
          </ThemedText>
        </View>
        <ThemedText style={[styles.emergencyText, { color: '#1B5E20' }]}>
          Exchange rates fluctuate daily. Check current rates at your bank or authorized dealers. 
          Avoid unofficial money changers and always count your money before leaving the counter.
        </ThemedText>
      </ThemedView>
    </>
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
            <ThemedText style={styles.headerIconEmoji}>🎒</ThemedText>
          </View>
          <View>
            <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
              Travel Essentials
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
              {selectedSection === 'tips' ? 'Tips & Guidelines for Your Journey' : 'Currency & Exchange Information'}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Section Toggle */}
      <ThemedView style={[styles.toggleContainer, { backgroundColor: colors.card }]}>
        <ThemedText style={[styles.toggleLabel, { color: colors.text }]}>
          Select Section
        </ThemedText>
        <View style={[styles.togglePill, { backgroundColor: '#E5E5E5' }]}>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              {
                backgroundColor: selectedSection === 'tips' ? colors.primary : 'transparent',
              },
            ]}
            onPress={() => setSelectedSection('tips')}
          >
            <ThemedText
              style={[
                styles.toggleText,
                {
                  color: selectedSection === 'tips' ? '#FFFFFF' : '#000000',
                },
              ]}
            >
              Tips
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              {
                backgroundColor: selectedSection === 'currency' ? colors.primary : 'transparent',
              },
            ]}
            onPress={() => setSelectedSection('currency')}
          >
            <ThemedText
              style={[
                styles.toggleText,
                {
                  color: selectedSection === 'currency' ? '#FFFFFF' : '#000000',
                },
              ]}
            >
              Currency
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedSection === 'tips' ? renderTipsSection() : renderCurrencySection()}
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
  headerIconEmoji: {
    fontSize: 32,
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
  toggleContainer: {
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  togglePill: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 16,
    minHeight: 28,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
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
  rateCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  currencyDetails: {
    flex: 1,
  },
  currencyName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 1,
  },
  currencySymbol: {
    fontSize: 12,
    opacity: 0.7,
  },
  rateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
  },
  exchangeRate: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  rateNotes: {
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 14,
    opacity: 0.8,
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
  ratesGrid: {
    gap: 8,
  },
  additionalRates: {
    marginTop: 12,
  },
  additionalRatesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
  },
});
