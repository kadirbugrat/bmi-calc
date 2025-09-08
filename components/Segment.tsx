import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { palette, spacing } from '../theme';


type Item = { label: string; value: string };


export const Segment = ({ items, value, onChange }: { items: Item[]; value: string; onChange: (v: string) => void }) => {
    return (
        <View style={styles.wrap}>
            {items.map((it) => (
                <Pressable key={it.value} style={[styles.item, value === it.value && styles.active]} onPress={() => onChange(it.value)}>
                    <Text style={[styles.text, value === it.value && styles.textActive]}>{it.label}</Text>
                </Pressable>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        backgroundColor: palette.card,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: palette.border
    },
    item: {
        paddingVertical: spacing(1.25),
        paddingHorizontal: spacing(2.5)
    },
    active: {
        backgroundColor: palette.accent
    },
    text: { color: palette.sub, fontWeight: '600' },
    textActive: { color: '#0B1021' }
});