import { MyTabBar } from "@/componentes/TabBar";
import {
  Home2Outlined,
  Home2Solid,
  User4Outlined,
  User4Solid,
} from "@lineiconshq/free-icons";
import { Lineicons } from "@lineiconshq/react-native-lineicons";
import { Tabs } from "expo-router";

type Props = {};

export default function _layout({}: Props) {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Crear destino",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Lineicons
                icon={Home2Solid}
                size={size}
                color={color}
                strokeWidth={2}
              />
            ) : (
              <Lineicons
                icon={Home2Outlined}
                color={color}
                size={size}
                strokeWidth={2}
              />
            ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Explorar",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Lineicons
                icon={MapMarker1Solid}
                color={color}
                size={size}
                strokeWidth={2}
              />
            ) : (
              <Lineicons
                icon={MapMarker1Outlined}
                color={color}
                size={size}
                strokeWidth={2}
              />
            ),
        }}
      />
      */}
      <Tabs.Screen
        name="provider-profile"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Lineicons
                icon={User4Solid}
                color={color}
                size={size}
                strokeWidth={2}
              />
            ) : (
              <Lineicons
                icon={User4Outlined}
                color={color}
                size={size}
                strokeWidth={2}
              />
            ),
        }}
      />
    </Tabs>
  );
}
