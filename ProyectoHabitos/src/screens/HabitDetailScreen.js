import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { evaluateHabit, getLevelColor, getProgressPercent } from "../utils/habitRules";

export default function HabitDetailScreen({ route, navigation }) {
  const { habit } = route.params;
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  const evaluation = useMemo(() => evaluateHabit(habit.streak, habit.failures), [habit]);
  const progress = useMemo(() => getProgressPercent(habit.streak), [habit.streak]);
  const messageColor = useMemo(() => getLevelColor(evaluation.level), [evaluation.level]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: isTablet ? 60 : 20 },
      ]}
    >
      {/* Hero card */}
      <View style={[styles.heroCard, { borderTopColor: habit.color }]}>
        <Text style={styles.icon}>{habit.icon}</Text>
        <Text style={[styles.title, { fontSize: isTablet ? 26 : 22 }]}>
          {habit.name}
        </Text>
        <View style={[styles.badge, { backgroundColor: habit.color + "22" }]}>
          <Text style={[styles.badgeText, { color: habit.color }]}>
            {habit.category}
          </Text>
        </View>
        <Text style={styles.description}>{habit.description}</Text>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statBig}>{habit.streak}</Text>
          <Text style={styles.statSub}>días racha</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>❌</Text>
          <Text style={styles.statBig}>{habit.failures}</Text>
          <Text style={styles.statSub}>fallas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🎯</Text>
          <Text style={styles.statBig}>{habit.goal}</Text>
          <Text style={styles.statSub}>{habit.unit}</Text>
        </View>
      </View>

      {/* Progress toward 21-day habit */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progreso hacia hábito consolidado</Text>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%`, backgroundColor: habit.color },
            ]}
          />
        </View>
        <Text style={styles.progressSub}>Meta: 21 días consecutivos</Text>
      </View>

      {/* Evaluation message */}
      <View style={[styles.messageCard, { borderLeftColor: messageColor }]}>
        <Text style={[styles.messageText, { color: messageColor }]}>
          {evaluation.text}
        </Text>
      </View>

      {/* Go to profile */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: habit.color }]}
        onPress={() =>
          navigation.navigate("Profile", {
            lastHabit: habit.name,
            lastStreak: habit.streak,
            lastCategory: habit.category,
            lastIcon: habit.icon,
          })
        }
      >
        <Text style={styles.buttonText}>Ver en mi Perfil →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  container: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    borderTopWidth: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 52,
    marginBottom: 10,
  },
  title: {
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    fontWeight: "600",
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statBig: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
  },
  statSub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
    textAlign: "center",
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
    flex: 1,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
  },
  progressBarBg: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
  },
  progressSub: {
    fontSize: 11,
    color: "#94A3B8",
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderLeftWidth: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  button: {
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
