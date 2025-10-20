import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "heroui-native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const FavoritePlaces = () => {
  type Destination = {
    title: string;
    description: string;
    coordinate: { latitude: number; longitude: number };
    photo: ImageSourcePropType;
  };

  const destinations: Destination[] = [
    {
      title: "Fonda doña Mary",
      description: "Delicious Mexican food",
      coordinate: { latitude: 20.980087, longitude: -89.628525 },
      photo: require("../assets/images/yucatan-3.jpg"),
    },
    {
      title: "Hotel Casa Blanca",
      description: "Comfortable stay in the city center",
      coordinate: { latitude: 20.9825, longitude: -89.62 },
      photo: require("../assets/images/yucatan-3.jpg"),
    },
    {
      title: "Parque de las Américas",
      description: "Beautiful park for relaxation",
      coordinate: { latitude: 20.975, longitude: -89.615 },
      photo: require("../assets/images/yucatan-3.jpg"),
    },
  ];

  return (
    <View className="px-5 relative h-screen">
      {/* Imagen de fondo */}
      <BackgroundCarousel />
      {/* Degradado negro arriba a transparente abajo */}
      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.0)"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View className="mb-4 mt-8">
        <Text className="text-2xl font-semibold text-gray-200">
          Mis Lugares Favoritos
        </Text>
        <Text className="text-gray-300">
          Aqui encontraras los lugares que has marcado como favoritos, puedes
          explorar mas lugares en la pagina de inicio
        </Text>
      </View>
      {/* <Card
        className="flex-row rounded-xl gap-4 p-4"
        surfaceVariant="2">
        <Image
          source={require("../assets/images/yucatan-3.jpg")}
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
                color="white"
              />
            </Pressable>
          </Card.Footer>
        </View>
      </Card> */}
      {destinations.map((destination, index) => (
        <Card
          key={index}
          className="flex-row rounded-xl gap-4 p-4 mt-4"
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
              <Card.Title className="mb-1">{destination.title}</Card.Title>
              <Card.Description numberOfLines={2}>
                {destination.description}
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
                  color="white"
                />
              </Pressable>
            </Card.Footer>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FavoritePlaces;
