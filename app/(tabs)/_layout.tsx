import { MyTabBar } from "@/componentes/TabBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

type Props = {};

export default function _layout({}: Props) {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="compass"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
