import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login({ setUser }) {

    useEffect(() => {
        // Faire défiler vers le haut au chargement de la page
        window.scrollTo(0, 0);
    }, []);

    // États pour stocker l'email et le mot de passe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Pour rediriger après connexion

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            // Envoi des données au backend
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Si la connexion est réussie, rediriger vers la page d'accueil ou tableau de bord
                const data = await response.json()

                // Mise à jour de l'état utilisateur avec setUser
                setUser(data);

                alert(data.message);

                navigate('/'); // Rediriger vers la page d'acceuil

                // Réinitialiser les champs après l'inscription réussie
                setEmail('');
                setPassword('');
            } else {
                // En cas d'échec, afficher un message d'erreur
                const errorData = await response.json();
                alert(errorData.message || 'Échec de la connexion');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la tentative de connexion');
        }
    };

    return (
        <div className='mainLogin'>
            <div className="banner-contact bg-stone-600 text-white pt-[10rem] pb-[5rem]">
                <h1 className='text-4xl font-bold text-center'>SE CONNECTER ICI</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 w-[90%] max-w-md bg-white border-2 border-slate-200 p-8 shadow-lg">
                <input
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                    placeholder='Entrer votre email'
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
                />
                <input
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                    placeholder='Entrer le mot de passe'
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
                />
                <button type="submit" className='text-white font-extrabold text-xl bg-stone-400 p-2 rounded-lg'>Se connecter</button>
                <Link to="/inscription"><p className='mt-3 text-center'>Pas encore de compte ? <span className='text-blue-600 font-bold'>Inscrivez-vous ici</span></p></Link>
            </form>
        </div>
    );
}

export default Login;
