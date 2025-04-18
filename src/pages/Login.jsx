

import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";



function Login({ setUser }) {
    useEffect(() => {
        // Faire défiler vers le haut au chargement de la page
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

    

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loader
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

    const navigate = useNavigate();
    const db = getFirestore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                motDePasse
            );
            const user = userCredential.user;

            const userRef = doc(db, "utilisateurs", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                setUser({ ...userData, uid: user.uid }); // Mise à jour utilisateur global
                navigate("/"); // Redirection après connexion
            } else {
                setErrorMessage("Utilisateur n'existe pas.");
            }
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                setErrorMessage("Mot de passe incorrect !");
            } else if (error.code === "auth/user-not-found") {
                setErrorMessage("Utilisateur non trouvé !");
            } else {
                setErrorMessage("Une erreur s'est produite. Réessayez !");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mainLogin">
            <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
                <h1 className="text-4xl font-bold text-center">SE CONNECTER ICI</h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-stone-500"></div>
                    <p className="ml-4 text-2xl font-bold text-stone-500">Chargement...</p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-5  w-[90%] max-w-md  bg-white border-2 border-slate-200  p-8 shadow-lg">
                    {errorMessage && (
                        <p className="text-red-600 mb-4 font-bold">{errorMessage}</p>
                    )}
                    <input
                        className="w-full p-4  border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="w-full p-4  border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                        type="password"
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white text-2xl font-extrabold  p-3 rounded-lg text-center bg-stone-500 w-full"
                    >
                        Se connecter
                    </button>
                    <p className="text-center pt-[1rem]">
                        <Link >Vous n'avez pas encore de compte ?<span onClick={toggleInscription} className="text-blue-600 font-bold">S'inscrire ici</span></Link>
                    </p>
                </form>
            )}

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

        </div>
    );
}

export default Login;