import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Sidebar = ({ navigation, isOpen, onSidebarClose }: any) => {
  const translateX = new Animated.Value(isOpen ? 0 : -300);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleClose = () => {
    onSidebarClose();
  };

  return (
    <Animated.View
      style={[styles.sidebarContainer, { transform: [{ translateX }] }]}
    >
      <View style={styles.userInfo}>
        <Text style={styles.username}>Sheninth Jr</Text>
        <Text style={styles.userEmail}>sheninthjr@gmail.com</Text>
      </View>

      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Feather name="user" size={24} color="black" />
        <Text style={styles.sidebarText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Feather name="home" size={24} color="black" />
        <Text style={styles.sidebarText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather name="settings" size={24} color="black" />
        <Text style={styles.sidebarText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute",
    top: 15,
    left: 0,
    bottom: 0,
    zIndex: 10,
    width: 300,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "flex-start",
  },
  userInfo: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "gray",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sidebarText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: "auto",
    alignSelf: "flex-start",
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default Sidebar;
