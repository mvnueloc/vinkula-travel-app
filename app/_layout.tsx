import "@/global.css";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      checkAuth();
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <HeroUINativeProvider>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
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
  );
}
