// En Home.tsx
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const noLogged = () => (
  <div id="Main-container">
    <h1>Bienvenido(a) a Nuestra Plataforma</h1>
    <p>
      Para acceder al contenido, debes tener una cuenta. ¿Aún no tienes una
      cuenta?
    </p>
    <Button variant="primary" className="color: white">
      <Link to={"/register"}>Regístrate aquí</Link>
    </Button>
    <p>O</p>
    <p>¿Ya tienes tu cuenta?</p>
    <Button variant="secondary" className="noLogBtn2">
      <Link to={"/login"}>Inicia Sesión</Link>
    </Button>
  </div>
);

const Logged = (name: string) => (
  <div id="Main-container">
    <h1>Bienvenido de nuevo {name}</h1>
    <p>Selecciona una opción para continuar:</p>
    <Button
      variant="primary"
      href="https://drive.google.com/drive/folders/1R2iWQa-BpNFCdnbfGCjXL9pWTXbxPQY4?usp=sharing"
      target="_blank"
      className="btn-block m-2">
      Material
    </Button>
    <Button variant="primary" className="btn-block m-2">
      <Link to={"/foros"}>Foros</Link>
    </Button>
    <p className="discreet-message">
      El botón de Material te llevará a un Drive externo con material de la
      asignatura.
    </p>
  </div>
);

const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://cums-backend.onrender.com/api/user",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();

      // Set the user name in the Home component's state
      if (content.name != undefined) {
        setUserName(content.name);
      } else {
        setUserName("");
      }
    })();
  }, []);

  return <div>{userName !== "" ? Logged(userName) : noLogged()}</div>;
};

export default Home;
