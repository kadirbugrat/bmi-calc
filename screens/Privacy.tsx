import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import { palette, spacing } from '../theme';
import type { Translator } from '../src/i18n';

export default function Privacy({ L }: { L: Translator }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{L('privacy_title')}</Text>
      <Text style={styles.p}>{L('privacy_intro')}</Text>
      <Text style={styles.h2}>{L('privacy_data_title')}</Text>
      <Text style={styles.p}>{L('privacy_data_body')}</Text>
      <Text style={styles.h2}>{L('privacy_permissions_title')}</Text>
      <Text style={styles.p}>{L('privacy_permissions_body')}</Text>
      <Text style={styles.h2}>{L('privacy_ads_title')}</Text>
      <Text style={styles.p}>{L('privacy_ads_body')}</Text>
      <Text style={styles.h2}>{L('privacy_contact_title')}</Text>
      <Text style={styles.p}>{L('privacy_email')}</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('mailto:kadirbugrat@gmail.com')}>
        {L('send_email')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
  title: { color: palette.text, fontSize: 24, fontWeight: '800' },
  h2: { color: palette.text, fontSize: 18, fontWeight: '700', marginTop: spacing(1) },
  p: { color: palette.sub },
  link: { color: palette.accent, textDecorationLine: 'underline', marginTop: spacing(0.5) },
});
