import React, { useState, useEffect, useCallback } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { Slider } from "react-native";
import Colors from "../constants/Colors";

const LocationScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [longitude, setLongitude] = useState(-122.127472);
  const [latitude, setLatitude] = useState(37.8908);
  const [radius, setRadius] = useState(30000);

  useEffect(() => {
    setIsLoading(true);
    Location.getCurrentPositionAsync().then(result => {
      setLatitude(result.coords.latitude);
      setLongitude(result.coords.longitude);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 1,
          longitudeDelta: 1
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Adjust your radius to find matches near you.
          </Text>
        </View>
        <Slider
          style={styles.slider}
          value={300}
          minimumValue={1}
          maximumValue={600}
          minimumTrackTintColor={Colors.accent}
          maximumTrackTintColor={'black'}
          onValueChange={val => {setRadius(val*100)}}
        />
        <Circle
          center={{ latitude: latitude, longitude: longitude }}
          radius={radius}
          fillColor={"rgba(123,30,161,0.5)"}
          strokeColor={"rgba(123,30,161,0.5)"}
        />
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={"title"}
          description={"description"}
        />
      </MapView>
    </View>
  );
};

LocationScreen.navigationOptions = navData => {
  return {
    headerTitle: "Match Radius"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
    margin: 20,
    borderRadius: 5,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    padding: 20
  },
  slider: {
    width: "100%",
    height: 20,
    justifyContent: "center"
  },
  map: {
    flex: 1,
    width: "100%"
  }
});

export default LocationScreen;
