import React, { useState, useEffect } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const ParentEncadreur = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [responses, setResponses] = useState({}); // Pour gérer les réponses par question
  const [openResponse, setOpenResponse] = useState({}); // Gérer l'état d'ouverture de la réponse pour chaque question

  // Récupérer les questions depuis Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "questions")); 
        const fetchedQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      }
    };

    fetchQuestions();
  }, []);

  // Ajouter une nouvelle question
  const addQuestion = async () => {
    if (newQuestion.trim() !== "") {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "questions"), {
          question: newQuestion,
          date: new Date(),
        });
        setNewQuestion("");
        setIsSubmitting(false);
        // Recharger les questions
        const querySnapshot = await getDocs(collection(db, "questions"));
        setQuestions(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erreur lors de l'ajout de la question :", error);
        setIsSubmitting(false);
      }
    }
  };

  // Supprimer une question
  const deleteQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Modifier une question
  const updateQuestion = async (id) => {
    if (editingText.trim() !== "") {
      try {
        await updateDoc(doc(db, "questions", id), { question: editingText });
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, question: editingText } : q
          )
        );
        setEditingQuestionId(null);
        setEditingText("");
      } catch (error) {
        console.error("Erreur lors de la modification :", error);
      }
    }
  };

  // Ajouter une réponse à une question
  const addResponse = async (questionId) => {
    const response = responses[questionId];
    if (response && response.trim() !== "") {
      try {
        await addDoc(collection(db, "responses"), {
          questionId,
          response,
          date: new Date(),
        });
        setResponses({ ...responses, [questionId]: "" }); // Réinitialiser le champ de réponse après envoi
        // Recharger les réponses
        const querySnapshot = await getDocs(collection(db, "responses"));
        // Mise à jour des réponses pour chaque question
        const updatedQuestions = questions.map((q) => ({
          ...q,
          responses: querySnapshot.docs.filter(doc => doc.data().questionId === q.id)
            .map(doc => doc.data().response)
        }));
        setQuestions(updatedQuestions);
        // Fermer la zone de réponse après l'envoi
        setOpenResponse({ ...openResponse, [questionId]: false });
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse :", error);
      }
    }
  };

  // Gérer l'ouverture/fermeture de la section de réponse
  const toggleResponse = (questionId) => {
    setOpenResponse((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <div className="pt-[10rem] pb-[2rem] bg-stone-100">
      <div className="container mx-auto px-4">
        <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">
          Forum de discussion des Parents Encadreurs
        </h1>

        {/* Poser une question */}
        <div className="bg-stone-200 shadow-md p-4 mb-10">
          <h2 className="text-xl font-semibold mb-4">Poser une question</h2>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Entrez votre question"
            className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
          />
          <button
            onClick={addQuestion}
            className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>

        {/* Liste des questions */}
        <div className="bg-stone-200 shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Questions posées</h2>
          {questions.length > 0 ? (
            questions.map((q) => (
              <div key={q.id} className="mt-4 p-2 border rounded bg-white">
                {editingQuestionId === q.id ? (
                  <>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => updateQuestion(q.id)}
                      className="mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingQuestionId(null)}
                      className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <p><strong>Question :</strong> {q.question}</p>
                    <p className="text-sm text-gray-500">
                      Date : {new Date(q.date.seconds * 1000).toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setEditingQuestionId(q.id);
                        setEditingText(q.question);
                      }}
                      className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                    <div className="mt-4">
                      {/* Bouton Répondre */}
                      <button
                        onClick={() => toggleResponse(q.id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Répondre
                      </button>

                      {/* Section de réponse */}
                      {openResponse[q.id] && (
                        <div className="mt-4">
                          <textarea
                            value={responses[q.id] || ""}
                            onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                            placeholder="Entrez votre réponse"
                            className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
                          />
                          <button
                            onClick={() => addResponse(q.id)}
                            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                          >
                            Envoyer
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Afficher les réponses */}
                    {q.responses && q.responses.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold">Réponses :</h3>
                        {q.responses.map((response, index) => (
                          <p key={index} className="text-gray-600">{response}</p>
                        ))}
                      </div>
                    )}
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

export default ParentEncadreur;
