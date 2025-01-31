// import React, { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase-config";

// const PageCommune = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const [replyingQuestion, setReplyingQuestion] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         setUser(currentUser);
//       }
//       setIsLoading(false);
//     };

//     const fetchQuestions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         const fetchedQuestions = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des questions :", error);
//       }
//     };

//     fetchUserData();
//     fetchQuestions();
//   }, []);

//   const addQuestion = async () => {
//     if (newQuestion.trim() !== "") {
//       setIsSubmitting(true);
//       try {
//         const newQuestionRef = await addDoc(collection(db, "questions"), {
//           question: newQuestion,
//           userId: user?.uid,
//           userName: user?.displayName || "Utilisateur Anonyme",
//           role: user?.email?.includes("@school.com") ? "Encadreur" : "Élève", // Exemple pour déterminer le rôle
//           date: new Date(),
//         });
//         setQuestions([
//           ...questions,
//           {
//             id: newQuestionRef.id,
//             question: newQuestion,
//             userName: user?.displayName || "Utilisateur Anonyme",
//             role: user?.email?.includes("@school.com") ? "Encadreur" : "Élève",
//             date: new Date(),
//           },
//         ]);
//         setSuccessMessage("Votre question a été ajoutée avec succès !");
//         setNewQuestion("");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } catch (error) {
//         console.error("Erreur lors de l'ajout de la question :", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const deleteQuestion = async (id) => {
//     try {
//       const questionDoc = doc(db, "questions", id);
//       await deleteDoc(questionDoc);
//       setQuestions(questions.filter((question) => question.id !== id));
//       setSuccessMessage("La question a été supprimée avec succès !");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Erreur lors de la suppression de la question :", error);
//     }
//   };

//   const editQuestion = async (id) => {
//     if (editingText.trim() !== "") {
//       try {
//         const questionDoc = doc(db, "questions", id);
//         await updateDoc(questionDoc, { question: editingText });
//         setQuestions(
//           questions.map((q) => (q.id === id ? { ...q, question: editingText } : q))
//         );
//         setEditingQuestion(null);
//         setEditingText("");
//       } catch (error) {
//         console.error("Erreur lors de la modification de la question :", error);
//       }
//     }
//   };

//   const replyToQuestion = async (id) => {
//     if (replyText.trim() !== "") {
//       try {
//         const questionDoc = doc(db, "questions", id);
//         const updatedReplies = questions.find((q) => q.id === id)?.replies || [];
//         updatedReplies.push({
//           reply: replyText,
//           userId: user?.uid,
//           userName: user?.displayName || "Utilisateur Anonyme",
//           date: new Date(),
//         });
//         await updateDoc(questionDoc, { replies: updatedReplies });
//         setQuestions(
//           questions.map((q) =>
//             q.id === id ? { ...q, replies: updatedReplies } : q
//           )
//         );
//         setReplyingQuestion(null);
//         setReplyText("");
//       } catch (error) {
//         console.error("Erreur lors de la réponse à la question :", error);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-stone-500"></div>
//         <p className="ml-4 text-2xl font-bold text-stone-500">Chargement...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-[10rem] pb-[2rem] bg-stone-100">
//       <div className="container mx-auto px-4">
//         <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">Page de discussions encadreurs eleves</h1>
//         <div className="grid md:grid-cols-2 gap-10">
//           <div className="bg-stone-200 shadow-md p-4">
//             <h1 className="text-2xl font-semibold mb-2">Profil Utilisateur</h1>
//             {user ? (
//               <div>
//                 <h3>Nom : {user.displayName || "Utilisateur Anonyme"}</h3>
//                 <p>Email : {user.email}</p>
//               </div>
//             ) : (
//               <p>Aucun utilisateur connecté</p>
//             )}
//           </div>
//           <div className="bg-stone-200 shadow-md p-4">
//             <h2 className="text-2xl font-semibold mb-4">Poser une question</h2>
//             <textarea
//               className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//               placeholder="Entrez votre question ici"
//               value={newQuestion}
//               onChange={(e) => setNewQuestion(e.target.value)}
//             />
//             <button
//               className={`mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//               }`}
//               onClick={addQuestion}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Envoi en cours..." : "Envoyer"}
//             </button>
//             {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
//           </div>
//         </div>
//         <div className="mt-8 bg-stone-200 p-4 shadow-md">
//           <h2 className="text-2xl font-semibold">Questions posées</h2>
//           {questions.length === 0 ? (
//             <p>Aucune question posée pour le moment.</p>
//           ) : (
//             questions.map((question) => (
//               <div key={question.id} className="mt-4 p-4 border border-gray-300 rounded">
//                 <p><strong>Question :</strong> {question.question}</p>
//                 <p><strong>Nom :</strong> {question.userName || "Anonyme"}</p>
//                 <p><strong>Rôle :</strong> {question.role || "Non spécifié"}</p>
//                 <p>
//                   <strong>Date :</strong>{" "}
//                   {question.date?.seconds
//                     ? new Date(question.date.seconds * 1000).toLocaleString()
//                     : "Date invalide"}
//                 </p>
//                 {question.replies && (
//                   <div className="mt-2">
//                     <strong>Réponses :</strong>
//                     <ul>
//                       {question.replies.map((reply, index) => (
//                         <li key={index}>
//                           {reply.reply} -{" "}
//                           {reply.userName || "Anonyme"} à{" "}
//                           {reply.date?.seconds
//                             ? new Date(reply.date.seconds * 1000).toLocaleString()
//                             : "Date invalide"}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <div className="mt-2">
//                   <button
//                     className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
//                     onClick={() => {
//                       setEditingQuestion(question.id);
//                       setEditingText(question.question);
//                     }}
//                   >
//                     Modifier
//                   </button>
//                   <button
//                     className="bg-green-500 text-white py-1 px-3 rounded mr-2"
//                     onClick={() => setReplyingQuestion(question.id)}
//                   >
//                     Répondre
//                   </button>
//                   <button
//                     className="bg-red-500 text-white py-1 px-3 rounded"
//                     onClick={() => deleteQuestion(question.id)}
//                   >
//                     Supprimer
//                   </button>
//                 </div>

//                 {editingQuestion === question.id && (
//                   <div className="mt-4">
//                     <textarea
//                       className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       value={editingText}
//                       onChange={(e) => setEditingText(e.target.value)}
//                     />
//                     <div className="mt-2">
//                       <button
//                         className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
//                         onClick={() => editQuestion(question.id)}
//                       >
//                         Enregistrer
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white py-1 px-3 rounded"
//                         onClick={() => setEditingQuestion(null)}
//                       >
//                         Annuler
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {replyingQuestion === question.id && (
//                   <div className="mt-4">
//                     <textarea
//                       className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Entrez votre réponse ici"
//                       value={replyText}
//                       onChange={(e) => setReplyText(e.target.value)}
//                     />
//                     <div className="mt-2">
//                       <button
//                         className="bg-green-500 text-white py-1 px-3 rounded mr-2"
//                         onClick={() => replyToQuestion(question.id)}
//                       >
//                         Répondre
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white py-1 px-3 rounded"
//                         onClick={() => setReplyingQuestion(null)}
//                       >
//                         Annuler
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageCommune;


import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

const PageCommune = () => {
  const [questions, setQuestions] = useState([]); // Liste des questions
  const [newQuestion, setNewQuestion] = useState(""); // Nouvelle question à poser
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicateur de chargement lors de l'envoi
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement initial
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [successMessage, setSuccessMessage] = useState(""); // Message de succès
  const [editingQuestion, setEditingQuestion] = useState(null); // Question en cours de modification
  const [editingText, setEditingText] = useState(""); // Texte modifié pour la question
  const [replyingQuestion, setReplyingQuestion] = useState(null); // Question en cours de réponse
  const [replyText, setReplyText] = useState(""); // Texte de la réponse

  // Charger les données de l'utilisateur connecté et les questions
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    const fetchQuestions = async () => {
      try {
        // Filtrer les questions pour n'afficher que celles des élèves
        const q = query(collection(db, "questions"), where("role", "==", "eleve"));
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

    fetchUserData();
    fetchQuestions();
  }, []);

  // Ajouter une nouvelle question
  const addQuestion = async () => {
    if (newQuestion.trim() !== "") {
      setIsSubmitting(true);
      try {
        const newQuestionRef = await addDoc(collection(db, "questions"), {
          question: newQuestion,
          userId: user?.uid,
          userName: user?.displayName || "Utilisateur Anonyme",
          role: "eleve", // Ajoutez ce champ pour identifier l'origine de la question
          date: new Date(),
        });
        setQuestions([
          ...questions,
          {
            id: newQuestionRef.id,
            question: newQuestion,
            userName: user?.displayName || "Utilisateur Anonyme",
            role: "eleve",
            date: new Date(),
          },
        ]);
        setSuccessMessage("Votre question a été ajoutée avec succès !");
        setNewQuestion("");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la question :", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Supprimer une question
  const deleteQuestion = async (id) => {
    try {
      const questionDoc = doc(db, "questions", id);
      await deleteDoc(questionDoc);
      setQuestions(questions.filter((question) => question.id !== id));
      setSuccessMessage("La question a été supprimée avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression de la question :", error);
    }
  };

  // Modifier une question
  const editQuestion = async (id) => {
    if (editingText.trim() !== "") {
      try {
        const questionDoc = doc(db, "questions", id);
        await updateDoc(questionDoc, { question: editingText });
        setQuestions(
          questions.map((q) => (q.id === id ? { ...q, question: editingText } : q))
        );
        setEditingQuestion(null);
        setEditingText("");
      } catch (error) {
        console.error("Erreur lors de la modification de la question :", error);
      }
    }
  };

  // Répondre à une question
  const replyToQuestion = async (id) => {
    if (replyText.trim() !== "") {
      try {
        const questionDoc = doc(db, "questions", id);
        const updatedReplies = questions.find((q) => q.id === id)?.replies || [];
        updatedReplies.push({
          reply: replyText,
          userId: user?.uid,
          userName: user?.displayName || "Utilisateur Anonyme",
          date: new Date(),
        });
        await updateDoc(questionDoc, { replies: updatedReplies });
        setQuestions(
          questions.map((q) =>
            q.id === id ? { ...q, replies: updatedReplies } : q
          )
        );
        setReplyingQuestion(null);
        setReplyText("");
      } catch (error) {
        console.error("Erreur lors de la réponse à la question :", error);
      }
    }
  };

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-stone-500"></div>
        <p className="ml-4 text-2xl font-bold text-stone-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="pt-[10rem] pb-[2rem] bg-stone-100">
      <div className="container mx-auto px-4">
        <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">
          Page de discussions encadreurs-élèves
        </h1>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Profil de l'utilisateur */}
          <div className="bg-stone-200 shadow-md p-4">
            <h1 className="text-2xl font-semibold mb-2">Profil Utilisateur</h1>
            {user ? (
              <div>
                <h3>Nom : {user.displayName || "Utilisateur Anonyme"}</h3>
                <p>Email : {user.email}</p>
              </div>
            ) : (
              <p>Aucun utilisateur connecté</p>
            )}
          </div>

          {/* Poser une question */}
          <div className="bg-stone-200 shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">Poser une question</h2>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Entrez votre question ici"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button
              className={`mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              onClick={addQuestion}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
            {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
          </div>
        </div>

        {/* Liste des questions posées */}
        <div className="mt-8 bg-stone-200 p-4 shadow-md">
          <h2 className="text-2xl font-semibold">Questions posées</h2>
          {questions.length === 0 ? (
            <p>Aucune question posée pour le moment.</p>
          ) : (
            questions.map((question) => (
              <div key={question.id} className="mt-4 p-4 border border-gray-300 rounded">
                <p><strong>Question :</strong> {question.question}</p>
                <p><strong>Nom :</strong> {question.userName || "Anonyme"}</p>
                <p><strong>Rôle :</strong> {question.role || "Non spécifié"}</p>
                <p>
                  <strong>Date :</strong>{" "}
                  {question.date?.seconds
                    ? new Date(question.date.seconds * 1000).toLocaleString()
                    : "Date invalide"}
                </p>
                {question.replies && (
                  <div className="mt-2">
                    <strong>Réponses :</strong>
                    <ul>
                      {question.replies.map((reply, index) => (
                        <li key={index}>
                          {reply.reply} -{" "}
                          {reply.userName || "Anonyme"} à{" "}
                          {reply.date?.seconds
                            ? new Date(reply.date.seconds * 1000).toLocaleString()
                            : "Date invalide"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => {
                      setEditingQuestion(question.id);
                      setEditingText(question.question);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => setReplyingQuestion(question.id)}
                  >
                    Répondre
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    Supprimer
                  </button>
                </div>

                {editingQuestion === question.id && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="mt-2">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                        onClick={() => editQuestion(question.id)}
                      >
                        Enregistrer
                      </button>
                      <button
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                        onClick={() => setEditingQuestion(null)}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {replyingQuestion === question.id && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Entrez votre réponse ici"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="mt-2">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                        onClick={() => replyToQuestion(question.id)}
                      >
                        Répondre
                      </button>
                      <button
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                        onClick={() => setReplyingQuestion(null)}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCommune;
