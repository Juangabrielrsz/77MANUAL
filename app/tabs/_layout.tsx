import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="cliente"
        options={{ title: "Cliente" }}
      />
      <Tabs.Screen
        name="prestador"
        options={{ title: "Prestador" }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{ title: "Configurações" }}
      />
    </Tabs>
  );
}
