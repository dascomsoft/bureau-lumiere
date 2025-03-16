import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import de la fonction signOut
import { auth } from "../firebase-config";

const Navbar = ({ user }) => {

  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openLinks, setOpenLinks] = useState(true);
  const [inscription, setInscription] = useState(true);
  const [compte, setCompte] = useState(true)

  const toggleMenu = () => {
    setOpenLinks(!openLinks);
  };

  const handleLinkClick = () => {
    setOpenLinks(true);
  };

  const toggleInscription = () => {
    setInscription(!inscription);
  };

  const closeInscription = () => {
    setInscription(true);
  };

  // Fonction pour gérer la déconnexion
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Déconnexion Firebase
      console.log("Déconnexion avec succès !");
      setUser(null); // Mettre à jour l'état utilisateur
      navigate('/'); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  //Gerer le compte de l'utilisateur

  const handleCompte = () => {
    setCompte(!compte);
  };


  const handleProfileRedirect = () => {
    if (!user || !user.role) {
      navigate('/'); // Rediriger vers la page d'accueil si l'utilisateur ou le rôle est manquant
      return;
    }
  
    // Logique pour rediriger selon le rôle
    switch (user.role) {
      case "eleve":
        navigate("/TableauEleve");
        break;
      case "parent":
        navigate("/TableauParent");
        break;
      case "encadreur":
        navigate("/TableauEncadreur");
        break;
      default:
        navigate("/"); // Rediriger vers la page d'accueil si le rôle est inconnu
        break;
    }
  };


  const changeCompte = () => {
    setCompte(true)
  }

  const profileAccount = () => {
    handleProfileRedirect();
    changeCompte();

  }



  const updateSignOut = () => {
    handleSignOut();
    changeCompte();
  }

  const updateMobileNav = () =>{
    handleLinkClick();
    toggleInscription()
  }

  const mobileProfile =()=>{
    handleLinkClick();
    handleCompte()
  }



  return (
    <div>
      <div className="main-navbar bg-black text-white fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 py-6">
          <header>
            <Link className="logo" to="/">
              <h2 className="font-bold text-3xl">
                LSV<span className="text-yellow-300">Assist</span>
              </h2>
            </Link>
            <div className="navleft" id={openLinks ? "open" : "close"}>
              <svg
                onClick={toggleMenu}
                className="closeIcon"
                id="closeBtn"
                fill="yellow"
                width="30px"
                height="30px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z" />
              </svg>
              <Link onClick={handleLinkClick} className="head-link" to="/">
                Accueil
              </Link>

              <Link onClick={handleLinkClick} className="head-link" to="/blog">
                Blog
              </Link>
              {user ? (
                <>
                  <Link onClick={handleLinkClick} className="head-link cursor-pointer text-green-400 font-extrabold" to="/ProfilEncadreur">
                    Profils Encadreurs
                  </Link>
                  <p onClick={mobileProfile} className="cursor-pointer text-yellow-300 font-extrabold">Mon Compte</p>

                </>
              ) : (
                <>
                  <Link
                    onClick={handleLinkClick}
                    className="head-link"
                    to="/Encadreurs"
                  >
                    Encadreurs
                  </Link>
                  <Link
                    onClick={handleLinkClick}
                    className="head-link"
                    to="/Login"
                  >
                    Connection
                  </Link>
                  <button onClick={updateMobileNav} className="head-link">
                    Inscription
                  </button>
                </>
              )}
            </div>
            <nav className="flex gap-5 navright">
              <Link className="head-link" to="/">
                Accueil
              </Link>
             
              <Link className="head-link" to="/blog">
                Blog
              </Link>
              {user ? (
                <>
                  <Link className="head-link cursor-pointer text-green-400 font-extrabold" to="/ProfilEncadreur">
                    Profils Encadreurs
                  </Link>
                  <p onClick={handleCompte} className="cursor-pointer text-yellow-300 font-extrabold">Mon Compte</p>
                </>

              ) : (
                <>
                 <Link className="head-link" to="/Encadreurs">
                Encadreurs
              </Link>
                  <Link className="head-link" to="/Login">
                    Connection
                  </Link>
                  <button className="head-link" onClick={toggleInscription}>
                    Inscription
                  </button>
                </>
              )}
            </nav>
            <svg
              onClick={toggleMenu}
              className="cursor-pointer jam jam-menu"
              id="openBtn"
              fill="#fff"
              width="50px"
              height="50px"
              viewBox="-5 -7 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              <path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
            </svg>
          </header>
        </div>
      </div>
      <div id={inscription ? "hideInscription" : "showInscription"}>
        <div className="detail bg-white p-10 rounded-md flex-col gap-4">
          <h1 className="font-extrabold text-xl">Inscription</h1>
          <p className="mt-2">Je souhaite creer un compte en tant que</p>
          <div className="flex flex-wrap gap-4 mt-5">
            <Link
              onClick={closeInscription}
              to="/InscriptEncadreur"
              className="bg-red-600 text-white px-5 py-2 rounded-full"
            >
              Encadreur
            </Link>
            <Link
              onClick={closeInscription}
              to="/InscriptEleve"
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
            >
              Eleve
            </Link>
            <Link
              onClick={closeInscription}
              to="/InscriptParent"
              className="bg-green-600 text-white px-5 py-2 rounded-full"
            >
              Parent
            </Link>
            <Link onClick={closeInscription} className="bg-slate-950 text-white px-5 py-2 rounded-full" to='/'>Close</Link>
          </div>
        </div>
      </div>

      {/* ZONE POUR GERER LE PROFIL UTILISATEUR (PROFIL ET DECONNECTION)*/}

      <div className="compte-section" id={compte ? "hideCompte" : "showCompte"}>
        <div className="detailCompte bg-white p-10 rounded-md">
          <h1 className="font-bold text-xl">Compte utilisateur</h1>
          <div className="flex flex-wrap gap-5 mt-5">
            <button className="bg-red-600 text-white px-5 py-2 rounded-full" onClick={profileAccount} >Mon profil</button>
            <Link to='/' className="bg-green-600 text-white px-5 py-2 rounded-full" onClick={updateSignOut}>Deconnection</Link>
            <button className="bg-black text-white px-5 py-2 rounded-full" onClick={changeCompte} >Close</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;








