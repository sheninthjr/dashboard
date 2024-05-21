import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
const NavBar = ({
  username,
  onSidebarToggle,
}: {
  username: string;
  onSidebarToggle: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onSidebarToggle(isOpen);
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome, {username}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 20,
  },
  toggleButton: {
    backgroundColor: "transparent",
    padding: 0,
  },
});

export default NavBar;
