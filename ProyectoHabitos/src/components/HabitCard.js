import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";

const HabitCard = React.memo(({ habit, onPress }) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  return (
    <TouchableOpacity
      style={[styles.card, { marginHorizontal: isTablet ? 40 : 16 }]}
      onPress={() => onPress(habit)}
      activeOpacity={0.85}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: habit.color }]} />

      <View style={styles.content}>
        {/* Top row: icon + name + category badge */}
        <View style={styles.topRow}>
          <Text style={styles.icon}>{habit.icon}</Text>
          <View style={styles.nameBlock}>
            <Text style={[styles.title, { fontSize: isTablet ? 20 : 17 }]}>{habit.name}</Text>
            <View style={[styles.badge, { backgroundColor: habit.color + "22" }]}>
              <Text style={[styles.badgeText, { color: habit.color }]}>{habit.category}</Text>
            </View>
          </View>
        </View>

        {/* Bottom row: streak + failures */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>🔥 {habit.streak}</Text>
            <Text style={styles.statLabel}>días racha</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>❌ {habit.failures}</Text>
            <Text style={styles.statLabel}>fallas</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>🎯 {habit.goal}</Text>
            <Text style={styles.statLabel}>{habit.unit}</Text>
          </View>
        </View>
      </View>

      {/* Arrow */}
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  accentBar: {
    width: 5,
    alignSelf: "stretch",
  },
  content: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  nameBlock: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 8,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2E8F0",
  },
  arrow: {
    fontSize: 24,
    color: "#CBD5E1",
    paddingRight: 12,
  },
});

export default HabitCard;
