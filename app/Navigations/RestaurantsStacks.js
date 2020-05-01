import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../Screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../Screens/Restaurants/AddRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
  Restaurant: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes",
    }),
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      title: "Nuevo Restaurantes",
    }),
  },
});

export default RestaurantsScreenStacks;
