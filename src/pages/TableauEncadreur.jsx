



import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const PageEncadreur = () => {
  const [user, setUser] = useState(null); // Informations de l'encadreur
  const [messages, setMessages] = useState([]); // Liste des messages reçus
  const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné pour la messagerie
  const [messageText, setMessageText] = useState(""); // Texte du message direct
  const navigate = useNavigate();



  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      console.log("ID de l'utilisateur connecté :", currentUser.uid);
  
      // Récupérer les informations de l'utilisateur connecté
      const userDocRef = doc(db, "utilisateurs", currentUser.uid);
      getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
          setUser(doc.data()); // Mettre à jour l'état avec les informations de l'utilisateur
        } else {
          console.error("Aucun document utilisateur trouvé pour cet ID.");
        }
      }).catch((error) => {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      });
  
      // Charger les messages reçus par l'encadreur
      const q = query(collection(db, "messages"), where("to", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("Nombre de messages reçus :", snapshot.docs.length);
        const fetchedMessages = snapshot.docs.map((doc) => {
          const messageData = doc.data();
          console.log("Message reçu :", messageData);
  
          return {
            id: doc.id,
            ...messageData,
            // Les informations de l'expéditeur sont déjà incluses dans le message
            senderName: messageData.senderName || "Anonyme",
            senderRole: messageData.senderRole || "Inconnu",
          };
        });
        setMessages(fetchedMessages);
        console.log("Messages dans l'état :", fetchedMessages);
      });
  
      return unsubscribe;
    }
  }, []);







  const deleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      setMessages(messages.filter((message) => message.id !== messageId));
      alert("Message supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
    }
  };

  // Envoyer un message direct
  // const sendMessage = async () => {
  //   if (messageText.trim() !== "") {
  //     try {
  //       const auth = getAuth();
  //       const currentUser = auth.currentUser;

  //       await addDoc(collection(db, "messages"), {
  //         from: currentUser.uid, // ID de l'expéditeur (élève ou parent)
  //         to: selectedUser.userId, // ID de l'encadreur (destinataire)
  //         text: messageText,
  //         date: new Date(),
  //       });
  //       setMessageText("");
  //       setSelectedUser(null);
  //       alert("Message envoyé avec succès !");
  //     } catch (error) {
  //       console.error("Erreur lors de l'envoi du message :", error);
  //     }
  //   }
  // };






  const sendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
  
        // Récupérer les informations de l'utilisateur connecté depuis Firestore
        const userDocRef = doc(db, "utilisateurs", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
  
          // Ajouter le message avec les informations de l'expéditeur
          await addDoc(collection(db, "messages"), {
            from: currentUser.uid, // ID de l'expéditeur
            to: selectedUser.userId, // ID du destinataire
            text: messageText, // Texte du message
            date: new Date(), // Date du message
            senderName: `${userData.nom} ${userData.prenom}`, // Nom complet de l'expéditeur
            senderRole: userData.role, // Rôle de l'expéditeur
          });
  
          // Réinitialiser le champ de texte et fermer la pop-up
          setMessageText("");
          setSelectedUser(null);
          alert("Message envoyé avec succès !");
        } else {
          console.error("Utilisateur non trouvé dans Firestore.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
      }
    }
  };






  // Redirection vers les forums
  const goToForumEncadreursEleves = () => {
    navigate("/EncadreurEleve");
  };

  const goToForumEncadreursParents = () => {
    navigate("/ParentEncadreur");
  };

  return (
    <div className="pt-[10rem] pb-[2rem] bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Profil de l'encadreur */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Profil de l'encadreur</h1>
          {user ? (
            <div>
              <p className="text-gray-700"><strong>Nom :</strong> {user.nom} {user.prenom}</p>
              <p className="text-gray-700"><strong>Email :</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Rôle :</strong> {user.role}</p>
            </div>
          ) : (
            <p>Chargement du profil...</p>
          )}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={goToForumEncadreursEleves}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Forum Encadreurs-Élèves
            </button>
            <button
              onClick={goToForumEncadreursParents}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Forum Encadreurs-Parents
            </button>
          </div>
        </div>

        
        




<div className="bg-white shadow-md rounded-lg p-6">
  <h2 className="text-2xl font-bold text-blue-800 mb-4">Messages reçus</h2>
  {messages.length === 0 ? (
    <p className="text-gray-700">Aucun message reçu pour le moment.</p>
  ) : (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="border-b  pb-4 ">
          <p className="text-gray-700">
            <strong>De :</strong> {message.senderName}
          </p>
          <p className="text-gray-700"><strong>Rôle :</strong> {message.senderRole}</p>
          <p className="text-gray-700">
            <strong>Date :</strong>{" "}
            {message.date?.seconds
              ? new Date(message.date.seconds * 1000).toLocaleString()
              : "Date invalide"}
          </p>
          <p className="text-gray-700"><strong>Message :</strong> {message.text}</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => deleteMessage(message.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Supprimer
            </button>
            <button
              onClick={() =>
                setSelectedUser({
                  userId: message.from,
                  userName: message.senderName,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Répondre
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* Pop-up pour envoyer un message direct */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Envoyer un message à {selectedUser.userName}
              </h2>
              <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Écrivez votre message ici..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEncadreur;