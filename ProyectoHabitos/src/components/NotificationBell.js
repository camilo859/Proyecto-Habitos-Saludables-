import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { generateNotifications, formatRelativeTime } from "../utils/notifications";
import { habits } from "../utils/dummyData";

export default function NotificationBell() {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [readIds, setReadIds] = useState(new Set());

  const notifications = useMemo(() => generateNotifications(habits), []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !readIds.has(n.id)).length,
    [notifications, readIds]
  );

  const markAllRead = useCallback(() => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }, [notifications]);

  const markOneRead = useCallback((id) => {
    setReadIds((prev) => new Set([...prev, id]));
  }, []);

  const renderNotif = useCallback(
    ({ item }) => {
      const isRead = readIds.has(item.id);
      return (
        <TouchableOpacity
          style={[styles.notifItem, isRead && styles.notifRead]}
          onPress={() => markOneRead(item.id)}
          activeOpacity={0.75}
        >
          {!isRead && (
            <View style={[styles.unreadDot, { backgroundColor: item.color }]} />
          )}
          <View style={[styles.notifIconWrap, { backgroundColor: item.color + "18" }]}>
            <Text style={styles.notifIcon}>{item.icon}</Text>
          </View>
          <View style={styles.notifBody}>
            <Text style={[styles.notifTitle, isRead && styles.notifTitleRead]}>
              {item.title}
            </Text>
            <Text style={styles.notifText} numberOfLines={2}>
              {item.body}
            </Text>
            <Text style={styles.notifTime}>
              {formatRelativeTime(item.time)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [readIds, markOneRead]
  );

  return (
    <>
      {/* Campanita con ícono vectorial */}
      <TouchableOpacity
        style={styles.bellBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.75}
      >
        <Ionicons
          name={unreadCount > 0 ? "notifications" : "notifications-outline"}
          size={26}
          color="#FFFFFF"
        />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.panel, { width: Math.min(width - 32, 420) }]}>
          {/* Header del panel */}
          <View style={styles.panelHeader}>
            <View style={styles.panelTitleRow}>
              <Ionicons name="notifications" size={18} color="#2563EB" />
              <Text style={styles.panelTitle}>Notificaciones</Text>
              {unreadCount > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.panelActions}>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
                  <Text style={styles.markAllText}>Marcar todo leído</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={22} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Lista */}
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotif}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay notificaciones.</Text>
            }
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bellBtn: {
    position: "relative",
    padding: 6,
    marginRight: 4,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#2563EB",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  panel: {
    position: "absolute",
    top: 70,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: 480,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  panelTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
  },
  countBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  countBadgeText: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "700",
  },
  panelActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  markAllBtn: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  markAllText: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "700",
  },
  list: { maxHeight: 400 },
  notifItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    backgroundColor: "#FAFAFA",
    position: "relative",
  },
  notifRead: {
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
  },
  unreadDot: {
    position: "absolute",
    top: 20,
    left: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  notifIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 8,
  },
  notifIcon: { fontSize: 20 },
  notifBody: { flex: 1 },
  notifTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 3,
  },
  notifTitleRead: {
    color: "#64748B",
    fontWeight: "500",
  },
  notifText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: 10,
    color: "#94A3B8",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 62,
  },
  emptyText: {
    textAlign: "center",
    padding: 24,
    color: "#94A3B8",
    fontSize: 14,
  },
});
