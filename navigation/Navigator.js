import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import StartupScreen from "./../screens/Startup";
import ProfileScreen from "./../screens/Profile";
import AuthScreen from "./../screens/Auth";
import CreateProfileScreen from "../screens/Create";
import EditProfileScreen from "../screens/Edit";
import MatchScreen from "../screens/Match";
import MatchDetailScreen from "../screens/Detail";
import LocationScreen from "../screens/Location";
import ChatScreen from "../screens/Chat";
import Colors from "../constants/Colors";

// set up default navigation options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent
  },
  headerTitleStyle: {
    fontFamily: "Helvetica-Bold"
  },
  headerTintColor: Colors.primary
};

// create login navigator
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const CreateNavigator = createStackNavigator(
  {
    Create: CreateProfileScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

// create profile navigator
const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditProfileScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

ProfileNavigator.navigationOptions = {
  tabBarIcon: (
    <FontAwesome5 style={{ fontSize: 30, padding: 10, color: Colors.primary}} name={"user-md"} />
  ),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: Colors.accent
    },
  }
};

const MatchNavigator = createStackNavigator(
  {
    Match: MatchScreen,
    MatchDetail: MatchDetailScreen,
    Location: LocationScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

MatchNavigator.navigationOptions = {
  tabBarIcon: (
    <FontAwesome5 style={{ fontSize: 30, padding: 10, color: Colors.primary }} name={"heartbeat"} />
  ),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: Colors.accent
    }
  }
};

const ChatNavigator = createStackNavigator(
  {
    Chat: ChatScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

ChatNavigator.navigationOptions = {
  tabBarIcon: (
    <FontAwesome5
      style={{ fontSize: 30, padding: 10, color: Colors.primary }}
      name={"comment-medical"}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: Colors.accent
    }
  }
};

const HomeNavigator = createBottomTabNavigator(
  {
    Profile: ProfileNavigator,
    Match: MatchNavigator,
    Chat: ChatNavigator
  },
  {
    initialRouteName: "Match",
  }
);

// create startup navigator
const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  CreateProfile: CreateNavigator,
  Home: HomeNavigator
});

export default createAppContainer(MainNavigator);
