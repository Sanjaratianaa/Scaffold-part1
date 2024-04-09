import React from "react";
import { IonButton, IonInput, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import './Login.css';

const Login: React.FC = () => {

  const history = useHistory();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let url = "http://localhost:5106/api";

    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    const onSuccess = () => {
      history.push("/teeth");
    };

    // Ajoutez ici la logique de connexion
    if (username.trim() !== "" && password.trim() !== "") {
      try {
        url = url + "/[login]";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password
          }),
        });
        if( !response.ok ){
          throw new Error("Une erreur s'est produite");
        }
        const c = await response.json();
        let token = c.token;
        sessionStorage.setItem('token' , token);
        onSuccess();
      } catch (error) {
        console.log(error);
        setErreur("Email ou mot de passe incorrect");
      }
    } else {
      setErreur(
        "Veuillez saisir votre nom d'utilisateur et votre mot de passe."
      );
    }
  };

  function setErreur(erreur: string) {
    var divErreur = document.getElementById("erreur");
    if (divErreur != null) divErreur.innerHTML = erreur;
  }

  return (
    <IonContent>
      <div className="login-container">
        <h1>Connexion</h1>
        <form method="Get" onSubmit={handleLogin}>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="text"
            placeholder="Entrer votre email"
            name="username"
            value="cssingh"
            required
          ></IonInput>
          <IonInput
            label="Mot de passe"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Entrer votre mot de passe"
            name="password"
            value="css@123"
            required
          ></IonInput>
          <p id="erreur" className="erreur"></p>
          <IonButton expand="block" color="button" type="submit">
            Se connecter
          </IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default Login;
