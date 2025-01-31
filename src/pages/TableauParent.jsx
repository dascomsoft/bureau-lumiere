import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

const TableauParent = () => {
  const [parent, setParent] = useState(null); // Informations du parent connecté
  const [questions, setQuestions] = useState([]); // Liste des questions posées par tous les parents
  const [question, setQuestion] = useState(""); // Nouvelle question à poser
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null); // ID de la question en cours de modification
  const [editedQuestion, setEditedQuestion] = useState(""); // Texte modifié pour la question

  // Charger les données du parent connecté et les questions
  useEffect(() => {
    const fetchParentConnecte = async () => {
      const auth = getAuth();
      const utilisateurConnecte = auth.currentUser;

      if (utilisateurConnecte) {
        try {
          const querySnapshot = await getDocs(collection(db, "utilisateurs"));
          const parentConnecte = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .find((utilisateur) => utilisateur.id === utilisateurConnecte.uid);

          if (parentConnecte) {
            setParent(parentConnecte);
          } else {
            console.warn("Aucun parent trouvé pour cet utilisateur.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données du parent :", error);
        }
      } else {
        console.warn("Aucun utilisateur connecté.");
      }
    };

    const fetchQuestions = async () => {
      try {
        // Filtrer les questions pour n'afficher que celles des parents
        const q = query(collection(db, "questions"), where("role", "==", "parent"));
        const querySnapshot = await getDocs(q);
        const fetchedQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      }
    };

    fetchParentConnecte();
    fetchQuestions();
  }, []);

  // Ajouter une nouvelle question
  const ajouterQuestion = async () => {
    if (question.trim() !== "" && parent) {
      setIsSubmitting(true);
      try {
        const newQuestionRef = await addDoc(collection(db, "questions"), {
          question,
          parentId: parent.id,
          parentNom: `${parent.nom} ${parent.prenom}`,
          date: new Date(),
          role: "parent", // Ajoutez ce champ pour identifier l'origine de la question
        });

        setQuestions((prev) => [
          ...prev,
          {
            id: newQuestionRef.id,
            question,
            parentId: parent.id,
            parentNom: `${parent.nom} ${parent.prenom}`,
            date: new Date(),
            role: "parent",
          },
        ]);
        setQuestion("");
      } catch (error) {
        console.error("Erreur lors de l'ajout de la question :", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.warn("Veuillez entrer une question valide.");
    }
  };

  // Supprimer une question
  const supprimerQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la question :", error);
    }
  };

  // Modifier une question
  const modifierQuestion = async (id) => {
    if (editedQuestion.trim() !== "") {
      try {
        await updateDoc(doc(db, "questions", id), {
          question: editedQuestion,
        });

        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, question: editedQuestion } : q
          )
        );
        setEditingQuestionId(null);
        setEditedQuestion("");
      } catch (error) {
        console.error("Erreur lors de la modification de la question :", error);
      }
    } else {
      console.warn("Veuillez entrer une question valide.");
    }
  };

  return (
    <div className="pt-[10rem] pb-[2rem] bg-stone-100">
      <div className="container mx-auto px-4">
        <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">
          Tableau du parent
        </h1>

        {/* Profil du parent connecté */}
        <div className="bg-stone-200 shadow-md p-4 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Profil du parent</h2>
          {parent ? (
            <div>
              <p><strong>Nom :</strong> {parent.nom}</p>
              <p><strong>Prénom :</strong> {parent.prenom}</p>
              <p><strong>Email :</strong> {parent.email}</p>
              <br />
              <Link to='/PageParentEncadreur' className="text-white bg-slate-600 hover:bg-slate-800 p-3 rounded-lg text-center">Forum de discussions</Link>
            </div>
          ) : (
            <p>Aucun parent connecté trouvé.</p>
          )}
        </div>

        {/* Poser une question */}
        <div className="bg-stone-200 shadow-md p-4 mb-10">
          <h2 className="text-xl font-semibold mb-4">Poser une question</h2>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Entrez votre question"
            className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
            disabled={isSubmitting}
          />
          <button
            onClick={ajouterQuestion}
            className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>

        {/* Liste des questions posées */}
        <div className="bg-stone-200 shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Questions posées</h2>
          {questions.length > 0 ? (
            questions.map((q) => (
              <div key={q.id} className="mt-4 p-2 border rounded bg-white">
                {editingQuestionId === q.id ? (
                  <>
                    <textarea
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => modifierQuestion(q.id)}
                      className="mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => {
                        setEditingQuestionId(null);
                        setEditedQuestion("");
                      }}
                      className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Parent :</strong> {q.parentNom}
                    </p>
                    <p>
                      <strong>Question :</strong> {q.question}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date : {new Date(q.date.seconds * 1000).toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setEditingQuestionId(q.id);
                        setEditedQuestion(q.question);
                      }}
                      className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => supprimerQuestion(q.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Aucune question posée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableauParent;