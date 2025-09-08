import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { palette, spacing } from '../theme';


export default function About() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Hakkında</Text>
            <Text style={styles.p}>BodyScope BMI, yetişkin ve çocuk/ergenler için BMI hesaplama ve sınıflandırma yapan, çevrimdışı çalışan basit bir sağlıklı yaşam aracıdır.</Text>
            <Text style={styles.p}>Yetişkin sınıflandırması WHO eşiklerine, çocuk/ergen sınıflandırması ise yaşa ve cinsiyete göre BMI persentillerine dayanır.</Text>
            <Text style={styles.p}>Tıbbi tavsiye yerine geçmez. Gereksinimleriniz için sağlık profesyoneline başvurun.</Text>
            <Text style={styles.muted}>Sürüm: 1.0.0</Text>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
    title: { color: palette.text, fontSize: 24, fontWeight: '800' },
    p: { color: palette.sub },
    muted: { color: palette.sub, opacity: 0.7, marginTop: spacing(1) }
});