// details.tsx
import { ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Index() {
  const params = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: params.name as string,
          headerShown: true,
          presentation:"fullScreenModal",
          sheetAllowedDetents: [0.3, 0.75, 1],
          sheetGrabberVisible: true,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          backgroundColor: "cyan"
        }}
      >
        <Text>Details about {params.name}</Text>
        <Text>Details about {params.name}</Text>
        <Text>Details about {params.name}</Text>
        <Text>Details about {params.name}</Text>
      </ScrollView>
    </>
  );
}