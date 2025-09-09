import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import { palette, spacing } from '../theme';
import type { Translator } from '../src/i18n';

export default function Support({ L }: { L: Translator }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{L('support_title')}</Text>
      <Text style={styles.p}>{L('support_intro')}</Text>
      <Text style={styles.p}>{L('support_email')}</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('mailto:kadirbugrat@gmail.com')}>
        {L('send_email')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
  title: { color: palette.text, fontSize: 24, fontWeight: '800' },
  p: { color: palette.sub },
  link: { color: palette.accent, textDecorationLine: 'underline', marginTop: spacing(0.5) },
});
