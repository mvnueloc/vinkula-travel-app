import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../store/authStore";

const RoleProviderRequest = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const roleProviderRequest = useAuthStore(
    (state) => state.roleProviderRequest
  );
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);

      const ok = await roleProviderRequest("provider", user?.idUser);

      if (!ok) {
        setError(
          "Ocurrió un problema al actualizar tu tipo de cuenta. Inténtalo de nuevo."
        );
        return;
      }

      router.replace("/(tabs)");
    } catch (e) {
      setError(
        "Ocurrió un problema al actualizar tu tipo de cuenta. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + 16 }]}
      className="h-screen">
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cambiar tipo de cuenta</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <Text style={styles.badge}>Nuevo rol proveedor</Text>
        <Text style={styles.title}>Pasa de Turista a Proveedor</Text>
        <Text style={styles.subtitle}>
          Estás a punto de cambiar tu tipo de cuenta. Al hacerlo, verás nuevas
          opciones para publicar experiencias y gestionar tus reservas.
        </Text>

        <View style={styles.separator} />

        <View style={styles.benefitsRow}>
          <View style={styles.benefitBullet} />
          <Text style={styles.benefitText}>
            Podrás crear y gestionar tus propios lugares y actividades.
          </Text>
        </View>
        <View style={styles.benefitsRow}>
          <View style={styles.benefitBullet} />
          <Text style={styles.benefitText}>
            Tendrás panel de proveedor con métricas y reservas.
          </Text>
        </View>
        <View style={styles.benefitsRow}>
          <View style={styles.benefitBullet} />
          <Text style={styles.benefitText}>
            Siempre podrás volver a una cuenta Turista cuando quieras.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>¿Qué cambia?</Text>
          <Text style={styles.infoText}>
            Tus permisos se actualizarán para permitirte administrar contenido
            como proveedor. Tus datos personales y reservas actuales se
            mantendrán intactos.
          </Text>
        </View>
      </View>

      {/* Mensaje de error */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Botones de acción */}
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={handleBack}
          disabled={loading}>
          <Text style={styles.secondaryText}>Seguir como turista</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && { transform: [{ scale: 0.98 }] },
            loading && { opacity: 0.9 },
          ]}
          onPress={handleConfirm}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryText}>Confirmar cambio de cuenta</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#050816",
    justifyContent: "flex-start",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingTop: 32,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  backText: {
    color: "#ffffff",
    fontSize: 18,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  card: {
    backgroundColor: "#0B1020",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(56,189,248,0.15)",
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(148,163,184,0.3)",
    marginVertical: 16,
  },
  benefitsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  benefitBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38BDF8",
    marginTop: 6,
    marginRight: 10,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: "#E5E7EB",
    lineHeight: 20,
  },
  infoBox: {
    marginTop: 16,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(15,23,42,0.9)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.5)",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#9CA3AF",
    lineHeight: 18,
  },
  errorBox: {
    marginTop: 16,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.5)",
  },
  errorText: {
    fontSize: 13,
    color: "#FCA5A5",
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.6)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.9)",
  },
  secondaryText: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "500",
  },
  primaryButton: {
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22C55E",
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RoleProviderRequest;
