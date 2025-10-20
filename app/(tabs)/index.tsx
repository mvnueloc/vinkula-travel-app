import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card, TextField } from "heroui-native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
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

  const { user } = useAuthStore();
  return (
    <SafeAreaView className="flex-1 justify-start items-center relative">
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
      <View className="w-full">
        <View className="mx-4">
          {/* Avatar y saludo */}
          <View className="flex-row justify-start items-center mt-4 ">
            <View className="w-12 h-12 bg-cyan-700 rounded-full justify-center items-center mr-3">
              <Text className="text-gray-200 font-semibold text-md text-center ">
                {user?.name.charAt(0)}
                {user?.lastName.charAt(0)}
              </Text>
            </View>
            <Text className="text-gray-200 font-semibold text-md text-center ">
              Hola, {user?.name}!
            </Text>
          </View>
          {/* Barra de navegación */}
          <TextField className="mt-4">
            <TextField.Input placeholder="Buscar">
              <TextField.InputStartContent className="pointer-events-none">
                <FontAwesome
                  name="search"
                  size={20}
                  color="#808080"
                />
              </TextField.InputStartContent>
            </TextField.Input>
          </TextField>
          {/* Lugares recomendados */}
          <Text className="text-gray-200 font-semibold text-lg  mt-8">
            Lugares recomendados
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3">
            {destinations.map((destination, index) => (
              <Card
                key={index}
                surfaceVariant="2"
                className="flex-1 rounded-xl max-w-56 mr-4 h-auto">
                <View className="gap-4">
                  <Card.Header>
                    <Image
                      source={destination.photo}
                      style={{
                        height: 90,
                        aspectRatio: 1,
                        borderRadius: 12,
                      }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title numberOfLines={1}>
                      {destination.title}
                    </Card.Title>
                    <Card.Description
                      className="mb-4 whitespace-nowrap "
                      numberOfLines={1}>
                      {destination.description}
                    </Card.Description>
                  </Card.Body>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Index;
