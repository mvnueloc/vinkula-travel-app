import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Button } from "heroui-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{ flex: 1 }}
      className="relative">
      {/* Carrusel de imágenes de fondo con fade */}
      <BackgroundCarousel />
      {/* Degradado negro arriba a transparente abajo */}
      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.0)"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Contenido */}
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="px-6">
        <Text className="text-4xl font-extrabold text-white tracking-wide mb-56">
          VINKULA
        </Text>
        <Button
          size="lg"
          variant="primary"
          className="w-1/2 mt-4"
          onPress={() => {
            router.push("/login");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}>
          <Button.StartContent>
            <Ionicons
              name="airplane"
              size={24}
              color="white"
            />
          </Button.StartContent>
          <Button.LabelContent>Comenzar viaje</Button.LabelContent>
        </Button>
      </View>
    </View>
  );
}
