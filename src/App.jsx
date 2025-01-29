import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config"; // Assurez-vous que votre fichier firebase-config est correctement configuré
import { useState , useEffect} from "react"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Encadreurs from "./pages/Encadreurs"
import Blog from "./pages/Blog"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import InscriptEleve from "./pages/InscriptEleve"
import Blog1 from "./pages/Blog1"
import Blog2 from "./pages/Blog2"
import Blog3 from "./pages/Blog3"
import TableauEleve from "./pages/TableauEleve"
import TableauEncadreur from "./pages/TableauEncadreur"
import TableauParent from "./pages/TableauParent";
import InscriptEncadreur from "./pages/InscriptEncadreur"
import InscriptParent from "./pages/InscriptParent"
import EncadreurEleve from "./pages/EncadreurEleve"
import PageParentEncadreur from "./pages/ParentEncadreur";
import ProfilEncadreur from "./pages/ProfilEncadreur"



function App() {

  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur
    // Écouter les changements d'état d'authentification

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return unsubscribe;
    }, []);
    



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
          <Route path="Blog1" element ={<Blog1 />} />
          <Route path="Blog2" element ={<Blog2 />} />
          <Route path="Blog3" element ={<Blog3 />} />
          <Route path="TableauEleve" element={<TableauEleve />} />
          <Route path="TableauEncadreur" element={<TableauEncadreur/>} />
          <Route path="TableauParent" element={<TableauParent/>} />
          <Route path="InscriptEncadreur" element={<InscriptEncadreur/>} />
          <Route path="InscriptParent" element={<InscriptParent/>} />
          <Route path="EncadreurEleve" element={<EncadreurEleve/>} />
          <Route path="PageParentEncadreur" element={<PageParentEncadreur/>} />
          <Route path="ProfilEncadreur" element={<ProfilEncadreur/>} />

        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App