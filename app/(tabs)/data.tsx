
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface DataPlan {
  id: number;
  name: string;
  data: string;
  validity: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface Operator {
  id: string;
  name: string;
  color: string;
  logo: string;
  plans: DataPlan[];
}

const OPERATORS: Operator[] = [
  {
    id: 'jazz',
    name: 'Jazz',
    color: '#d61921',
    logo: '',
    plans: [
      {
        id: 1,
        name: 'Pilgrimage Plus',
        data: '15 GB',
        validity: '30 days',
        price: 'PKR 800',
        features: ['Free WhatsApp', 'Navigation Support', '4G Speed'],
        popular: true,
      },
      {
        id: 2,
        name: 'Sacred Journey',
        data: '25 GB',
        validity: '30 days',
        price: 'PKR 1200',
        features: ['Free Social Media', 'GPS Navigation', 'Tourist Hotline', 'Unlimited Calls'],
      },
      {
        id: 3,
        name: 'Basic Connect',
        data: '5 GB',
        validity: '15 days',
        price: 'PKR 400',
        features: ['SMS Pack', 'Basic Internet'],
      },
    ],
  },
  {
    id: 'zong',
    name: 'Zong',
    color: '#94c021',
    logo: '',
    plans: [
      {
        id: 4,
        name: 'Sacred Journey',
        data: '12 GB',
        validity: '30 days',
        price: 'PKR 750',
        features: ['Free Social Media', 'GPS Navigation', 'Tourist Hotline'],
        popular: true,
      },
      {
        id: 5,
        name: 'Mega Pack',
        data: '20 GB',
        validity: '30 days',
        price: 'PKR 1000',
        features: ['4G+ Speed', 'Video Streaming', 'International SMS'],
      },
      {
        id: 6,
        name: 'Traveler Basic',
        data: '6 GB',
        validity: '15 days',
        price: 'PKR 450',
        features: ['Maps Support', 'Emergency Services'],
      },
    ],
  },
  {
    id: 'telenor',
    name: 'Telenor',
    color: '#18a9f8',
    logo: '',
    plans: [
      {
        id: 7,
        name: 'Spiritual Connect',
        data: '10 GB',
        validity: '30 days',
        price: 'PKR 650',
        features: ['Free Calls to India', 'Emergency Services', 'Travel Insurance'],
        popular: true,
      },
      {
        id: 8,
        name: 'Premium Journey',
        data: '18 GB',
        validity: '30 days',
        price: 'PKR 950',
        features: ['International Roaming', 'Premium Support', 'Health Services'],
      },
      {
        id: 9,
        name: 'Quick Connect',
        data: '4 GB',
        validity: '7 days',
        price: 'PKR 250',
        features: ['Fast Activation', 'Basic Support'],
      },
    ],
  },
  {
    id: 'ufone',
    name: 'Ufone',
    color: '#f38020',
    logo: '',
    plans: [
      {
        id: 10,
        name: 'Heritage Pack',
        data: '8 GB',
        validity: '30 days',
        price: 'PKR 600',
        features: ['Discounted International Calls', 'Local Support', 'Free SMS'],
        popular: true,
      },
      {
        id: 11,
        name: 'Super Heritage',
        data: '16 GB',
        validity: '30 days',
        price: 'PKR 900',
        features: ['Unlimited Local Calls', 'International Minutes', 'Premium Features'],
      },
      {
        id: 12,
        name: 'Starter Pack',
        data: '3 GB',
        validity: '10 days',
        price: 'PKR 300',
        features: ['Basic Internet', 'SMS Bundle'],
      },
    ],
  },
];

export default function DataScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedOperator, setSelectedOperator] = useState('jazz');
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

  const currentOperator = OPERATORS.find(op => op.id === selectedOperator);

  const activatePlan = (plan: DataPlan) => {
    Alert.alert(
      'Activate Data Plan',
      `Would you like to activate ${plan.name} from ${currentOperator?.name}?\n\nPrice: ${plan.price}\nData: ${plan.data}\nValidity: ${plan.validity}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Activate',
          onPress: () => {
            Alert.alert('Success', `${plan.name} has been activated. You will receive a confirmation SMS shortly.`);
          },
        },
      ]
    );
  };

  const togglePlanDetails = (planId: number) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={{ color: colors.primary }}>
            Data Packages
          </ThemedText>
          <ThemedText style={{ color: colors.text, marginTop: 8 }}>
            Stay connected during your pilgrimage
          </ThemedText>
        </ThemedView>

      {/* Operator Toggle Buttons */}
      <ThemedView style={[styles.operatorToggleContainer, { backgroundColor: colors.card }]}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Select Network Operator
        </ThemedText>
        <View style={styles.operatorToggles}>
          {OPERATORS.map((operator) => (
            <TouchableOpacity
              key={operator.id}
              style={[
                styles.operatorToggle,
                {
                  backgroundColor: selectedOperator === operator.id ? operator.color : colors.background,
                  borderColor: operator.color,
                },
              ]}
              onPress={() => setSelectedOperator(operator.id)}
            >
              <ThemedText
                style={[
                  styles.operatorName,
                  {
                    color: selectedOperator === operator.id ? '#FFFFFF' : operator.color,
                  },
                ]}
              >
                {operator.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Data Plans Grid */}
      {currentOperator && (
        <ThemedView style={styles.plansSection}>
          <View style={styles.plansSectionHeader}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              {currentOperator.name} Data Plans
            </ThemedText>
            <View style={[styles.operatorBadge, { backgroundColor: currentOperator.color }]}>
              <ThemedText style={[styles.operatorBadgeText, { color: '#FFFFFF' }]}>
                {currentOperator.name}
              </ThemedText>
            </View>
          </View>

          <View style={styles.plansGrid}>
            {currentOperator.plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planTile,
                  {
                    backgroundColor: colors.card,
                    borderColor: plan.popular ? currentOperator.color : colors.border,
                    borderWidth: plan.popular ? 2 : 1,
                  },
                ]}
                onPress={() => togglePlanDetails(plan.id)}
              >
                {plan.popular && (
                  <View style={[styles.popularBadge, { backgroundColor: currentOperator.color }]}>
                    <ThemedText style={[styles.popularText, { color: colors.accent }]}>
                      POPULAR
                    </ThemedText>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <ThemedText style={[styles.planName, { color: colors.text }]}>
                    {plan.name}
                  </ThemedText>
                  <ThemedText style={[styles.planPrice, { color: currentOperator.color }]}>
                    {plan.price}
                  </ThemedText>
                </View>

                <View style={styles.planBasicInfo}>
                  <View style={styles.planInfoItem}>
                    <IconSymbol name="wifi" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.planInfoText, { color: colors.text }]}>
                      {plan.data}
                    </ThemedText>
                  </View>
                  <View style={styles.planInfoItem}>
                    <IconSymbol name="calendar" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.planInfoText, { color: colors.text }]}>
                      {plan.validity}
                    </ThemedText>
                  </View>
                </View>

                {expandedPlan === plan.id ? (
                  <View style={styles.planDetails}>
                    <View style={styles.featuresContainer}>
                      <ThemedText style={[styles.featuresTitle, { color: colors.text }]}>
                        Features Included:
                      </ThemedText>
                      {plan.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                          <IconSymbol name="checkmark" size={12} color={colors.success} />
                          <ThemedText style={[styles.featureText, { color: colors.icon }]}>
                            {feature}
                          </ThemedText>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={[styles.activateButton, { backgroundColor: currentOperator.color }]}
                      onPress={() => activatePlan(plan)}
                    >
                      <ThemedText style={[styles.activateButtonText, { color: colors.accent }]}>
                        Activate {plan.name}
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.viewDetailsContainer}>
                    <ThemedText style={[styles.viewDetailsText, { color: currentOperator.color }]}>
                      Tap to view details ↓
                    </ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ThemedView>
      )}

      {/* Additional Info */}
      <ThemedView style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <IconSymbol name="info.circle" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <ThemedText style={[styles.infoTitle, { color: colors.text }]}>
            Important Information
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: colors.icon }]}>
            • All plans include nationwide coverage{'\n'}
            • Activation usually takes 5-10 minutes{'\n'}
            • Keep your passport ready for verification{'\n'}
            • Data can be recharged at any time{'\n'}
            • Customer support available 24/7
          </ThemedText>
        </View>
      </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  operatorToggleContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  operatorToggles: {
    flexDirection: 'row',
    gap: 12,
  },
  operatorToggle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  operatorName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  plansSection: {
    marginBottom: 20,
  },
  plansSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  operatorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  operatorBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  plansGrid: {
    gap: 16,
  },
  planTile: {
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    marginTop: 8,
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
  planBasicInfo: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  planInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planInfoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  planDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 13,
  },
  activateButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewDetailsContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
