import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

export default function PrestadorScreen() {
  const [requests, setRequests] = useState([
    {
      id: "1",
      cliente: "João Silva",
      servico: "Pintura de quarto",
      local: "Rua A, 123",
      preco: "R$ 200",
    },
    {
      id: "2",
      cliente: "Maria Souza",
      servico: "Troca de torneira",
      local: "Av. Central, 55",
      preco: "R$ 80",
    },
  ]);

  const handleAction = (id: string, action: "aceitar" | "recusar") => {
    if (action === "aceitar") {
      Alert.alert("✅ Pedido aceito!");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } else {
      Alert.alert("❌ Pedido recusado.");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Perfil do Prestador */}
      <View style={styles.profileBox}>
        <Text style={styles.name}>Carlos Oliveira</Text>
        <Text style={styles.info}>Serviços: Eletricista, Encanador</Text>
        <Text style={styles.info}>Preço médio: R$ 50/hora</Text>
        <Text style={styles.info}>⭐ Avaliação: 4.8</Text>
      </View>

      {/* Pedidos recebidos */}
      <Text style={styles.sectionTitle}>📋 Pedidos recebidos</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.servico}</Text>
            <Text style={styles.cardText}>Cliente: {item.cliente}</Text>
            <Text style={styles.cardText}>Local: {item.local}</Text>
            <Text style={styles.cardText}>Preço: {item.preco}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.accept]}
                onPress={() => handleAction(item.id, "aceitar")}
              >
                <Text style={styles.btnText}>Aceitar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.reject]}
                onPress={() => handleAction(item.id, "recusar")}
              >
                <Text style={styles.btnText}>Recusar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
            Nenhum pedido no momento.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  profileBox: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#444",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  accept: {
    backgroundColor: "#4CAF50",
  },
  reject: {
    backgroundColor: "#E53935",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
