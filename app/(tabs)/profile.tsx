import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Card } from "heroui-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { logout, user } = useAuthStore();

  const handleLogin = () => {
    logout();
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Card className="w-11/12 max-w-md">
        <Card.Body>
          <Card.Title
            className="text-xl font-semibold
                  mb-4">
            Perfil
          </Card.Title>
          <Card.Description>
            {/* Profile Information */}
            <View className="mb-6">
              <Text>Name: {user?.name}</Text>
              <Text>Last Name: {user?.lastName}</Text>
              <Text>Email: {user?.email}</Text>
            </View>
            {/* Login Button */}
          </Card.Description>
          <Button
            size="md"
            variant="danger"
            className="w-full mt-4"
            onPress={handleLogin}>
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
