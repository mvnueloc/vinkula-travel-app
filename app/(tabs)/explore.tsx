import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "heroui-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type Destination = {
  title: string;
  description: string;
  coordinate: { latitude: number; longitude: number };
  photo: ImageSourcePropType;
};

export default function App() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const mapRef = React.useRef<MapView>(null);
  const scrollRef = useRef<ScrollView>(null);
  const currentIndexRef = useRef(0);

  // Dimensiones de las tarjetas y separación para snap
  const CARD_WIDTH = 280;
  const CARD_GAP = 16; // espacio entre tarjetas
  const CONTAINER_PADDING = 16; // padding visual a los extremos

  const destinations: Destination[] = [
    {
      title: "Fonda doña Mary",
      description: "Delicious Mexican food",
      coordinate: { latitude: 20.980087, longitude: -89.628525 },
      photo: require("../../assets/images/yucatan-3.jpg"),
    },
    {
      title: "Hotel Casa Blanca",
      description: "Comfortable stay in the city center",
      coordinate: { latitude: 20.9825, longitude: -89.62 },
      photo: require("../../assets/images/yucatan-3.jpg"),
    },
    {
      title: "Parque de las Américas",
      description: "Beautiful park for relaxation",
      coordinate: { latitude: 20.975, longitude: -89.615 },
      photo: require("../../assets/images/yucatan-3.jpg"),
    },
  ];

  // Offsets absolutos donde debe hacer snap cada tarjeta
  const snapOffsets = useMemo(
    () => destinations.map((_, i) => i * (CARD_WIDTH + CARD_GAP)),
    [destinations.length]
  );

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x - CONTAINER_PADDING;
    const rawIndex = Math.round(x / (CARD_WIDTH + CARD_GAP));
    const index = Math.max(0, Math.min(destinations.length - 1, rawIndex));
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      const destination = destinations[index];
      setSelectedDestination(destination);
      mapRef.current?.animateToRegion(
        {
          latitude: destination.coordinate.latitude,
          longitude: destination.coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        600
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 20.980087,
          longitude: -89.628525,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        style={styles.map}
        userInterfaceStyle="dark">
        {/* <Marker
          coordinate={{ latitude: 20.980087, longitude: -89.628525 }}
          isPreselected={true}
          titleVisibility="visible"
          subtitleVisibility="visible"
          onPress={() =>
            Alert.alert(
              "Abc Hospital",
              "This is a description of the hospital."
            )
          }>
          <Image
            source={require("../../assets/images/yucatan-3.jpg")}
            style={{
              height: 100,
              width: 100,
              aspectRatio: 1,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </Marker> */}
        {destinations.map((destination, index) => (
          <Marker
            key={index}
            coordinate={destination.coordinate}
            // title={destination.title}
            // description={destination.description}
            onPress={() =>
              Alert.alert(destination.title, destination.description)
            }>
            <Image
              source={destination.photo}
              style={{
                height: 100,
                width: 100,
                aspectRatio: 1,
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </Marker>
        ))}
      </MapView>

      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { height: 200 }]}
      />

      <SafeAreaView className="absolute bottom-36">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          className="flex-row"
          decelerationRate="fast"
          snapToOffsets={snapOffsets}
          disableIntervalMomentum
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}>
          {/* Espaciadores visuales sin afectar el snap base 0 */}
          <View style={{ width: CONTAINER_PADDING }} />
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="flex-row rounded-xl gap-4 p-4 bg-black/70 border-gray-800"
              style={{
                width: CARD_WIDTH,
                marginRight: index < destinations.length - 1 ? CARD_GAP : 0,
              }}
              surfaceVariant="2">
              <Image
                source={destination.photo}
                style={{
                  height: 50,
                  width: 80,
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
              <View className="gap-4">
                <Card.Body className="mb-2">
                  <Card.Title className="mb-1 text-gray-200">
                    {destination.title}
                  </Card.Title>
                  <Card.Description
                    numberOfLines={2}
                    className="text-gray-400">
                    {destination.description}
                  </Card.Description>
                </Card.Body>
                <Card.Footer>
                  <Pressable
                    className="flex-row items-center gap-1"
                    onPress={() => {
                      // Desplaza el scroll a la tarjeta seleccionada; el estado se actualizará en onMomentumScrollEnd
                      scrollRef.current?.scrollTo({
                        x: CONTAINER_PADDING + snapOffsets[index],
                        y: 0,
                        animated: true,
                      });
                      Haptics.selectionAsync();
                    }}>
                    <Text className="text-lg font-medium text-gray-200">
                      Ver
                    </Text>
                    <Ionicons
                      name="open-outline"
                      size={16}
                      color={"#e5e7eb"}
                    />
                  </Pressable>
                </Card.Footer>
              </View>
            </Card>
          ))}
          <View style={{ width: CONTAINER_PADDING }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
