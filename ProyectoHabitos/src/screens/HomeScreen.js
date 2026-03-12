import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import HabitCard from "../components/HabitCard";
import AppLogo from "../components/AppLogo";
import { habits, categories } from "../utils/dummyData";

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // --- datos computados ---
  const filteredHabits = useMemo(() => {
    if (selectedCategory === "Todas") return habits;
    return habits.filter((h) => h.category === selectedCategory);
  }, [selectedCategory]);

  const summary = useMemo(() => ({
    total: habits.length,
    bestStreak: Math.max(...habits.map((h) => h.streak)),
    perfect: habits.filter((h) => h.failures === 0).length,
  }), []);

  // --- handlers con useCallback ---
  const handleHabitPress = useCallback(
    (habit) => navigation.navigate("HabitDetail", { habit }),
    [navigation]
  );

  const handleCategoryPress = useCallback(
    (cat) => setSelectedCategory(cat),
    []
  );

  // --- renderers ---
  const renderCategory = useCallback(
    ({ item }) => {
      const isActive = item === selectedCategory;
      return (
        <TouchableOpacity
          style={[styles.chip, isActive && styles.chipActive]}
          onPress={() => handleCategoryPress(item)}
          activeOpacity={0.75}
        >
          <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory, handleCategoryPress]
  );

  const renderHabit = useCallback(
    ({ item }) => <HabitCard habit={item} onPress={handleHabitPress} />,
    [handleHabitPress]
  );

  const ListHeader = useMemo(
    () => (
      <>
        {/* Hero header con logo */}
        <View style={[styles.hero, { paddingHorizontal: isTablet ? 40 : 20 }]}>
          <StatusBar barStyle="light-content" backgroundColor="#1D4ED8" />
          <AppLogo size={isTablet ? "md" : "sm"} dark />
          <Text style={[styles.heroTitle, { fontSize: isTablet ? 26 : 22 }]}>
            Mis Hábitos Saludables
          </Text>

          {/* Cards de resumen */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{summary.total}</Text>
              <Text style={styles.summaryLabel}>Hábitos</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>🔥 {summary.bestStreak}</Text>
              <Text style={styles.summaryLabel}>Mejor racha</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>✅ {summary.perfect}</Text>
              <Text style={styles.summaryLabel}>Sin fallas</Text>
            </View>
          </View>
        </View>

        {/* Filtros de categoría */}
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={renderCategory}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.chipsContainer,
            { paddingHorizontal: isTablet ? 40 : 14 },
          ]}
          style={styles.chipsList}
        />

        <Text style={[styles.sectionLabel, { paddingHorizontal: isTablet ? 40 : 16 }]}>
          {selectedCategory === "Todas"
            ? `Todos los hábitos (${filteredHabits.length})`
            : `${selectedCategory} (${filteredHabits.length})`}
        </Text>
      </>
    ),
    [isTablet, summary, renderCategory, selectedCategory, filteredHabits.length]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay hábitos en esta categoría.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  hero: {
    backgroundColor: "#2563EB",
    paddingTop: 16,
    paddingBottom: 26,
  },
  heroTitle: {
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#BFDBFE",
    marginTop: 3,
  },
  chipsList: {
    maxHeight: 54,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  chipsContainer: {
    paddingVertical: 11,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  chipText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 16,
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 32,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#94A3B8",
    fontSize: 15,
  },
});
