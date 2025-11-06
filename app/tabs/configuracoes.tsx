// src/screens/ConfigScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function ConfigScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto de Perfil */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>João Santos</Text>
          <View style={styles.badges}>
            <Text style={styles.rating}>⭐ 5.0</Text>
          </View>
        </View>
      </View>

      {/* Dados do Usuário */}
      <View style={styles.section}>
        <Text style={styles.label}>João</Text>
        <Text style={styles.value}>Santos</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Sobrenome</Text>
        <Text style={styles.value}>Oliveira</Text>
      </View>

      {/* Opções */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Alterar telefone</Text>
        <Text style={styles.optionSub}>185****346</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Alterar email</Text>
        <Text style={styles.optionSub}>chris***com</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Alterar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Gestão de dispositivo</Text>
      </TouchableOpacity>

      {/* Botão Editar */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>

      {/* Botão Excluir Conta */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir minha conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  info: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  badges: {
    flexDirection: "row",
    marginTop: 5,
  },
  rating: {
    backgroundColor: "#f1c40f",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    fontWeight: "bold",
    color: "#fff",
  },
  premium: {
    backgroundColor: "#e67e22",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionSub: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  editButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#dc3545",
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
