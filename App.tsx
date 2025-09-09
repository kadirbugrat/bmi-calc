import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import * as Localization from 'expo-localization';
import { palette, spacing } from './theme';
import { dict, t, type Lang } from './src/i18n';
import { Segment } from './components/Segment';
import { Units, toMetric, formatNumber } from './utils/units';
import { calcBMI, classifyAdult, adultAdvice } from './utils/bmi';
import { bmiPercentile, classifyChild, childAdvice, loadFullLMS } from './utils/child';
import type { Sex } from './utils/child_types';
import Privacy from './screens/Privacy';
import About from './screens/About';
import Support from './screens/Support';

export default function App() {
    const deviceLang: Lang = Localization.locale?.toLowerCase().startsWith('tr') ? 'tr' : 'en';
    const [lang, setLang] = useState<Lang>(deviceLang);

    const [tab, setTab] = useState<'home' | 'privacy' | 'about' | 'support'>('home');
    const [units, setUnits] = useState<Units>('metric');
    const [mode, setMode] = useState<'adult' | 'child'>('adult');
    const [sex, setSex] = useState<Sex>('male');
    const [age, setAge] = useState<string>('25');

    const [cm, setCm] = useState<string>('170');
    const [kg, setKg] = useState<string>('65');
    const [ft, setFt] = useState<string>('5');
    const [inch, setInch] = useState<string>('7');
    const [lb, setLb] = useState<string>('143');

    useEffect(() => {
        loadFullLMS('cdc');
    }, []);

    const L = t(lang);

    const { bmi, classification, tip } = useMemo(() => {
        const { cm: mcm, kg: mkg } = toMetric(units, { cm: +cm, ft: +ft, inch: +inch }, { kg: +kg, lb: +lb });
        const bmi = calcBMI(mkg, mcm);
        if (!Number.isFinite(bmi)) return { bmi: NaN, classification: '-', tip: '-' } as const;

        if (mode === 'adult') {
            const cls = classifyAdult(bmi);
            return { bmi, classification: `${cls} — ${formatNumber(bmi)}`, tip: adultAdvice(cls) } as const;
        } else {
            const yrs = Math.max(2, Math.min(20, Number(age) || 10));
            const p = bmiPercentile(bmi, sex, yrs);
            const cls = classifyChild(p);
            return { bmi, classification: `${cls} — BMI ${formatNumber(bmi)} | %${formatNumber(p)}`, tip: childAdvice(cls) } as const;
        }
    }, [units, cm, kg, ft, inch, lb, mode, sex, age, lang]);

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <Header tab={tab} setTab={setTab} L={L} />
            {tab === 'home' && (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>{L('title')}</Text>

                    <Card>
                        <Label>{L('language')}</Label>
                        <Segment
                            items={[{ label: 'TR', value: 'tr' }, { label: 'EN', value: 'en' }]}
                            value={lang}
                            onChange={(v) => setLang(v as Lang)}
                        />
                    </Card>

                    <Card>
                        <Label>{L('unit')}</Label>
                        <Segment
                            items={[{ label: L('metric'), value: 'metric' }, { label: L('imperial'), value: 'imperial' }]}
                            value={units}
                            onChange={(v) => setUnits(v as Units)}
                        />
                    </Card>

                    <Card>
                        <Label>{L('mode')}</Label>
                        <Segment
                            items={[{ label: L('adult'), value: 'adult' }, { label: L('child'), value: 'child' }]}
                            value={mode}
                            onChange={(v) => setMode(v as any)}
                        />
                    </Card>

                    <Card>
                        <Label>{L('sex')}</Label>
                        <Segment
                            items={[{ label: L('male'), value: 'male' }, { label: L('female'), value: 'female' }]}
                            value={sex}
                            onChange={(v) => setSex(v as Sex)}
                        />
                    </Card>

                    {mode === 'child' && (
                        <Card>
                            <Label>{L('age')}</Label>
                            <Input value={age} onChangeText={setAge} keyboardType="numeric" suffix={L('years')} />
                            <Text style={styles.note}>{L('childNote')}</Text>
                        </Card>
                    )}

                    {units === 'metric' ? (
                        <Card>
                            <Label>{L('height')}</Label>
                            <Input value={cm} onChangeText={setCm} keyboardType="numeric" suffix={L('cm')} />
                            <Label style={{ marginTop: spacing(1.5) }}>{L('weight')}</Label>
                            <Input value={kg} onChangeText={setKg} keyboardType="numeric" suffix={L('kg')} />
                        </Card>
                    ) : (
                        <Card>
                            <Label>{L('height')}</Label>
                            <View style={{ flexDirection: 'row', gap: spacing(1) }}>
                                <Input style={{ flex: 1 }} value={ft} onChangeText={setFt} keyboardType="numeric" suffix={L('ft')} />
                                <Input style={{ flex: 1 }} value={inch} onChangeText={setInch} keyboardType="numeric" suffix={L('inch')} />
                            </View>
                            <Label style={{ marginTop: spacing(1.5) }}>{L('weight')}</Label>
                            <Input value={lb} onChangeText={setLb} keyboardType="numeric" suffix={L('lb')} />
                        </Card>
                    )}

                    <Card style={{ gap: spacing(1) }}>
                        <Text style={styles.resultTitle}>{L('result')}</Text>
                        <Row label={L('classification')} value={classification} />
                        <Text style={styles.tip}>{tip}</Text>
                        <Text style={styles.disclaimer}>{L('disclaimer')}</Text>
                    </Card>
                </ScrollView>
            )}
            {tab === 'privacy' && <Privacy L={L} />}
            {tab === 'about' && <About L={L} />}
            {tab === 'support' && <Support L={L} />}

        </SafeAreaView>
    );
}

