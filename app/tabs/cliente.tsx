import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Button,
} from "react-native";
import * as Location from "expo-location";

// Só importa o MapView se não for web
let MapView: any;
let Marker: any;
if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function ClienteScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const mapRef = useRef<any>(null);

  const services = [
    { id: "1", name: "Eletricista" },
    { id: "2", name: "Pintor" },
    { id: "3", name: "Encanador" },
    { id: "4", name: "Pedreiro" },
    { id: "5", name: "Marceneiro" },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão de localização negada");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  // Centraliza o mapa quando a localização mudar
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const handleSelect = (service: string) => {
    setSelected(service);
    setConfirmed(false); // reseta confirmação se trocar de serviço
  };

  const handleConfirm = () => {
    if (selected && location) {
      console.log("Serviço:", selected, "Localização:", location);
      setConfirmed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o serviço desejado:</Text>

      {/* Lista de serviços */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.serviceItem, selected === item.name && styles.selectedItem]}
            onPress={() => handleSelect(item.name)}
          >
            <Text style={styles.serviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      />

      {/* Mobile → mostra mapa */}
      {Platform.OS !== "web" ? (
        location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="Você está aqui" />
          </MapView>
        ) : loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Text>Não foi possível obter sua localização</Text>
        )
      ) : (
        // Web → não renderiza react-native-maps
        <View style={styles.webBox}>
          <Text style={{ textAlign: "center", color: "#555" }}>
            🌍 No navegador não exibimos o mapa.{"\n"}
            Sua localização será usada no app mobile.
          </Text>
        </View>
      )}

      {selected && (
        <>
          <Text style={styles.selectedText}>Serviço escolhido: {selected}</Text>
          <Button title="Confirmar" onPress={handleConfirm} />
        </>
      )}

      {confirmed && (
        <Text style={styles.confirmedText}>
          ✅ {selected} confirmado! Localização salva.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  serviceItem: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: "#4CAF50",
  },
  serviceText: {
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  webBox: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  selectedText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
  confirmedText: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});
