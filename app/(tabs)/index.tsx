import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "heroui-native";
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 20.980087,
          longitude: -89.628525,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={styles.map}
        userInterfaceStyle="dark">
        <Marker
          coordinate={{ latitude: 20.980087, longitude: -89.628525 }}
          // title="Abc Hospital"
          // description="This is a description of the hospital."
          isPreselected={true}
          titleVisibility="visible"
          subtitleVisibility="visible"
          onPress={() =>
            Alert.alert(
              "Abc Hospital",
              "This is a description of the hospital."
            )
          }>
          {/* <View className="flex-1 justify-center items-center">
            <Image
              source={require("../../assets/images/yucatan-3.jpg")}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text>Abc Hospital</Text>
          </View> */}
          <Card
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
          </Card>
        </Marker>
      </MapView>

      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { height: 200 }]}
      />
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
