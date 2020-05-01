import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../Screens//Search/Search";

const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Busqueda",
    }),
  },
});

export default SearchScreenStacks;
