
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"; 
import "../styles/inscription.css";

function InscriptEleve() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [classe, setClasse] = useState("");
  const [examen, setExamen] = useState("");
  const [telephone, setTelephone] = useState("");
  const [quatier, setQuatier] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("eleve"); // Rôle par défaut
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nom === "" ||
      prenom === "" ||
      email === "" ||
      motDePasse === "" ||
      classe === "" ||
      examen === "" ||
      quatier === ""
    ) {
      alert("Bien vouloir remplir les differents champs");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();
    setIsLoading(true); 
    setErrorMessage("");

    try {
      // Vérifier si l'email existe déjà
      const q = query(collection(db, "utilisateurs"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        setIsLoading(false);
        return;
      }

      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );
      const user = userCredential.user;

      // Créer le document utilisateur dans Firestore
      const newStudent = {
        id: user.uid,
        nom: nom,
        prenom: prenom,
        email: email,
        classe: classe,
        examen: examen,
        quatier: quatier,
        telephone: telephone,
        role: role, // Ajout du rôle
      };

      await setDoc(doc(db, "utilisateurs", user.uid), newStudent);

      navigate("/Login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      // Gestion des erreurs Firebase Auth
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("L'email est déjà utilisé.");
          break;
        case "auth/weak-password":
          setErrorMessage("Le mot de passe est trop faible. Veuillez en choisir un plus sécurisé.");
          break;
        case "auth/invalid-email":
          setErrorMessage("L'email est invalide. Veuillez vérifier votre saisie.");
          break;
        default:
          setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
        <h1 className="text-4xl font-bold text-center">S'INSCRIRE ICI/</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-stone-500"></div>
          <p className="ml-4 text-2xl font-bold text-stone-500">Chargement...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 w-[90%] max-w-md bg-white border-2 border-slate-200 p-8 shadow-lg"
        >
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center font-bold">{errorMessage}</div>
          )}
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Nom..."
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Prenom..."
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Adresse e-mail..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Numero du pere/mere..."
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Classe de l'eleve..."
              type="tel"
              value={classe}
              onChange={(e) => setClasse(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Examen a presenter..."
              type="tel"
              value={examen}
              onChange={(e) => setExamen(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Quatier...."
              type="text"
              value={quatier}
              onChange={(e) => setQuatier(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="Mot de passe..."
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <div>
          
          </div>
          <button
            type="submit"
            className="text-white text-2xl font-extrabold mt-3 p-3 rounded-lg text-center bg-stone-500 w-full"
          >
            Soumettre
          </button>
          <Link to="/Login">
            <p className="mt-3 text-center">
              Avez-vous deja un compte ?{" "}
              <span className="text-blue-600 font-bold">Se connecter ici</span>
            </p>
          </Link>
        </form>
      )}
    </div>
  );
}

export default InscriptEleve;