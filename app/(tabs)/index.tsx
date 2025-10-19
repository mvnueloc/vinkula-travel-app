import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Card, ScrollShadow } from "heroui-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
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
        <ScrollShadow
          LinearGradientComponent={LinearGradient}
          color="#111">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="space-x-4 flex-row ">
            {/* <Card
              className="flex-row rounded-xl gap-4 p-4"
              surfaceVariant="2">
              <Image
                source={require("../../assets/images/yucatan-3.jpg")}
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
                  <Card.Title className="mb-1">Bringing the future</Card.Title>
                  <Card.Description numberOfLines={2}>
                    Today, 6:30 PM
                  </Card.Description>
                </Card.Body>
                <Card.Footer>
                  <Pressable className="flex-row items-center gap-1">
                    <Text className="text-sm font-medium text-foreground">
                      View Details
                    </Text>
                    <Ionicons
                      name="open-outline"
                      size={12}
                    />
                  </Pressable>
                </Card.Footer>
              </View>
            </Card> */}

            {destinations.map((destination, index) => (
              <Card
                key={index}
                className="flex-row rounded-xl gap-4 p-4 mr-5 bg-black/70 border-gray-800"
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
                        setSelectedDestination(destination);
                        mapRef.current?.animateToRegion(
                          {
                            latitude: destination.coordinate.latitude,
                            longitude: destination.coordinate.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                          },
                          1000
                        );
                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Success
                        );
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
          </ScrollView>
        </ScrollShadow>
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
