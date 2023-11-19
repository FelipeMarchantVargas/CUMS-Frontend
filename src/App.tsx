import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CrearComentario from "./pages/CrearComentario";
import CrearForo from "./pages/CrearForo";
import Foros from "./pages/Foros";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Materia from "./pages/Materia";
import MostrarForo from "./pages/MostrarForo";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import User from "./pages/User";
import VerComentario from "./pages/VerComentario";

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setIsLoggedIn(false);
      setName("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Realiza una solicitud para verificar el estado de inicio de sesión al cargar la página.
    // Por ejemplo, puedes verificar si el usuario tiene una cookie de sesión válida.
    // Si el usuario está logueado, puedes llamar a setIsLoggedIn(true).
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          credentials: "include",
        });
        const content = await response.json();
        if (content.name != undefined) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error while checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <>
      <Nav
        name={name}
        setName={setName}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <Container className="mb-4">
        <main className="main-content form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login setName={setName} />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/User" element={<User />} />
            <Route path="/Foros" element={<Foros />} />
            <Route path="/Materia" element={<Materia />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/CrearForo" element={<CrearForo />} />
            <Route path="/MostrarForo" element={<MostrarForo />} />
            <Route path="/CrearComentario" element={<CrearComentario />} />
            <Route path="/VerComentario" element={<VerComentario />} />
          </Routes>
        </main>
      </Container>
    </>
  );
}

export default App;
