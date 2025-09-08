import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { palette, spacing } from '../theme';


export default function Support() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Destek</Text>
            <Text style={styles.p}>Geri bildirim, hata raporu veya özellik talebi için bize ulaşın.</Text>
            <Text style={styles.p}>E‑posta: support@yourdomain.tld</Text>
            <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@yourdomain.tld')}>E‑posta gönder</Text>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
    title: { color: palette.text, fontSize: 24, fontWeight: '800' },
    p: { color: palette.sub },
    link: { color: palette.accent, textDecorationLine: 'underline', marginTop: spacing(0.5) }
});