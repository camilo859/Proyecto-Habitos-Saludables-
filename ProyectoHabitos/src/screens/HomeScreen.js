import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import HabitCard from "../components/HabitCard";
import { habits, categories } from "../utils/dummyData";

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredHabits = useMemo(() => {
    if (selectedCategory === "Todas") return habits;
    return habits.filter((h) => h.category === selectedCategory);
  }, [selectedCategory]);

  const handlePress = useCallback(
    (habit) => {
      navigation.navigate("HabitDetail", { habit });
    },
    [navigation]
  );

  const bestStreak = useMemo(
    () => Math.max(...habits.map((h) => h.streak)),
    []
  );

  const renderCategory = useCallback(
    ({ item }) => {
      const isActive = item === selectedCategory;
      return (
        <TouchableOpacity
          style={[styles.chip, isActive && styles.chipActive]}
          onPress={() => setSelectedCategory(item)}
        >
          <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory]
  );

  const renderHabit = useCallback(
    ({ item }) => <HabitCard habit={item} onPress={handlePress} />,
    [handlePress]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        <Text style={[styles.greeting, { fontSize: isTablet ? 16 : 14 }]}>
          ¡Hola! 👋
        </Text>
        <Text style={[styles.title, { fontSize: isTablet ? 28 : 24 }]}>
          Mis Hábitos Saludables
        </Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{habits.length}</Text>
            <Text style={styles.summaryLabel}>Hábitos</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>🔥{bestStreak}</Text>
            <Text style={styles.summaryLabel}>Mejor racha</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {habits.filter((h) => h.failures === 0).length}
            </Text>
            <Text style={styles.summaryLabel}>Sin fallas</Text>
          </View>
        </View>
      </View>

      {/* Category filter */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.categoriesContainer,
          { paddingHorizontal: isTablet ? 40 : 16 },
        ]}
        style={styles.categoriesList}
      />

      {/* Habits list */}
      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay hábitos en esta categoría.</Text>
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
  header: {
    backgroundColor: "#2563EB",
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    color: "#BFDBFE",
    marginBottom: 2,
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 10,
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
    marginTop: 2,
  },
  categoriesList: {
    maxHeight: 52,
    backgroundColor: "#FFFFFF",
  },
  categoriesContainer: {
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
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
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#94A3B8",
    fontSize: 15,
  },
});
