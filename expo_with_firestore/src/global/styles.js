import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#02142c",
  },
  button: {
    backgroundColor: "#d64600",
    marginRight: 8,
    marginLeft: 8,
  },
  buttonText: {
    padding: 8,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    marginLeft: 8,
    fontSize: 18,
    color: "#fff",
  },
  input: {
    margin: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 8,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  header: {
    marginLeft: 8,
    marginBottom: 16,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default styles;
