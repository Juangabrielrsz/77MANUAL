import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!phone) {
      Alert.alert("Erro", "Digite seu número de celular!");
      return;
    }
    // aqui futuramente entra a lógica do Firebase Auth (SMS)
    Alert.alert("Login", `Código enviado para ${phone}`);
    router.replace("/tabs/cliente"); // redireciona para Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📲 Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu número"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Enviar código SMS" onPress={handleLogin} />

      <View style={{ marginTop: 20 }}>
        <Text>Ainda não tem conta?</Text>
        <Link href="/signup" style={styles.link}>
          Criar Conta
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  link: {
    color: "blue",
    marginTop: 5,
  },
});
