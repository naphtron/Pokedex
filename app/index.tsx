import { ScrollView, Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";


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

const colorByType: { [key: string]: string } = {
  grass:   "#78C850", // Fresh soft green
  fire:    "#F08030", // Warm elegant orange-red
  water:   "#6890F0", // Calm bright blue
  bug:     "#A8B820", // Muted olive-lime
  normal:  "#A8A878", // Soft greige
  poison:  "#A040A0", // Deep royal purple
  electric:"#F8D030", // Bright golden yellow
  ground:  "#E0C068", // Sandy earthy brown
  fairy:   "#EE99AC", // Soft rose pink
  fighting:"#C03028", // Strong muted red
  psychic: "#F85888", // Bright pinkish-magenta
  rock:    "#B8A038", // Warm stone gold
  ghost:   "#705898", // Muted indigo-violet
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  console.group(JSON.stringify(pokemons[0], null, 2));

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
            types: details.types,
            // You can add more detailed info here if needed
          };
        })
      )

      setPokemons(detailedPokemons);
      // console.log("Det: ",detailedPokemons);
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
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >

      {pokemons.map((pokemon:Pokemon)=>(
        <Link key={pokemon.name}
         href={{pathname: '/details', params: { name: pokemon.name }}}
         style={{
            backgroundColor: colorByType[pokemon.types[0].type.name] + 50 || 'lightgray',
            padding:20,
            borderRadius:20,
            // alignItems:'center',
            // marginBottom:10,
            }}
        >
        <View 
        //@ ts-ignore
          >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
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
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center"
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: "center",
  }

});