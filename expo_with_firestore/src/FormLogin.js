import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { auth } from "./services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import styles from "./global/styles";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreateUser() {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setAuthUser({
          email: user.user.email,
          uid: user.user.uid,
        });
      })
      .catch((err) => {
        if (err.code === "auth/missing-password") {
          console.log("A senha é obrigatória");
          return;
        }
        console.log(err.code);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email..."
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha..."
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={[styles.button, { marginBottom: 8 }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 8 }]}
        onPress={handleCreateUser}
      >
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
