import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Button, Card, Spinner, TextField } from "heroui-native";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert("Error", "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center relative">
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
      {/* Contenido */}
      <Text className="text-3xl font-semibold text-white mb-6">
        Iniciar sesión
      </Text>
      <Card className="w-11/12 max-w-md ">
        <Card.Body>
          <Card.Description>
            {/* Email */}
            <TextField
              className="w-full"
              isRequired
              isDisabled={loading}
              isInvalid={false}>
              <TextField.Label>Email</TextField.Label>
              <TextField.Input
                value={email}
                onChangeText={setEmail}
                placeholder="mail@example.com"
                inputMode="email"
                autoCapitalize="none"
              />
              <TextField.ErrorMessage>
                Por favor ingrese un email válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Password */}
            <TextField
              className="w-full mb-10"
              isRequired
              isDisabled={loading}
              isInvalid={false}>
              <TextField.Label>Contraseña</TextField.Label>
              <TextField.Input
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                secureTextEntry
              />
              <TextField.ErrorMessage>
                Por favor ingrese una contraseña válida
              </TextField.ErrorMessage>
            </TextField>
          </Card.Description>
          {/* Login Button */}
          {!loading && (
            <Button
              size="md"
              variant="primary"
              className="w-full mt-4"
              onPress={handleLogin}>
              Iniciar sesión
            </Button>
          )}
          {/* Loading State Login Button */}
          {loading && (
            <Button
              isDisabled
              className="w-full mt-4">
              <Button.StartContent>
                <Spinner
                  color={"white"}
                  size="sm"
                />
              </Button.StartContent>
              <Button.LabelContent>Validando...</Button.LabelContent>
            </Button>
          )}

          {/* Olvide mi contraseña */}
          <Text className="text-center mt-4 text-gray-500">
            Olvide mi contraseña
          </Text>
          {/* Crear cuenta |*/}
          <Button
            size="md"
            variant="secondary"
            isDisabled={loading}
            className="w-full mt-4 border-gray-500"
            onPress={() => {
              router.push("/register");
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }}>
            Crear cuenta
          </Button>
        </Card.Body>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
