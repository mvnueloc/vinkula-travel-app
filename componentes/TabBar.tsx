import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const labelText =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const renderIcon =
          options.tabBarIcon ??
          (({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => (
            <Feather
              name="circle"
              size={size}
              color={color}
            />
          ));

        return (
          <TabBarButton
            key={route.key}
            href={buildHref(route.name, route.params)}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            colors={colors}
            labelText={labelText}
            renderIcon={({ color, size, focused }) =>
              // Propagamos también "focused" para respetar la firma de tabBarIcon
              renderIcon({ color, size, focused })
            }
          />
        );
      })}
    </View>
  );
}

type TabBarButtonProps = {
  href?: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
  colors: { primary: string; text: string };
  labelText: string;
  renderIcon: (args: {
    color: string;
    size: number;
    focused: boolean;
  }) => React.ReactNode;
};

function TabBarButton({
  href,
  isFocused,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  colors,
  labelText,
  renderIcon,
}: TabBarButtonProps) {
  const scale = React.useRef(new Animated.Value(1)).current;

  // Anima cada vez que esta pestaña se convierte en la enfocada
  React.useEffect(() => {
    if (isFocused) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused, scale]);

  const color = isFocused ? "#fff" : "#c5c5c5";

  return (
    <PlatformPressable
      href={href}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {renderIcon({ color, size: 24, focused: isFocused })}
      </Animated.View>
      <Text style={{ color }}>{labelText}</Text>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    opacity: 0.8,
    marginHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
