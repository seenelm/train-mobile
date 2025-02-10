import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { FlatList } from "react-native";
import { getAllWeeksInYear } from "../utils/dateUtils";
import { useCalendarContext } from "../context/CalendarContext";

export interface CalendarScroll {
  allWeeks: Date[][];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  findCurrentWeekIndex: (weeks: Date[][]) => number;
  flatListRef: React.RefObject<FlatList>;
}

export const useCalendarScroll = () => {
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const flatListRef = useRef<FlatList>(null);
  const allWeeks = useMemo(
    () => getAllWeeksInYear(selectedDate.getFullYear()),
    [selectedDate]
  );

  const findCurrentWeekIndex = (weeks: Date[][]): number => {
    return weeks.findIndex((week) =>
      week.some(
        (d) =>
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
      )
    );
  };

  const scrollToSelectedWeek = useCallback(
    (weeks: Date[][]) => {
      const index = findCurrentWeekIndex(weeks);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
      }
    },
    [findCurrentWeekIndex]
  );

  useEffect(() => {
    scrollToSelectedWeek(allWeeks);
  }, [allWeeks, scrollToSelectedWeek]);

  return {
    allWeeks,
    selectedDate,
    setSelectedDate,
    findCurrentWeekIndex,
    flatListRef,
  } as CalendarScroll;
};
