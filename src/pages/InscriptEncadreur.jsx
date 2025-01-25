
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import "../styles/inscription.css";





function InscriptEncadreur() {
  useEffect(() => {
    // Faire défiler vers le haut au chargement de la page
    window.scrollTo(0, 0);
  }, []);

  // Création des états pour chaque champ
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [classe, setClasse] = useState("");
  const [profession, setProfession] = useState("");
  const [telephone, setTelephone] = useState("");
  const [quartier, setQuartier] = useState("");
  const [matiere, setMatiere] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("encadreur"); // Valeur par défaut définie sur "encadreur"

  // État pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // État pour gérer les erreurs

  // Création de navigate pour redirection
  const navigate = useNavigate();

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérification que tous les champs obligatoires sont remplis
    if (
      nom === "" ||
      prenom === "" ||
      email === "" ||
      motDePasse === "" ||
      classe === "" ||
      quartier === ""
    ) {
      setError("Veuillez remplir tous les champs requis.");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      // Mise à jour de l'état pour afficher le chargement
      setLoading(true);
      setError(""); // Réinitialisation des erreurs avant la soumission

      // Vérification si l'email existe déjà
      const q = query(collection(db, "utilisateurs"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        setLoading(false);
        return;
      }

      // Création de l'utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
      const user = userCredential.user;

      // Enregistrement des données de l'encadreur dans Firestore, incluant le rôle
      await setDoc(doc(db, "utilisateurs", user.uid), {
        nom: nom,
        prenom: prenom,
        email: email,
        classe: classe,
        profession: profession,
        matiere: matiere,
        telephone: telephone,
        quartier: quartier,
        role: role, // Ajout du rôle "encadreur"
      });

      // Redirection vers la page de connexion
      navigate("/login");

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);

      // Gestion des erreurs Firebase
      if (error.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      } else if (error.code === "auth/weak-password") {
        setError("Le mot de passe est trop faible. Veuillez choisir un mot de passe plus sécurisé.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      // Réinitialisation de l'état de chargement
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
        <h1 className="text-4xl font-bold text-center">S'INSCRIRE ICI/</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 w-[90%] max-w-md bg-white border-2 border-slate-200 p-8 shadow-lg"
      >
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
            placeholder="Numéro de téléphone..."
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
            placeholder="Classe d'enseignement..."
            type="text"
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
            placeholder="Profession de l'encadreur..."
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
            placeholder="Quartier..."
            type="text"
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
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
        {/* Affichage des erreurs */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <button
          type="submit"
          className="text-white text-2xl font-extrabold mt-3 p-3 rounded-lg text-center bg-stone-500 w-full"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Soumettre"}
        </button>
        <Link to="/login">
          <p className="mt-3 text-center">
            Avez-vous déjà un compte ? <span className="text-blue-600 font-bold">Se connecter ici</span>
          </p>
        </Link>
      </form>
    </div>
  );
}

export default InscriptEncadreur;