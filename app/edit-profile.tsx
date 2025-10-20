import BackgroundCarousel from "@/componentes/BackgroundCarousel";
import { useAuthStore } from "@/store/authStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Category = {
  idCategory: string | number;
  name: string;
};

export default function EditProfile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Estados de error para validación
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log("Actualizado");
  };

  return (
    <View className="flex-1 justify-start items-center relative h-screen">
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
          Actualizar Perfil
        </Text>
      </View>
      <Card className="w-11/12 max-w-md bg-black/75  border-blue-600 mt">
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
            {/* <TextField
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
            </TextField> */}
            {/* ConfirmPassword */}
            {/* <TextField
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
            </TextField> */}
          </Card.Description>
          {/* Update Button */}
          {!loading && (
            <Button
              size="md"
              variant="primary"
              className="w-full mt-4"
              onPress={handleUpdateProfile}>
              Actualizar
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
              <Button.LabelContent>Actualizando cuenta...</Button.LabelContent>
            </Button>
          )}
        </Card.Body>
      </Card>
    </View>
  );
}
