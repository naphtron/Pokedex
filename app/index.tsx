import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";


interface Pokemon {
  name: string;
  url:string;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect (() => {
   // fetch data from pokeapi
    fetchPokemons();
  }, []);

  async function fetchPokemons (){
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setPokemons(data.results);
      console.log(data);
    }
    catch (error) {
      console.error('Error fetching Pokémon data:', error);
  }
}
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    // </View>
    <ScrollView>
      {pokemons.map((pokemon:Pokemon)=>(
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
