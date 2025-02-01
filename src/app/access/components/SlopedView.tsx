import React, { ReactNode } from "react";
import { Animated, Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type SlopedViewProps = {
  children: ReactNode;
  translateY: Animated.Value;
};

const SlopedView = ({ children, translateY }: SlopedViewProps) => {
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

export default SlopedView;