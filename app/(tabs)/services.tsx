import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';

interface DataPackage {
  id: number;
  operator: string;
  name: string;
  data: string;
  validity: string;
  price: string;
  features: string[];
  color: string;
}

const DATA_PACKAGES: DataPackage[] = [
  {
    id: 1,
    operator: 'Jazz',
    name: 'Pilgrimage Plus',
    data: '15 GB',
    validity: '30 days',
    price: 'PKR 800',
    features: ['Free WhatsApp', 'Navigation Support', '4G Speed'],
    color: '#FF6B35',
  },
  {
    id: 2,
    operator: 'Zong',
    name: 'Sacred Journey',
    data: '12 GB',
    validity: '30 days',
    price: 'PKR 750',
    features: ['Free Social Media', 'GPS Navigation', 'Tourist Hotline'],
    color: '#8B5CF6',
  },
  {
    id: 3,
    operator: 'Telenor',
    name: 'Spiritual Connect',
    data: '10 GB',
    validity: '30 days',
    price: 'PKR 650',
    features: ['Free Calls to India', 'Emergency Services', 'Travel Insurance'],
    color: '#10B981',
  },
  {
    id: 4,
    operator: 'Ufone',
    name: 'Heritage Pack',
    data: '8 GB',
    validity: '30 days',
    price: 'PKR 600',
    features: ['Discounted International Calls', 'Local Support', 'Free SMS'],
    color: '#F59E0B',
  },
];

