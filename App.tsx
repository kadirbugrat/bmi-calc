import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <View style={styles.box}>
                <Text style={styles.title}>BodyScope BMI</Text>
                <Text style={styles.p}>Projeyi düzgün derlettik 🎉</Text>
                <Text style={styles.p}>Birazdan BMI ekranını geri koyacağız.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0B1021', justifyContent: 'center', alignItems: 'center' },
    box: { padding: 24, backgroundColor: '#151B34', borderRadius: 16 },
    title: { color: '#E8ECFF', fontSize: 24, fontWeight: '800', marginBottom: 8 },
    p: { color: '#A9B0D6' }
});
