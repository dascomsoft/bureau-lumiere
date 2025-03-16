
import { onAuthStateChanged, getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Encadreurs from "./pages/Encadreurs";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import InscriptEleve from "./pages/InscriptEleve";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import TableauEleve from "./pages/TableauEleve";
import TableauEncadreur from "./pages/TableauEncadreur";
import TableauParent from "./pages/TableauParent";
import InscriptEncadreur from "./pages/InscriptEncadreur";
import InscriptParent from "./pages/InscriptParent";
import EncadreurEleve from "./pages/EncadreurEleve";
import ParentEncadreur from "./pages/ParentEncadreur";
import ProfilEncadreur from "./pages/ProfilEncadreur";

function App() {
  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const auth = getAuth();

    // Activer la persistance locale
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistance d'authentification activée.");
      })
      .catch((error) => {
        console.error("Erreur lors de l'activation de la persistance :", error);
      });

    // Observer les changements d'état de connexion
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Récupérer les informations de l'utilisateur depuis Firestore
        const userDocRef = doc(db, "utilisateurs", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Ajouter le rôle à l'objet utilisateur
          setUser({
            ...currentUser,
            role: userData.role, // Récupérer le rôle depuis Firestore
          });
        } else {
          console.error("Document utilisateur non trouvé dans Firestore.");
        }
      } else {
        setUser(null); // Aucun utilisateur connecté
      }
      setLoading(false); // Fin du chargement
    });

    // Nettoyer l'abonnement
    return () => unsubscribe();
  }, []);

  // Afficher un indicateur de chargement pendant que Firebase vérifie l'état de connexion
  if (loading) {
    return <div className="text-2xl font-extrabold flex mt-[20rem] justify-center">Chargement...</div>;
  }

  return (
    <div className="">
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Encadreurs" element={<Encadreurs />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="InscriptEleve" element={<InscriptEleve />} />
          <Route path="Login" element={<Login setUser={setUser} />} />
          <Route path="Blog1" element={<Blog1 />} />
          <Route path="Blog2" element={<Blog2 />} />
          <Route path="Blog3" element={<Blog3 />} />
          <Route path="TableauEleve" element={<TableauEleve />} />
          <Route path="TableauEncadreur" element={<TableauEncadreur />} />
          <Route path="TableauParent" element={<TableauParent />} />
          <Route path="InscriptEncadreur" element={<InscriptEncadreur />} />
          <Route path="InscriptParent" element={<InscriptParent />} />
          <Route path="EncadreurEleve" element={<EncadreurEleve />} />
          <Route path="ParentEncadreur" element={<ParentEncadreur />} />
          <Route path="ProfilEncadreur" element={<ProfilEncadreur />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;