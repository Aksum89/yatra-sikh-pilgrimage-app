
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AuthorizationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [qrCode, setQrCode] = useState('QR-AUTH-12345-ABCD-6789');
  const [lastGenerated, setLastGenerated] = useState(new Date());

  const regenerateQR = () => {
    const newCode = `QR-AUTH-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    setQrCode(newCode);
    setLastGenerated(new Date());
    Alert.alert('QR Code Updated', 'Your authorization QR code has been regenerated successfully.');
  };

  const shareQRCode = () => {
    Alert.alert(
      'Share QR Code',
      'Your QR code has been copied to clipboard and can be shared with Gurdwara security personnel.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          Entry Authorization
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Your digital pass for Gurdwara entry verification
        </ThemedText>
      </ThemedView>

      {/* QR Code Display */}
      <ThemedView style={[styles.qrContainer, { backgroundColor: colors.card }]}>
        <View style={styles.qrCodeDisplay}>
          {/* QR Code Placeholder - In a real app, you'd use a QR code library */}
          <View style={[styles.qrCodeBox, { backgroundColor: colors.background }]}>
            <View style={styles.qrPattern}>
              {/* QR Code Pattern Simulation */}
              {Array.from({ length: 15 }).map((_, row) => (
                <View key={row} style={styles.qrRow}>
                  {Array.from({ length: 15 }).map((_, col) => (
                    <View
                      key={col}
                      style={[
                        styles.qrDot,
                        {
                          backgroundColor: Math.random() > 0.5 ? colors.text : 'transparent',
                        },
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
          
          <ThemedText style={[styles.qrCodeText, { color: colors.text }]}>
            {qrCode}
          </ThemedText>
          
          <ThemedText style={[styles.qrTimestamp, { color: colors.icon }]}>
            Generated: {lastGenerated.toLocaleString()}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.regenerateButton, { backgroundColor: colors.primary }]}
          onPress={regenerateQR}
        >
          <IconSymbol name="arrow.clockwise" size={16} color={colors.accent} />
          <ThemedText style={[styles.regenerateButtonText, { color: colors.accent }]}>
            Regenerate QR Code
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Status Card */}
      <ThemedView style={[styles.statusCard, { backgroundColor: colors.card }]}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusIndicator, { backgroundColor: colors.success }]} />
          <ThemedText style={[styles.statusTitle, { color: colors.text }]}>
            Authorization Status
          </ThemedText>
        </View>
        <ThemedText style={[styles.statusText, { color: colors.success }]}>
          ✓ Verified - Valid for all Gurdwaras
        </ThemedText>
        <ThemedText style={[styles.statusDescription, { color: colors.icon }]}>
          Your identity has been verified and you are authorized to enter all registered Gurdwaras in Pakistan.
        </ThemedText>
      </ThemedView>

      {/* Instructions */}
      <ThemedView style={[styles.instructionsCard, { backgroundColor: colors.card }]}>
        <View style={styles.instructionsHeader}>
          <IconSymbol name="info.circle" size={24} color={colors.primary} />
          <ThemedText style={[styles.instructionsTitle, { color: colors.text }]}>
            How to Use
          </ThemedText>
        </View>

        <View style={styles.instructionsList}>
          <View style={styles.instructionItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <ThemedText style={[styles.stepNumberText, { color: colors.accent }]}>1</ThemedText>
            </View>
            <ThemedText style={[styles.instructionText, { color: colors.text }]}>
              Show this QR code to security personnel at Gurdwara entrance
            </ThemedText>
          </View>

          <View style={styles.instructionItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <ThemedText style={[styles.stepNumberText, { color: colors.accent }]}>2</ThemedText>
            </View>
            <ThemedText style={[styles.instructionText, { color: colors.text }]}>
              They will scan the code using their verification device
            </ThemedText>
          </View>

          <View style={styles.instructionItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <ThemedText style={[styles.stepNumberText, { color: colors.accent }]}>3</ThemedText>
            </View>
            <ThemedText style={[styles.instructionText, { color: colors.text }]}>
              Wait for confirmation before proceeding inside
            </ThemedText>
          </View>

          <View style={styles.instructionItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <ThemedText style={[styles.stepNumberText, { color: colors.accent }]}>4</ThemedText>
            </View>
            <ThemedText style={[styles.instructionText, { color: colors.text }]}>
              Keep your phone available for re-scanning if needed
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={shareQRCode}
        >
          <IconSymbol name="square.and.arrow.up" size={16} color={colors.accent} />
          <ThemedText style={[styles.actionButtonText, { color: colors.accent }]}>
            Share QR Code
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border }]}
        >
          <IconSymbol name="doc.on.doc" size={16} color={colors.text} />
          <ThemedText style={[styles.actionButtonText, { color: colors.text }]}>
            Save to Photos
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Security Notice */}
      <ThemedView style={[styles.securityNotice, { backgroundColor: colors.warning + '20' }]}>
        <IconSymbol name="shield.fill" size={20} color={colors.warning} />
        <View style={styles.securityContent}>
          <ThemedText style={[styles.securityTitle, { color: colors.warning }]}>
            Security Notice
          </ThemedText>
          <ThemedText style={[styles.securityText, { color: colors.text }]}>
            Keep your QR code private. Regenerate it if you suspect unauthorized access. This code is valid for 30 days.
          </ThemedText>
        </View>
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
    alignItems: 'center',
  },
  qrContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  qrCodeDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodeBox: {
    width: 200,
    height: 200,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrPattern: {
    flex: 1,
    justifyContent: 'space-between',
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  qrDot: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
  qrCodeText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  qrTimestamp: {
    fontSize: 12,
    textAlign: 'center',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  regenerateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  instructionsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
