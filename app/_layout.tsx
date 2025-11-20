import "@/global.css";
import { useAuthStore } from "@/store/authStore";
import { Entypo } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { HeroUINativeProvider, useTheme } from "heroui-native";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const { isAuthenticated, checkAuth, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { theme, colors, isDark } = useTheme();
  let role = null;

  useEffect(() => {
    const init = async () => {
      checkAuth();
      setIsLoading(false);
      if (user) {
        console.log("User role:", user.role);
        role = user.role;
      }
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <HeroUINativeProvider
            config={{
              colorScheme: "dark",
              textProps: {
                allowFontScaling: false,
              },
            }}>
            <Stack>
              <Stack.Protected guard={isAuthenticated}>
                <Stack.Protected guard={user?.role === "user"}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="favorite-categorias"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="edit-profile"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="favorite-places"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="role-provider-request"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                </Stack.Protected>
                <Stack.Protected guard={user?.role === "provider"}>
                  <Stack.Screen
                    name="provider/(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="edit-profile"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="role-user-request"
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: "#0f0f0f",
                      },
                      headerLeft: () => (
                        <Pressable
                          onPress={() => router.back()}
                          className="flex-row items-center">
                          <Entypo
                            name="chevron-left"
                            size={24}
                            color="#e5e7eb"
                          />
                          <Text className="text-gray-200">Regresar</Text>
                        </Pressable>
                      ),
                      presentation: "formSheet",

                      headerTitle: "",
                    }}
                  />
                </Stack.Protected>
              </Stack.Protected>

              <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen
                  name="index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="login"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="register"
                  options={{ headerShown: false }}
                />
              </Stack.Protected>
            </Stack>
          </HeroUINativeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
