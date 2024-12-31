import React, { useEffect, useRef, ReactNode } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import GoogleIcon from "../../../assets/icons/googleicon.png";
import FacebookIcon from "../../../assets/icons/facebookicon.png";
import AppleIcon from "../../../assets/icons/appleicon.png";
import Button from "../../../components/button";
import Graphic from "../../../assets/icons/graphic.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "../../../navigation/authStack";


const { height } = Dimensions.get("window");
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const baseDimension = Math.min(screenWidth, screenHeight);

interface SlopedViewProps {
    children: ReactNode;
  }

const Landing: React.FC = () => {
  type NavigationProp = StackNavigationProp<AuthStackParamList, 'Landing'>;
  const navigation = useNavigation<NavigationProp>();
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(height / 4)).current;
  const buttonTranslateY = useRef(new Animated.Value(height / 4)).current;

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    Animated.timing(textTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const SlopedView: React.FC<SlopedViewProps> = ({ children }) => {
    const screenWidth = Dimensions.get("window").width;
  
    return (
      <Animated.View
        style={{
          overflow: "hidden",
          width: "100%",
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          transform: [{ translateY }],
        }}
      >
        <Svg height="50" width={screenWidth}>
          <Path
            d={`M0,40 Q${screenWidth / 2},50 ${screenWidth},10 L${screenWidth},50 L0,50`}
            fill="#FBFBFB"
          />
        </Svg>
        <View style={{ backgroundColor: "#FBFBFB", alignItems: "center" }}>
          {children}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <Image source={Graphic} style={styles.graphic} />
      </View>
      <SlopedView>
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
            <Image source={AppleIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={GoogleIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={FacebookIcon} style={styles.icon} />
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
