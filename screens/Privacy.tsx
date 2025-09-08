import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { palette, spacing } from '../theme';


export default function Privacy() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Gizlilik Politikası</Text>
            <Text style={styles.p}>BodyScope BMI, kullanıcıdan kişisel veri toplamaz, hesapları cihaz üzerinde çalışır ve internet bağlantısı gerektirmez.</Text>
            <Text style={styles.h2}>Toplanan Veriler</Text>
            <Text style={styles.p}>Uygulama; boy, kilo, yaş ve cinsiyet gibi bilgilerle BMI hesaplar. Bu veriler yalnızca cihaz üzerinde işlenir ve saklanmaz.</Text>
            <Text style={styles.h2}>İzinler</Text>
            <Text style={styles.p}>Uygulama kamera, konum veya rehber gibi izinler talep etmez.</Text>
            <Text style={styles.h2}>Reklam ve Analitik</Text>
            <Text style={styles.p}>Varsayılan olarak reklam veya analitik içermez. Gelecekte eklenirse, kullanıcı onayı alınacaktır.</Text>
            <Text style={styles.h2}>İletişim</Text>
            <Text style={styles.p}>Sorularınız için e‑posta: support@yourdomain.tld</Text>
            <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@yourdomain.tld')}>E‑posta gönder</Text>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { padding: spacing(2), gap: spacing(1), backgroundColor: palette.bg },
    title: { color: palette.text, fontSize: 24, fontWeight: '800' },
    h2: { color: palette.text, fontSize: 18, fontWeight: '700', marginTop: spacing(1) },
    p: { color: palette.sub },
    link: { color: palette.accent, textDecorationLine: 'underline', marginTop: spacing(0.5) }
});