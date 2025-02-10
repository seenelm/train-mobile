import React, { useCallback, Fragment, useMemo } from "react";
import {View, Text, FlatList, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { daysOfWeek, getMonthName, getCurrentWeek } from "../utils/dateUtils";
import { PanGestureHandler } from "react-native-gesture-handler";
import Button from "../../../components/button";
import profile from "../../../assets/icons/profilepic.png";
import Header from "../../../components/header";
import Week from "./Week";
import { useCalendarScroll } from "../hooks/useCalendarScroll";
import { useCalendarGesture } from "../hooks/useCalendarGesture";
import { CalendarGesture } from "../hooks/useCalendarGesture";
import { CalendarScroll } from "../hooks/useCalendarScroll";

interface CalendarProps {}

const TopSheet: React.FC<CalendarProps> = () => {
  const calendarScroll: CalendarScroll = useCalendarScroll();
  const calendarGesture: CalendarGesture = useCalendarGesture();

  const initialScrollIndex = useMemo(() => calendarScroll.findCurrentWeekIndex(calendarScroll.allWeeks), [calendarScroll.allWeeks]);

  const onSelectDate = useCallback((date: Date) => {
    calendarScroll.setSelectedDate(date);
  }, []);

  const animatedContainerStyles = useAnimatedStyle(() => ({
    height: calendarGesture.panelHeight.value + 150,
  }));

  const animatedPanelStyles = useAnimatedStyle(() => ({
    height: calendarGesture.panelHeight.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedContainerStyles]}>
      <View style={styles.test}>
        <Header
          leftComponent={
            <Fragment>
              <Button
                onPress={() => {}}
                imgSource={profile}
                style={styles.iconContainer}
                imgStyle={styles.profileImage}
              />
              
            </Fragment>
          }
          middleComponent={<Text style={styles.monthText}>{getMonthName(calendarScroll.selectedDate)}</Text>}
          rightComponent={null}
        />
        <View style={styles.dayContainer}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.cell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        <PanGestureHandler onGestureEvent={calendarGesture.gestureHandler}>
          <Animated.View style={[styles.panel, animatedPanelStyles]}>
            <View style={styles.dragHandle} />
            <View style={styles.containerCal}>
              {calendarGesture.viewMode === "month" ? (
                <FlatList
                  ref={calendarScroll.flatListRef}
                  data={calendarScroll.allWeeks}
                  renderItem={({ item }) => (
                    <Week
                      week={item}
                      selectedDate={calendarScroll.selectedDate}
                      onSelectDate={onSelectDate}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={calendarGesture.isScrollable}
                  initialScrollIndex={initialScrollIndex}
                  getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                  })}
                  onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                      calendarScroll.flatListRef.current?.scrollToIndex({
                        index: info.index,
                        animated: true,
                      });
                    }, 500);
                  }}
                />
              ) : (
                <Week
                  week={getCurrentWeek(calendarScroll.selectedDate)}
                  selectedDate={calendarScroll.selectedDate}
                  onSelectDate={onSelectDate}
                />
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginBottom: 13,
  },
  test: {
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  iconContainer: {
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: "transparent",
  },
  monthText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    height: 40,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  panel: {
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderTopWidth: 0,
  },
  dragHandle: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  containerCal: {
    height: 180,
  }
});
  
  
export default TopSheet;
  