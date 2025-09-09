import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { palette, spacing } from '../theme';
import type { Translator } from '../src/i18n';

export default function About({ L }: { L: Translator }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{L('about_title')}</Text>
      <Text style={styles.p}>{L('about_p1')}</Text>
      <Text style={styles.p}>{L('about_p2')}</Text>
      <Text style={styles.muted}>{L('about_disclaimer')}</Text>
      <Text style={styles.muted}>{L('about_version')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
  title: { color: palette.text, fontSize: 24, fontWeight: '800' },
  p: { color: palette.sub },
  muted: { color: palette.sub, opacity: 0.7, marginTop: spacing(1) },
});
