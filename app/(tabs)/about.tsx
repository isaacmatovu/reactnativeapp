import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface User {
  name: string;
  email: string;
  avatar: ImageSourcePropType;
}
interface UserName {
  first: string;
  last: string;
}

interface UserPicture {
  thumbnail: ImageSourcePropType;
}

interface UserLogin {
  uuid: string;
}

interface ApiUser {
  name: UserName;
  email: string;
  picture: UserPicture;
  login: UserLogin;
}
const User = ({ name, email, avatar }: User) => (
  <View style={styles.user}>
    <Image style={styles.avatar} source={avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  </View>
);

const Users = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    fetchUsers();

    return () => removeNetInfoSubscription();
  }, [isOffline]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://randomuser.me/api/?results=30");
      const data = response.data;
      setUsers(data.results);
      isOffline && setOfflineStatus(false);
    } catch {
      setError("An error occured with your network");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <Text className="text-red-600 text-2xl">{error}</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList
        onRefresh={fetchUsers}
        refreshing={loading}
        data={users}
        renderItem={({ item: user }) => (
          <User
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
            avatar={user.picture.thumbnail}
          />
        )}
        keyExtractor={(user) => user.login.uuid}
      />
      // inside <Users /> component
      <NoInternetModal
        show={isOffline}
        onRetry={fetchUsers}
        isRetrying={loading}
      />
    </SafeAreaView>
  );
};

const Button = ({ children, ...props }: any) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const NoInternetModal = ({ show, onRetry, isRetrying }: any) => (
  <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
      <Button onPress={onRetry} disabled={isRetrying}>
        Try Again
      </Button>
    </View>
  </Modal>
);

const About = () => {
  const [name, setName] = useState<string>("isaac");

  const handleChange = () => {
    setName("john");
  };
  return (
    <View className="flex-1 justify-center items-center gap-2 px-4 pt-10">
      <View className="bg-black py-10 px-10 rounded-2xl" />

      <View className="bg-blue-700 py-10 px-10 rounded-3xl" />
      <ActivityIndicator size="large" color={"green"} />
      {/* custome button */}
      <TouchableOpacity
        className={`py-6 px-8 bg-blue-700 ${name === "john" ? "bg-gray-300" : "bg-blue-700"}`}
        disabled={name === "john"}
        onPress={handleChange}
      >
        <Text className="text-white">Click me</Text>
      </TouchableOpacity>
      <Text>{name}</Text>
      <ScrollView style={{ height: 300 }} contentContainerStyle={{ gap: 12 }}>
        <Image
          className="w-40 h-40"
          source={require("../../assets/images/background-image.png")}
        />
        <Image
          className="w-40 h-40"
          source={require("../../assets/images/background-image.png")}
        />
        <Image
          className="w-40 h-40"
          source={require("../../assets/images/background-image.png")}
        />
        <Image
          className="w-40 h-40"
          source={require("../../assets/images/background-image.png")}
        />
        <Image
          className="w-40 h-40"
          source={require("../../assets/images/background-image.png")}
        />
        <Text></Text>
      </ScrollView>
      <Users />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  user: {
    width: Dimensions.get("screen").width - 32,
    alignSelf: "center",
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    marginTop: 6,
    color: "#888",
  },
  // ...
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
export default About;