const Header = ({ tab, setTab, L }: { tab: string; setTab: (t: any) => void; L: ReturnType<typeof t> }) => (
    <View style={styles.header}>
        <Tab label={L('nav_home')} active={tab === 'home'} onPress={() => setTab('home')} />
        <Tab label={L('nav_privacy')} active={tab === 'privacy'} onPress={() => setTab('privacy')} />
        <Tab label={L('nav_about')} active={tab === 'about'} onPress={() => setTab('about')} />
        <Tab label={L('nav_support')} active={tab === 'support'} onPress={() => setTab('support')} />
    </View>
);

const Tab = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
        <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
);

const Card = ({ style, children }: React.PropsWithChildren<{ style?: any }>) => (
    <View style={[styles.card, style]}>{children}</View>
);
const Label = ({ style, children }: React.PropsWithChildren<{ style?: any }>) => (
    <Text style={[styles.label, style]}>{children}</Text>
);

const Row = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
    </View>
);

const Input = ({ suffix, style, ...props }: any) => (
    <View style={[styles.inputWrap, style]}>
        <TextInput placeholderTextColor={palette.sub} style={styles.input} {...props} />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
);

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: palette.bg },
    header: { flexDirection: 'row', gap: spacing(1), padding: spacing(1), justifyContent: 'space-between' },
    tab: { flex: 1, backgroundColor: palette.card, borderRadius: 12, paddingVertical: spacing(1), alignItems: 'center', borderWidth: 1, borderColor: palette.border },
    tabActive: { backgroundColor: palette.accent },
    tabText: { color: palette.sub, fontWeight: '700' },
    tabTextActive: { color: '#0B1021' },
    container: { padding: spacing(2), gap: spacing(2) },
    title: { color: palette.text, fontSize: 28, fontWeight: '800', letterSpacing: 0.5 },
    card: { backgroundColor: palette.card, borderRadius: 16, padding: spacing(2), borderWidth: 1, borderColor: palette.border },
    label: { color: palette.sub, marginBottom: spacing(1), fontWeight: '600' },
    note: { color: palette.sub, marginTop: spacing(1), fontSize: 12 },
    inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0E1430', borderRadius: 12, borderWidth: 1, borderColor: palette.border, paddingHorizontal: spacing(1.5) },
    input: { flex: 1, color: palette.text, paddingVertical: spacing(1.25), fontSize: 16 },
    suffix: { color: palette.sub, marginLeft: spacing(1), fontWeight: '600' },
    resultTitle: { color: palette.text, fontWeight: '800', fontSize: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    rowLabel: { color: palette.sub },
    rowValue: { color: palette.text, fontWeight: '700' },
    tip: { color: palette.sub, marginTop: spacing(0.5) },
    disclaimer: { color: palette.sub, fontSize: 11, marginTop: spacing(1) }
});
