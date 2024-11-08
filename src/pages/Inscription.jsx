
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/inscription.css';
import { useEffect } from 'react';

function Inscription() {

    useEffect(() => {
        // Faire défiler vers le haut au chargement de la page
        window.scrollTo(0, 0);
    }, []);

    // Création des états pour chaque champ
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Création de navigate pour redirection
    const navigate = useNavigate();

    // Fonction pour gérer l'envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        if (firstName === "" || lastName === "" || email === "" || password === "") {
            alert("Bien vouloir remplir les differents champs")
            return; // Empêcher la soumission du formulaire       
        }


        try {
            // Envoi des données au serveur
            const response = await fetch('http://localhost:5000/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });


            // Traiter la réponse du serveur
            if (response.ok) {
                const data = await response.json(); // Récupérer la réponse JSON du backend
                navigate('/login')
                alert(data.message); // Affiche le message du backend

                // Réinitialiser les champs après l'inscription réussie
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            }

            else {
                const errorData = await response.json();
                alert(errorData.message || "Échec de l'inscription"); // Affiche le message d'erreur
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription');
        }
    };

    return (
        <div className='main'>
            <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
                <h1 className='text-4xl font-bold text-center'>S'INSCRIRE ICI/</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1  w-[90%] max-w-md  bg-white border-2 border-slate-200 p-8  shadow-lg">
                <div>
                    <input className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder='Enter your first name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <input className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder='Enter your lastname' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <input className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder='Enter your email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder='Enter your password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='text-white text-2xl font-extrabold mt-3 text-center bg-stone-500'>Soumettre</button>
                <Link to="/Login"><p className='mt-3 text-center'>Avez-vous deja un compte ? <span className='text-blue-600 font-bold'>Se connecter ici</span></p></Link>

            </form>
        </div >

    );
}

export default Inscription;
