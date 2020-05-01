import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreen from "../Screens/TopRestaurants/TopRestaurants";

const TopRestaurantsScreenstacks = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Top",
    }),
  },
});
export default TopRestaurantsScreenstacks;
