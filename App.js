import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View, Animated, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const url = "https://humanrights.uconn.edu/wp-content/uploads/sites/2330/2018/01/Akaslan-2018-Vertical-.jpg";
const SIZE = 50;
const HALF_SIZE = SIZE / 2;
const MIN = 0;
const PROGRESS = width - 20;
const MAX = PROGRESS - SIZE;
const CENTER = PROGRESS / 2 - HALF_SIZE;

export default function App() {
  let tx = new Animated.Value(CENTER);
  let offset = CENTER;
  let _onPanGestureEvent = ({ nativeEvent: { x, y, translationX, translationY, state } }) => {
    // console.log({ x, y, translationX, translationY, state });
    tx.setValue(translationX);
  };

  let stateChange = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;
    offset += translationX;
    tx.setOffset(offset);
    // console.log(nativeEvent);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.Image
        source={{ uri: url }}
        style={{
          transform: [
            {
              rotateY: tx.interpolate({
                inputRange: [MIN, CENTER, MAX],
                outputRange: ["-30deg", "0deg", "30deg"],
                extrapolate: "clamp",
              }),
            },
            {
              scale: tx.interpolate({
                inputRange: [MIN, CENTER, MAX],
                outputRange: [1.2, 1, 1.2],
                extrapolate: "clamp",
              }),
            },
          ],
          backgroundColor: "red",
          width: width,
          height: width + width * 0.5,
        }}
      ></Animated.Image>

      <View style={{ width: PROGRESS, height: SIZE, backgroundColor: "#ccc", marginHorizontal: 10, borderRadius: 100 }}>
        <PanGestureHandler onHandlerStateChange={stateChange} onGestureEvent={_onPanGestureEvent}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: tx.interpolate({
                    inputRange: [MIN, CENTER, MAX],
                    outputRange: [MIN, CENTER, MAX],
                    extrapolate: "clamp",
                  }),
                },
              ],

              width: SIZE,
              height: SIZE,
              backgroundColor: "#333",
              borderRadius: SIZE,
            }}
          ></Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
