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
  // Estados para los campos del formulario
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // Estados de error para validación
  const [nameError, setNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const { register } = useAuthStore();

  const handleRegister = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (name.trim() === "") {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    if (lastName.trim() === "") {
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
    }
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
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

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
      <Card className="w-11/12 max-w-md bg-black/75  border-blue-600">
        <Card.Body>
          <Card.Description>
            {/* Nombre */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={nameError}
              isDisabled={loading}>
              <TextField.Label>Nombres</TextField.Label>
              <TextField.Input
                placeholder="Juan Andres"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
              />
              <TextField.ErrorMessage>
                Por favor ingrese un nombre válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Apellido */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={lastNameError}
              isDisabled={loading}>
              <TextField.Label>Apellido</TextField.Label>
              <TextField.Input
                placeholder="Pérez Nava"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
              />
              <TextField.ErrorMessage>
                Por favor ingrese un apellido válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Email */}
            <TextField
              className="w-full"
              isRequired
              isInvalid={emailError}
              isDisabled={loading}>
              <TextField.Label>Email</TextField.Label>
              <TextField.Input
                placeholder="mail@example.com"
                value={email}
                inputMode="email"
                autoCapitalize="none"
                onChangeText={setEmail}
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
              />
              <TextField.ErrorMessage>
                Por favor ingrese un email válido
              </TextField.ErrorMessage>
            </TextField>
            {/* Password */}
            <TextField
              className="w-full mb-10"
              isRequired
              isInvalid={passwordError}
              isDisabled={loading}>
              <TextField.Label>Contraseña</TextField.Label>
              <TextField.Input
                placeholder="Ingresa tu contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
              />
              <TextField.ErrorMessage>
                Por favor ingrese una contraseña válida
              </TextField.ErrorMessage>
            </TextField>
            {/* ConfirmPassword */}
            <TextField
              className="w-full mb-10"
              isRequired
              isInvalid={confirmPasswordError}
              isDisabled={loading}>
              <TextField.Label>Repetir contraseña</TextField.Label>
              <TextField.Input
                placeholder="Repite tu contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                colors={{
                  blurBorder: "",
                  focusBorder: "#3b82f6",
                  blurBackground: "#272727",
                  focusBackground: "#272727",
                }}
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
          {/* Crear cuenta |*/}
          <Button
            size="md"
            variant="tertiary"
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
