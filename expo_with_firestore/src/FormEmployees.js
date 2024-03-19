import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { db } from "./services/firebaseConfig";
import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { EmployeeCard } from "./EmployeeCard";

import styles from "./global/styles";
import { LoginHeader } from "./LoginHeader";

export function FormEmployees({ authUser }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");

  const [employees, setEmployees] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    async function getEmployees() {
      const employeesRef = collection(db, "employees");

      onSnapshot(employeesRef, (snapshot) => {
        let employeesList = [];

        snapshot.forEach((doc) => {
          employeesList.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });

        setEmployees(employeesList);
      });
    }

    getEmployees();
  }, []);

  async function handleRegisterEmployees() {
    await addDoc(collection(db, "employees"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO");
        setNome("");
        setIdade("");
        setCargo("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggle() {
    setShowForm(!showForm);
  }

  function editEmployee(data) {
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  async function handleEditEmployee() {
    const docRef = doc(db, "employees", isEditing);
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
    });

    setNome("");
    setCargo("");
    setIdade("");
    setIsEditing("");
  }

  return (
    <View style={styles.container}>
      <LoginHeader authUser={authUser} />

      {showForm && (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          {isEditing !== "" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleEditEmployee}
            >
              <Text style={styles.buttonText}>Editar usuário</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleRegisterEmployees}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity onPress={handleToggle} style={{ marginTop: 8 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.header}>Funcionários</Text>

      <FlatList
        style={styles.list}
        data={employees}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <EmployeeCard data={item} handleEdit={(item) => editEmployee(item)} />
        )}
      />
    </View>
  );
}
