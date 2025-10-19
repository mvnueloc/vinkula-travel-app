import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Button, Card, Spinner, TextField } from "heroui-native";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Login = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // Estados de error para validación
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (email.trim() === "") {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
    if (password.trim() === "") {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

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
      <Card className="w-11/12 max-w-md bg-black/75  border-blue-600">
        <Card.Body>
          <Card.Description>
            {/* Email */}
            <TextField
              className="w-full"
              isRequired
              isDisabled={loading}
              isInvalid={emailError}>
              <TextField.Label className="text-gray-200">Email</TextField.Label>
              <TextField.Input
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
                value={email}
                onChangeText={setEmail}
                placeholder="mail@example.com"
                placeholderTextColor={"#8b8b8b"}
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
              isInvalid={passwordError}>
              <TextField.Label className="text-gray-200">
                Contraseña
              </TextField.Label>
              <TextField.Input
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
                className="text-gray-200"
                placeholderTextColor={"#8b8b8b"}
                style={{ color: "white" }}
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
          <Text className="text-center mt-4 text-gray-300">
            Olvide mi contraseña
          </Text>
          {/* Crear cuenta |*/}
          <Button
            size="md"
            variant="tertiary"
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
