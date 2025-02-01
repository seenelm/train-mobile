import React from "react";
import { View, Animated, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useFadeIn, useTranslateY } from "../utils/animations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "../../../navigation/AuthStack";
import Button from "../../../components/button";
import SlopedView from "../components/SlopedView";
import * as Icons from "../../../assets/icons"

const { height } = Dimensions.get("window");
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const baseDimension = Math.min(screenWidth, screenHeight);

const Landing: React.FC = () => {
  type NavigationProp = StackNavigationProp<AuthStackParamList, 'Landing'>;
  const navigation = useNavigation<NavigationProp>();
  const textOpacity = useFadeIn(2500);
  const buttonOpacity = useFadeIn(2500);
  const textTranslateY = useTranslateY(height / 4, 0, 1000);
  const buttonTranslateY = useTranslateY(height / 4, 0, 1000);
  const slopedViewTranslateY = useTranslateY(-100, 0, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <Image source={Icons.graphic} style={styles.graphic} />
      </View>
      <SlopedView translateY={slopedViewTranslateY}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.text}>
            Plan workouts, message people, and handle money
          </Text>
          <Text style={styles.text1}>
            We're the first app that allows coaches and athletes to connect,
            organize, and transact easily
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}
        >
          <Button
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
            onPress={() => navigation.navigate("Signing")}
          >
            Sign In
          </Button>
          <Button
            style={styles.signUpButton}
            textStyle={styles.signUpButtonText}
            onPress={() => navigation.navigate("Signing")}
          >
            Sign Up
          </Button>
        </Animated.View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Icons.appleicon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Icons.googleicon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Icons.facebookicon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SlopedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -50,
  },
  graphicContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    backgroundColor: "#FBFBFB",
  },
  graphic: {
    width: baseDimension * 1.94,
    height: baseDimension * 1.94,
    resizeMode: "contain",
    zIndex: 0,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 10,
  },
  text1: {
    fontSize: 15,
    color: "#B9B7BD",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 40,
  },
  signInButton: {
    width: "47%",
    marginRight: "5%",
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 3,
  },
  signInButtonText: {
    color: "black",
    fontSize: 20,
  },
  signUpButton: {
    width: "47%",
  },
  signUpButtonText: {
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
    marginBottom: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Landing;
