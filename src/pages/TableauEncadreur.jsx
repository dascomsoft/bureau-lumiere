import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const PageEncadreur = () => {
  const [encadreur, setEncadreur] = useState(null); // Détails de l'encadreur
  const [question, setQuestion] = useState(""); // Question à envoyer
  const [questions, setQuestions] = useState([]); // Liste des questions
  const [messageEnvoye, setMessageEnvoye] = useState(""); // Message de confirmation
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [editId, setEditId] = useState(null); // ID de la question en cours de modification
  const [deleteId, setDeleteId] = useState(null); // ID de la question en cours de suppression
  const [editedText, setEditedText] = useState(""); // Texte modifié

  useEffect(() => {
    const fetchEncadreurConnecte = async () => {
      const auth = getAuth();
      const utilisateurConnecte = auth.currentUser;

      if (utilisateurConnecte) {
        try {
          const querySnapshot = await getDocs(collection(db, "utilisateurs"));
          const encadreurConnecte = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .find((encadreur) => encadreur.id === utilisateurConnecte.uid);

          if (encadreurConnecte) {
            setEncadreur(encadreurConnecte);
          } else {
            console.warn("Aucun encadreur trouvé pour cet utilisateur.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      } else {
        console.warn("Aucun utilisateur connecté.");
      }
    };

    fetchEncadreurConnecte();
  }, []);

  const envoyerQuestion = async () => {
    if (!question.trim()) {
      setMessageEnvoye("Veuillez entrer une question avant de l'envoyer.");
      return;
    }

    setLoading(true);

    try {
      const questionData = {
        question,
        date: new Date(),
        encadreurId: encadreur?.id,
      };

      await addDoc(collection(db, "questions"), questionData);

      setQuestions((prev) => [...prev, questionData]);
      setQuestion("");
      setMessageEnvoye("Votre question a été envoyée avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la question :", error);
    } finally {
      setLoading(false);
    }
  };

  const supprimerQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((q) => q.id !== id));
      setMessageEnvoye("Question supprimée avec succès !");
      setDeleteId(null);
    } catch (error) {
      console.error("Erreur lors de la suppression de la question :", error);
    }
  };

  const modifierQuestion = async (id) => {
    try {
      const questionRef = doc(db, "questions", id);
      await updateDoc(questionRef, {
        question: editedText,
      });

      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, question: editedText } : q))
      );
      setMessageEnvoye("Question modifiée avec succès !");
      setEditId(null);
    } catch (error) {
      console.error("Erreur lors de la modification de la question :", error);
    }
  };

  return (
    <div className="py-[10rem] bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Page Encadreur</h1>

        {encadreur ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Profil de l'encadreur</h2>
            <p><strong>Nom :</strong> {encadreur.nom}</p>
            <p><strong>Email :</strong> {encadreur.email}</p>
          </div>
        ) : (
          <p>Chargement des informations de l'encadreur...</p>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Envoyer une Question</h2>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Posez votre question..."
          ></textarea>
          <button
            onClick={envoyerQuestion}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
          {messageEnvoye && <p className="mt-4 text-green-600">{messageEnvoye}</p>}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Questions envoyées</h2>
          {questions.map((q) => (
            <div key={q.id} className="mb-4 border-b pb-4">
              <p><strong>Question :</strong> {q.question}</p>
              {editId === q.id ? (
                <div>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full px-4 py-2 border rounded mt-2"
                  ></textarea>
                  <button
                    onClick={() => modifierQuestion(q.id)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="ml-2 mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Annuler
                  </button>
                </div>
              ) : deleteId === q.id ? (
                <div>
                  <p className="text-red-600">Confirmer la suppression ?</p>
                  <button
                    onClick={() => supprimerQuestion(q.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Non
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setEditId(q.id);
                      setEditedText(q.question);
                    }}
                    className="mr-4 text-blue-500 hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => setDeleteId(q.id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageEncadreur;
