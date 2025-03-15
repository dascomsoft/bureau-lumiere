
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";
// import "../styles/inscription.css";

// function InscriptParent() {
//   // Défilement en haut de la page au chargement
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // États pour les champs de formulaire
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [email, setEmail] = useState("");
//   const [profession, setProfession] = useState("");
//   const [telephone, setTelephone] = useState("");
//   const [motDePasse, setMotDePasse] = useState("");
//   const [quartier, setQuartier] = useState("");
//   const [role, setRole] = useState("parent");  // Ajout de la propriété role pour les parents

//   // États pour gérer l'état de chargement et les erreurs
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Navigation pour la redirection
//   const navigate = useNavigate();

//   // Fonction de gestion de la soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Réinitialiser les erreurs à chaque soumission
//     setError("");

//     // Vérification des champs requis
//     if (!nom || !prenom || !email || !motDePasse || !profession || !telephone || !quartier) {
//       setError("Veuillez remplir tous les champs.");
//       return;
//     }

//     const auth = getAuth();
//     const db = getFirestore();

//     try {
//       // Mettre le loading à true pendant l'inscription
//       setLoading(true);

//       // Vérification si l'email existe déjà
//       const q = query(collection(db, "utilisateurs"), where("email", "==", email));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
//         setLoading(false);
//         return;
//       }

//       // Création de l'utilisateur avec Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
//       const user = userCredential.user;

//       // Enregistrement des données dans Firestore, avec ajout de la propriété 'role'
//       await setDoc(doc(db, "utilisateurs", user.uid), {
//         nom,
//         prenom,
//         email,
//         profession,
//         telephone,
//         quartier,
//         role,  // On ajoute le rôle de parent
//         userId: user.uid, // Liaison avec l'utilisateur Firebase
//       });

//       alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
//       navigate("/login");
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error);
//       setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
//     } finally {
//       // Mettre le loading à false une fois l'opération terminée
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main">
//       <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
//         <h1 className="text-4xl font-bold text-center">S'INSCRIRE ICI</h1>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 w-[90%] max-w-md bg-white border-2 border-slate-200 p-8 shadow-lg"
//       >
//         {/* Champ Nom */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Nom..."
//           type="text"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           required
//         />

//         {/* Champ Prénom */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Prénom..."
//           type="text"
//           value={prenom}
//           onChange={(e) => setPrenom(e.target.value)}
//           required
//         />

//         {/* Champ Email */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Adresse e-mail..."
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         {/* Champ Téléphone */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Numéro de téléphone du parent..."
//           type="tel"
//           value={telephone}
//           onChange={(e) => setTelephone(e.target.value)}
//           required
//         />

//         {/* Champ Quartier */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Quartier du parent..."
//           type="text"
//           value={quartier}
//           onChange={(e) => setQuartier(e.target.value)}
//           required
//         />

//         {/* Champ Profession */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Profession du parent..."
//           type="text"
//           value={profession}
//           onChange={(e) => setProfession(e.target.value)}
//           required
//         />

//         {/* Champ Mot de passe */}
//         <input
//           className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
//           placeholder="Mot de passe..."
//           type="password"
//           value={motDePasse}
//           onChange={(e) => setMotDePasse(e.target.value)}
//           required
//         />

//         {/* Affichage des erreurs */}
//         {error && <p className="text-red-500 text-center mt-3">{error}</p>}

//         {/* Bouton de soumission avec état de chargement */}
//         <button
//           type="submit"
//           className="text-white text-2xl font-extrabold mt-3 p-3 rounded-lg text-center bg-stone-500 w-full"
//           disabled={loading}  // Désactiver le bouton si en cours de chargement
//         >
//           {loading ? "Chargement..." : "Soumettre"}
//         </button>

//         {/* Lien vers la page de connexion */}
//         <Link to="/login">
//           <p className="mt-3 text-center">
//             Avez-vous déjà un compte ? <span className="text-blue-600 font-bold">Se connecter ici</span>
//           </p>
//         </Link>
//       </form>
//     </div>
//   );
// }

// export default InscriptParent;



























import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import "../styles/inscription.css";

function InscriptParent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [quartier, setQuartier] = useState("");
  const [role, setRole] = useState("parent"); // Rôle par défaut
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !motDePasse || !profession || !telephone || !quartier) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      setLoading(true);

      const q = query(collection(db, "utilisateurs"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
      const user = userCredential.user;

      await setDoc(doc(db, "utilisateurs", user.uid), {
        nom,
        prenom,
        email,
        profession,
        telephone,
        quartier,
        role, // Ajout du rôle
      });

      alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
        <h1 className="text-4xl font-bold text-center">S'INSCRIRE ICI</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 w-[90%] max-w-md bg-white border-2 border-slate-200 p-8 shadow-lg"
      >
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Nom..."
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Prénom..."
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Adresse e-mail..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Numéro de téléphone..."
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Profession..."
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Quartier..."
          type="text"
          value={quartier}
          onChange={(e) => setQuartier(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Mot de passe..."
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <select
          className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="eleve">Élève</option>
          <option value="parent">Parent</option>
          <option value="encadreur">Encadreur</option>
        </select>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
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

export default InscriptParent;