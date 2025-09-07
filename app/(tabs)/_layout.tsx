import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="addNewSets"
        options={{ title: "Add new set", headerShown: false }}
      />
    </Tabs>
  );
}
