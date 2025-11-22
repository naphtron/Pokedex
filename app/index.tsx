import { Text, View } from "react-native";
import { useEffect } from "react";

export default function Index() {

  useEffect (() => {
   // fetch data from pokeapi
    fetchPokemons();
  }, []);

  async function fetchPokemons (){
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error('Error fetching Pokémon data:', error);
  }
}
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
