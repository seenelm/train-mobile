import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  useSharedValue,
  interpolate,
  runOnJS,
  withSpring,
  Extrapolate,
} from "react-native-reanimated";
import { useAnimatedGestureHandler } from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";

const START_HEIGHT = Dimensions.get("window").height * 0.05;
const END_HEIGHT = Dimensions.get("window").height * 0.24;

interface CalendarGesture {
  gestureHandler: any;
  viewMode: string;
  isScrollable: boolean;
  panelHeight: SharedValue<number>;
}

const fromCalendarGestureHook = (
  gestureHandler: any,
  viewMode: string,
  isScrollable: boolean,
  panelHeight: SharedValue<number>
): CalendarGesture => {
  const calendarGesture: CalendarGesture = {
    gestureHandler,
    viewMode,
    isScrollable,
    panelHeight,
  };
  return calendarGesture;
};

export const useCalendarGesture = () => {
  const panelHeight = useSharedValue<number>(START_HEIGHT);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_: any, ctx: { startHeight: number }) => {
      ctx.startHeight = panelHeight.value;
    },
    onActive: (event: any, ctx: { startHeight: number }) => {
      let newHeight = ctx.startHeight + event.translationY;
      newHeight = Math.max(START_HEIGHT, newHeight);
      newHeight = Math.min(END_HEIGHT, newHeight);
      panelHeight.value = interpolate(
        newHeight,
        [START_HEIGHT, END_HEIGHT],
        [START_HEIGHT, END_HEIGHT],
        Extrapolate.CLAMP
      );

      if (!isScrollable) {
        runOnJS(setIsScrollable)(true);
        runOnJS(setViewMode)("month");
      }
    },
    onEnd: (_: any) => {
      if (_.velocityY >= 0) {
        panelHeight.value = withSpring(END_HEIGHT, {
          damping: 20,
          stiffness: 100,
        });
      } else {
        panelHeight.value = withSpring(START_HEIGHT, {
          damping: 20,
          stiffness: 100,
        });
        if (isScrollable) {
          runOnJS(setIsScrollable)(false);
          runOnJS(setViewMode)("week");
        }
      }
    },
  });

  return fromCalendarGestureHook(
    gestureHandler,
    viewMode,
    isScrollable,
    panelHeight
  );
};
