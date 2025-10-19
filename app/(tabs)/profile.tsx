import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { DialogTextInput } from "@/componentes/DialogTextInput";
import { useAuthStore } from "@/store/authStore";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Button, Card, Divider } from "heroui-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleLogOut = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    logout();
  };

  const accordionData = [
    {
      id: "1",
      title: "Editar perfil",
      icon: (
        <FontAwesome5
          name="user-edit"
          size={24}
          color="black"
        />
      ),
      dialog: <DialogTextInput />,
      // onPress: () => setIsDialogOpen(true),
    },
    {
      id: "3",
      title: "Categorias favoritas",
      icon: (
        <MaterialIcons
          name="category"
          size={24}
          color="black"
        />
      ),
      dialog: <DialogTextInput />,
      // onPress: () => setIsDialogOpen(true),
    },
    {
      id: "2",
      title: "Lugares favoritos",
      icon: (
        <MaterialIcons
          name="place"
          size={24}
          color="black"
        />
      ),
      dialog: <DialogTextInput />,
      // onPress: () => setIsDialogOpen(true),
    },
  ];

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

      <Card className="w-11/12 max-w-md mt-12 bg-black/75 border-neutral-600">
        <Card.Body>
          <Card.Description className="">
            {/* Image profile */}
            <View className="w-full">
              <View className="flex justify-center items-center w-full">
                <View className="w-24 h-24 rounded-full bg-cyan-700 flex justify-center items-center mt-8">
                  <Text className="text-gray-200 font-semibold text-4xl text-center">
                    {user?.name.charAt(0)}
                    {user?.lastName.charAt(0)}
                  </Text>
                </View>
                {/* Profile Information */}
                <View className="mb-6 mt-6">
                  <Text className="text-3xl font-semibold text-center text-gray-200">
                    {user?.name} {user?.lastName}
                  </Text>
                  <Text className="text-md text-center text-zinc-500">
                    {user?.email}
                  </Text>
                </View>
              </View>
              {/* Your account settings  */}
              <Text className="text-lg font-bold mb-2  mt-4 text-gray-200">
                Tu cuenta
              </Text>
              {/* Accordion */}
            </View>
            <Card className="w-full bg-neutral-900 border-neutral-600">
              <Card.Body>
                <Pressable
                  onPress={() => {
                    router.push("../favorite-categorias");
                  }}
                  className="items-center flex-row justify-between w-full">
                  <View className="flex-row gap-2 items-center">
                    <FontAwesome5
                      name="user-edit"
                      size={16}
                      color="#e5e7eb"
                    />
                    <Text className="text-lg text-gray-200">Editar perfil</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={"#e5e7eb"}
                  />
                </Pressable>
                <Divider className="my-3" />
                {/* Categorias favoritas */}
                <Pressable
                  onPress={() => {
                    router.push("../favorite-categorias");
                  }}
                  className="items-center flex-row justify-between w-full">
                  <View className="flex-row gap-2 items-center">
                    <AntDesign
                      name="tags"
                      size={16}
                      color="#e5e7eb"
                    />
                    <Text className="text-lg text-gray-200">
                      Categorias favoritas
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={"#e5e7eb"}
                  />
                </Pressable>
                <Divider className="my-3" />
                {/* Lugares favoritas */}
                <Pressable
                  onPress={() => {
                    router.push("../favorite-categorias");
                  }}
                  className="items-center flex-row justify-between w-full">
                  <View className="flex-row gap-2 items-center">
                    <MaterialIcons
                      name="place"
                      size={16}
                      color="#e5e7eb"
                    />
                    <Text className="text-lg text-gray-200">
                      Lugares favoritos
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={"#e5e7eb"}
                  />
                </Pressable>
              </Card.Body>
            </Card>
          </Card.Description>
          {/* Log Out Button */}
          <Button
            size="md"
            variant="danger"
            className="w-full mt-4"
            onPress={handleLogOut}>
            <Button.LabelContent>Cerrar sesión</Button.LabelContent>
            <Button.EndContent>
              <Ionicons
                name="exit-outline"
                size={24}
                color="white"
              />
            </Button.EndContent>
          </Button>
        </Card.Body>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
