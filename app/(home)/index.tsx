import NavBar from '@/components/NavBar';
import Sidebar from '@/components/SideBar';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <NavBar username="Sheninth" onSidebarToggle={handleSidebarToggle} />
      <Sidebar
        navigation={navigation}
        isOpen={isSidebarOpen}
        onSidebarClose={handleSidebarClose}
      />

      <ScrollView>
        <View style={styles.Row}>
          <View style={styles.Column}>
            <Text style={styles.Text}>Title</Text>
            <Text style={styles.Text}>Description</Text>
          </View>
          <View style={styles.Column}>
            <Text style={styles.Text}>Title</Text>
            <Text style={styles.Text}>Description</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Row: {
    marginBottom: 20,
  },
  Column: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 2,
    height: 100,
    marginTop: 30,
    padding: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  Text: {
    color: 'black',
  },
});
