import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  // Função para formatar a data enquanto o usuário digita
  const handleBirthdateChange = (text: string) => {
    // remove tudo que não for número
    let cleaned = text.replace(/\D/g, "");

    // aplica a máscara DD/MM/YYYY
    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    setBirthdate(cleaned);
  };

  const handleSignup = () => {
    if (!name || !birthdate || !phone) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // validação de idade mínima (18+)
    const [day, month, year] = birthdate.split("/").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    const age =
      today.getFullYear() -
      birth.getFullYear() -
      (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

    if (age < 18) {
      Alert.alert("Erro", "Você precisa ter 18 anos ou mais.");
      return;
    }

    Alert.alert("Cadastro", `Conta criada para ${name}`);
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        keyboardType="numeric"
        maxLength={10} // 10 caracteres → 01/01/2000
        value={birthdate}
        onChangeText={handleBirthdateChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Celular"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Cadastrar" onPress={handleSignup} />

      <View style={{ marginTop: 20 }}>
        <Text>Já tem conta?</Text>
        <Link href="/login" style={styles.link}>
          Entrar
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
