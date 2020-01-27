import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StartupScreen from "./../screens/Startup";
import ProfileScreen from "./../screens/Profile";
import AuthScreen from "./../screens/Auth";
import CreateProfileScreen from "../screens/Create";
import Colors from "../constants/Colors";

// set up default navigation options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: "Helvetica-Bold"
  },
  headerBackTitleStyle: {
    fontFamily: "Helvetica"
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

// create profile navigator
const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
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

// create startup navigator
const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  CreateProfile: CreateNavigator,
  Profile: ProfileNavigator
});

export default createAppContainer(MainNavigator);
