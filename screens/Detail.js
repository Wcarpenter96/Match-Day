import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";

const MatchDetail = props => {
  const profileId = props.navigation.getParam("profileId");
  const selectedProfile = useSelector(state =>
    state.profile.profiles.find(profile => profile.id === profileId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Text style={styles.name}>{selectedProfile.name}</Text>
      <Text style={styles.bio}>{selectedProfile.bio}</Text>
    </ScrollView>
  );
};

MatchDetail.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("profileName")
  };
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Helvetica-Bold"
  },
  bio: {
    fontFamily: "Helvetica",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export default MatchDetail;