export default function ServicesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const { bottom } = useBottomTabOverflow();

  const activatePackage = (pkg: DataPackage) => {
    Alert.alert(
      'Activate Data Package',
      `Would you like to activate ${pkg.name} from ${pkg.operator}?\n\nPrice: ${pkg.price}\nData: ${pkg.data}\nValidity: ${pkg.validity}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Activate', onPress: () => {
          Alert.alert('Success', `${pkg.name} has been activated. You will receive a confirmation SMS shortly.`);
        }},
      ]
    );
  };

  const scanQRCode = () => {
    Alert.alert(
      'QR Scanner',
      'Camera will open to scan the Gurdwara entry QR code for verification.',
      [{ text: 'OK' }]
    );
  };

  const requestAssistance = () => {
    Alert.alert(
      'Travel Assistance',
      'Our travel assistance team will contact you shortly to help with your queries.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView 
      style={[{ backgroundColor: colors.background }, styles.container]}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          Pilgrimage Services
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Essential services for your journey
        </ThemedText>
      </ThemedView>

      {/* QR Code Scanner Section */}
      <ThemedView style={[styles.serviceCard, { backgroundColor: colors.card }]}>
        <View style={styles.serviceHeader}>
          <IconSymbol name="qrcode" size={32} color={colors.primary} />
          <View style={styles.serviceInfo}>
            <ThemedText type="subtitle" style={{ color: colors.text }}>
              Gurdwara Entry Verification
            </ThemedText>
            <ThemedText style={[styles.serviceDescription, { color: colors.icon }]}>
              Scan QR codes for quick entry verification
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.serviceButton, { backgroundColor: colors.primary }]}
          onPress={scanQRCode}
        >
          <IconSymbol name="camera" size={16} color={colors.accent} />
          <ThemedText style={[styles.serviceButtonText, { color: colors.accent }]}>
            Scan QR Code
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Data Packages Section */}
      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={{ color: colors.text }}>
          Data Packages for Pakistan
        </ThemedText>
        <ThemedText style={[styles.sectionDescription, { color: colors.icon }]}>
          Stay connected during your pilgrimage
        </ThemedText>
      </ThemedView>

      {DATA_PACKAGES.map((pkg) => (
        <ThemedView key={pkg.id} style={[styles.packageCard, { backgroundColor: colors.card }]}>
          <View style={styles.packageHeader}>
            <View style={[styles.operatorBadge, { backgroundColor: pkg.color }]}>
              <ThemedText style={[styles.operatorText, { color: colors.accent }]}>
                {pkg.operator}
              </ThemedText>
            </View>
            <View style={styles.packageInfo}>
              <ThemedText type="subtitle" style={{ color: colors.text }}>
                {pkg.name}
              </ThemedText>
              <ThemedText style={[styles.packagePrice, { color: colors.primary }]}>
                {pkg.price}
              </ThemedText>
            </View>
          </View>

          <View style={styles.packageDetails}>
            <View style={styles.dataInfo}>
              <View style={styles.dataItem}>
                <IconSymbol name="wifi" size={16} color={colors.secondary} />
                <ThemedText style={[styles.dataText, { color: colors.text }]}>
                  {pkg.data}
                </ThemedText>
              </View>
              <View style={styles.dataItem}>
                <IconSymbol name="calendar" size={16} color={colors.secondary} />
                <ThemedText style={[styles.dataText, { color: colors.text }]}>
                  {pkg.validity}
                </ThemedText>
              </View>
            </View>

            <View style={styles.features}>
              {pkg.features.map((feature, index) => (
                <View key={index} style={[styles.featureTag, { backgroundColor: colors.background }]}>
                  <ThemedText style={[styles.featureText, { color: colors.text }]}>
                    ✓ {feature}
                  </ThemedText>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.activateButton, { backgroundColor: pkg.color }]}
              onPress={() => activatePackage(pkg)}
            >
              <ThemedText style={[styles.activateButtonText, { color: colors.accent }]}>
                Activate Package
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ))}

      {/* Travel Assistance Section */}
      <ThemedView style={[styles.serviceCard, { backgroundColor: colors.card }]}>
        <View style={styles.serviceHeader}>
          <IconSymbol name="person.2.fill" size={32} color={colors.secondary} />
          <View style={styles.serviceInfo}>
            <ThemedText type="subtitle" style={{ color: colors.text }}>
              Travel Assistance
            </ThemedText>
            <ThemedText style={[styles.serviceDescription, { color: colors.icon }]}>
              Get help with travel arrangements and guidance
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.serviceButton, { backgroundColor: colors.secondary }]}
          onPress={requestAssistance}
        >
          <IconSymbol name="phone" size={16} color={colors.accent} />
          <ThemedText style={[styles.serviceButtonText, { color: colors.accent }]}>
            Request Assistance
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Additional Services */}
      <ThemedView style={styles.additionalServices}>
        <ThemedText type="subtitle" style={{ color: colors.text, marginBottom: 16 }}>
          Additional Services
        </ThemedText>

        <TouchableOpacity style={[styles.additionalServiceItem, { backgroundColor: colors.card }]}>
          <IconSymbol name="location.fill" size={24} color={colors.primary} />
          <View style={styles.additionalServiceInfo}>
            <ThemedText style={[styles.additionalServiceTitle, { color: colors.text }]}>
              GPS Navigation
            </ThemedText>
            <ThemedText style={[styles.additionalServiceDesc, { color: colors.icon }]}>
              Turn-by-turn directions to Gurdwaras
            </ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.additionalServiceItem, { backgroundColor: colors.card }]}>
          <IconSymbol name="globe" size={24} color={colors.primary} />
          <View style={styles.additionalServiceInfo}>
            <ThemedText style={[styles.additionalServiceTitle, { color: colors.text }]}>
              Language Translation
            </ThemedText>
            <ThemedText style={[styles.additionalServiceDesc, { color: colors.icon }]}>
              Punjabi, Urdu, and English support
            </ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.additionalServiceItem, { backgroundColor: colors.card }]}>
          <IconSymbol name="heart.fill" size={24} color={colors.success} />
          <View style={styles.additionalServiceInfo}>
            <ThemedText style={[styles.additionalServiceTitle, { color: colors.text }]}>
              Medical Assistance
            </ThemedText>
            <ThemedText style={[styles.additionalServiceDesc, { color: colors.icon }]}>
              Emergency medical support and hospitals
            </ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
    paddingTop: 20,
  },
  serviceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  serviceDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  serviceButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  packageCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  operatorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 16,
  },
  operatorText: {
    fontSize: 14,
    fontWeight: '600',
  },
  packageInfo: {
    flex: 1,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  packageDetails: {},
  dataInfo: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dataText: {
    fontSize: 14,
    fontWeight: '500',
  },
  features: {
    marginBottom: 16,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
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
  additionalServices: {
    marginTop: 8,
  },
  additionalServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  additionalServiceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  additionalServiceTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  additionalServiceDesc: {
    fontSize: 14,
    marginTop: 2,
  },
});