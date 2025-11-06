import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Trampos</Text>
      <Link href="/login" asChild>
        <Button title="Entrar" />
      </Link>
      <Link href="/signup" asChild>
        <Button title="Criar Conta" />
      </Link>
    </View>
  );
}
