import { useEffect, useState } from "react";
import { FormEmployees } from "./src/FormEmployees";
import { FormLogin } from "./src/FormLogin";
import { auth } from "./src/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const auth_Observer = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });

        return;
      }

      setAuthUser(null);
    });
  }, []);

  return (
    <>{authUser ? <FormEmployees authUser={authUser} /> : <FormLogin />}</>
  );
}
