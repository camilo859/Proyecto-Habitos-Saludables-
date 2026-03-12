import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { habits } from "../utils/dummyData";

// Stats row item - extracted for FlatList use
const StatItem = React.memo(({ label, value, color }) => (
  <View style={[styles.statItem, { borderLeftColor: color }]}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
));

export default function ProfileScreen({ route }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  // Safely handle when navigating directly (no params)
  const lastHabit = route.params?.lastHabit ?? "—";
  const lastStreak = route.params?.lastStreak ?? 0;
  const lastCategory = route.params?.lastCategory ?? "—";
  const lastIcon = route.params?.lastIcon ?? "🏅";

  // Computed global stats from all habits
  const stats = useMemo(() => {
    const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);
    const totalFailures = habits.reduce((acc, h) => acc + h.failures, 0);
    const perfectHabits = habits.filter((h) => h.failures === 0).length;
    const avgStreak = (totalStreak / habits.length).toFixed(1);
    return { totalStreak, totalFailures, perfectHabits, avgStreak };
  }, []);

  const statsList = useMemo(
    () => [
      { id: "1", label: "Racha total acumulada", value: `🔥 ${stats.totalStreak} días`, color: "#F59E0B" },
      { id: "2", label: "Hábitos sin fallas", value: `✅ ${stats.perfectHabits}`, color: "#10B981" },
      { id: "3", label: "Racha promedio", value: `📈 ${stats.avgStreak}`, color: "#3B82F6" },
      { id: "4", label: "Fallas totales", value: `❌ ${stats.totalFailures}`, color: "#EF4444" },
    ],
    [stats]
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: isTablet ? 60 : 20 },
      ]}
    >
      {/* Avatar / header */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🧑‍💪</Text>
        </View>
        <Text style={[styles.name, { fontSize: isTablet ? 26 : 22 }]}>
          Camilo Hábitos
        </Text>
        <Text style={styles.subtitle}>Construyendo disciplina diaria 💪</Text>
      </View>

      {/* Last viewed habit */}
      <View style={styles.lastHabitCard}>
        <Text style={styles.sectionTitle}>Último hábito consultado</Text>
        <View style={styles.lastHabitRow}>
          <Text style={styles.lastHabitIcon}>{lastIcon}</Text>
          <View>
            <Text style={styles.lastHabitName}>{lastHabit}</Text>
            <Text style={styles.lastHabitMeta}>
              {lastCategory} · 🔥 {lastStreak} días de racha
            </Text>
          </View>
        </View>
      </View>

      {/* Global stats using FlatList */}
      <Text style={styles.sectionTitle}>Resumen general</Text>
      <FlatList
        data={statsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StatItem label={item.label} value={item.value} color={item.color} />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.statsList}
      />

      {/* Total habits count */}
      <View style={styles.totalCard}>
        <Text style={styles.totalNumber}>{habits.length}</Text>
        <Text style={styles.totalLabel}>hábitos registrados en total</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  container: {
    paddingVertical: 24,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
  },
  avatarEmoji: {
    fontSize: 44,
  },
  name: {
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  lastHabitCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  lastHabitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lastHabitIcon: {
    fontSize: 36,
  },
  lastHabitName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  lastHabitMeta: {
    fontSize: 13,
    color: "#64748B",
  },
  statsList: {
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    color: "#64748B",
    flex: 1,
    textAlign: "right",
  },
  totalCard: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  totalNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  totalLabel: {
    fontSize: 14,
    color: "#BFDBFE",
    marginTop: 4,
  },
});
