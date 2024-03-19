import { View, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "./services/firebaseConfig";

import styles from "./global/styles";

export function LoginHeader({ authUser }) {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.header}>
        Bem vindo (a): {authUser.email.split("@")[0]}
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginRight: 8, marginBottom: 16 }}
      >
        <Text
          style={{
            color: "#FFF",
            textDecorationLine: "underline",
          }}
        >
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
