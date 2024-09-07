import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@rneui/themed"; // Or any icon library you are using
import { useNavigation } from "@react-navigation/native";

const HEADER_HEIGHT = 50;

type Props = PropsWithChildren<{
  title: string;
  headerBackgroundColor: { dark: string; light: string };
  leftIcon?: ReactElement; // Optional left icon prop
  rightIcon?: ReactElement; // Optional right icon prop
  onLeftIconPress?: () => void; // Function triggered when left icon is pressed
  onRightIconPress?: () => void; // Function triggered when right icon is pressed
}>;

export default function ParallaxScrollView({
  children,
  title,
  headerBackgroundColor,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation(); // Access navigation if needed

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0],
      [HEADER_HEIGHT, 0]
    );

    return {
      height: HEADER_HEIGHT,
      transform: [{ translateY }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <ThemedView
          style={{
            backgroundColor: headerBackgroundColor[colorScheme],
            flexDirection: "row", // Layout icons and title in a row
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            height: HEADER_HEIGHT,
          }}
        >
          {/* Left Icon with Clickable Navigation */}
          {leftIcon && (
            <TouchableOpacity
              onPress={onLeftIconPress || (() => navigation.goBack())}
            >
              {leftIcon}
            </TouchableOpacity>
          )}

          {/* Title */}
          <ThemedText type="title">{title}</ThemedText>

          {/* Right Icon with Clickable Functionality */}
          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </ThemedView>
      </Animated.View>

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
