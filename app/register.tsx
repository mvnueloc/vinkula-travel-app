import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Button, Card, Spinner, TextField } from "heroui-native";
import React from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const { register } = useAuthStore();

  const handleRegister = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLoading(true);
    try {
      const success = await register(name, lastName, email, password);
      if (!success) {
        Alert.alert("Error", "Register failed.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      {/* Contenido */}
      <Text className="text-3xl font-semibold text-white mb-6 mt-12">
        Crear nueva cuenta
      </Text>
      <Card className="w-11/12 max-w-md ">
        <Card.Body>
          <Card.Description>
            {/* Nombre */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={false}
              isDisabled={loading}>
              <TextField.Label>Nombres</TextField.Label>
              <TextField.Input
                placeholder="Juan Andres"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              <TextField.ErrorMessage>
                Por favor ingrese un nombre válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Apellido */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={false}
              isDisabled={loading}>
              <TextField.Label>Apellido</TextField.Label>
              <TextField.Input
                placeholder="Pérez Nava"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
              <TextField.ErrorMessage>
                Por favor ingrese un apellido válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Email */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={false}
              isDisabled={loading}>
              <TextField.Label>Email</TextField.Label>
              <TextField.Input
                placeholder="mail@example.com"
                value={email}
                inputMode="email"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
              <TextField.ErrorMessage>
                Por favor ingrese un email válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Password */}
            <TextField
              className="w-full mb-10"
              isRequired
              isInvalid={false}
              isDisabled={loading}>
              <TextField.Label>Contraseña</TextField.Label>
              <TextField.Input
                placeholder="Ingresa tu contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextField.ErrorMessage>
                Por favor ingrese una contraseña válida
              </TextField.ErrorMessage>
            </TextField>
            {/* ConfirmPassword */}
            <TextField
              className="w-full mb-10"
              isRequired
              isInvalid={password !== confirmPassword}
              isDisabled={loading}>
              <TextField.Label>Repetir contraseña</TextField.Label>
              <TextField.Input
                placeholder="Repite tu contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TextField.ErrorMessage>
                La contraseña no coincide
              </TextField.ErrorMessage>
            </TextField>
          </Card.Description>
          {/* Login Button */}
          {!loading && (
            <Button
              size="md"
              variant="primary"
              className="w-full mt-4"
              onPress={handleRegister}>
              Crear cuenta
            </Button>
          )}

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
              <Button.LabelContent>Creando cuenta...</Button.LabelContent>
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
            className="w-full mt-4 border-gray-500"
            onPress={() => {
              router.push("/login");
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }}
            isDisabled={loading}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Button>
        </Card.Body>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Register;
