import { Animated } from "react-native";
import { useEffect, useRef } from "react";

export const useFadeIn = (duration = 2500) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration]);

  return opacity;
};

export const useTranslateY = (
  initialValue: number,
  toValue: number,
  duration = 1000
) => {
  const translateY = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [translateY, toValue, duration]);

  return translateY;
};