import { ScrollView, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";


interface Pokemon {
  name: string;
  image:string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect (() => {
   // fetch data from pokeapi
    fetchPokemons();
  }, []);

  async function fetchPokemons (){
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            // You can add more detailed info here if needed
          };
        })
      )

      setPokemons(detailedPokemons);
      console.log("Det: ",detailedPokemons);
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
          <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: pokemon.image}}
            style={{width: 150, height: 150}}
          />
          <Image
            source={{uri: pokemon.imageBack}}
            style={{width: 150, height: 150}}
          />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
