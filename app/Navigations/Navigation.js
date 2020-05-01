import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "../Navigations/RestaurantsStacks";
import SearchScreenStacks from "../Navigations/SearchStacks";
import TopRestaurantsScreenstacks from "../Navigations/TopRestaurantsStacks";
import MyAccountScreenStacks from "../Navigations/MyAccountStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Restaurant: {
      screen: RestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Restaurantes",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="compass-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },

    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="panorama-fisheye"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },

    TopRestaurants: {
      screen: TopRestaurantsScreenstacks,
      navigationOptions: () => ({
        tabBarLabel: "Top",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="check-decagram"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },

    MyAccount: {
      screen: MyAccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Restaurant",
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    },
  }
);

export default createAppContainer(NavigationStacks);
