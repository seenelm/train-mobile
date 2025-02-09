import { useRef, useEffect } from "react";
import { Animated, PanResponder } from "react-native";
import { useEventContext } from "../context/EventProvider";

export interface EventListHook {
  animation: Animated.Value;
  translateX: Animated.Value;
  panResponder: any;
}

const useEventList = () => {
  const { selectedDate, setSelectedDate } = useEventContext();

  const animation = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const currentDateRef = useRef(selectedDate);

  // Always keep ref updated
  useEffect(() => {
    currentDateRef.current = selectedDate;
  }, [selectedDate]);

  // Animation setup
  useEffect(() => {
    const direction = selectedDate > currentDateRef.current ? -1 : 1;

    Animated.parallel([
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 50 * direction,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [selectedDate]);

  // Pan responder with correct date reference
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 50 || Math.abs(gestureState.vx) > 0.3) {
          const baseDate = new Date(currentDateRef.current);

          if (gestureState.dx > 0) {
            baseDate.setDate(baseDate.getDate() - 1);
          } else {
            baseDate.setDate(baseDate.getDate() + 1);
          }

          setSelectedDate(baseDate);
        }
      },
    })
  ).current;

  return {
    animation,
    translateX,
    panResponder,
  } as EventListHook;
};

export default useEventList;
