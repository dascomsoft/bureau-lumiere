


// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   updateDoc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../firebase-config";

// const ParentEncadreur = () => {
//   const [questions, setQuestions] = useState([]); // Liste des questions
//   const [newQuestion, setNewQuestion] = useState(""); // Nouvelle question à poser
//   const [isSubmitting, setIsSubmitting] = useState(false); // Indicateur de chargement lors de l'envoi
//   const [editingQuestionId, setEditingQuestionId] = useState(null); // ID de la question en cours de modification
//   const [editingText, setEditingText] = useState(""); // Texte modifié pour la question
//   const [responses, setResponses] = useState({}); // Pour gérer les réponses par question
//   const [openResponse, setOpenResponse] = useState({}); // Gérer l'état d'ouverture de la réponse pour chaque question

//   // Récupérer les questions depuis Firestore
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         // Filtrer les questions pour n'afficher que celles des parents et encadreurs
//         const q = query(
//           collection(db, "questions"),
//           where("role", "in", ["parent", "encadreur"]) // Filtre pour les questions des parents et encadreurs
//         );
//         const querySnapshot = await getDocs(q);
//         const fetchedQuestions = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des questions :", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // Ajouter une nouvelle question
//   const addQuestion = async () => {
//     if (newQuestion.trim() !== "") {
//       setIsSubmitting(true);
//       try {
//         await addDoc(collection(db, "questions"), {
//           question: newQuestion,
//           date: new Date(),
//           role: "parent", // Ajoutez ce champ pour identifier l'origine de la question
//         });
//         setNewQuestion("");
//         setIsSubmitting(false);
//         // Recharger les questions
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         setQuestions(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Erreur lors de l'ajout de la question :", error);
//         setIsSubmitting(false);
//       }
//     }
//   };

//   // Supprimer une question
//   const deleteQuestion = async (id) => {
//     try {
//       await deleteDoc(doc(db, "questions", id));
//       setQuestions((prev) => prev.filter((q) => q.id !== id));
//     } catch (error) {
//       console.error("Erreur lors de la suppression :", error);
//     }
//   };

//   // Modifier une question
//   const updateQuestion = async (id) => {
//     if (editingText.trim() !== "") {
//       try {
//         await updateDoc(doc(db, "questions", id), { question: editingText });
//         setQuestions((prev) =>
//           prev.map((q) =>
//             q.id === id ? { ...q, question: editingText } : q
//           )
//         );
//         setEditingQuestionId(null);
//         setEditingText("");
//       } catch (error) {
//         console.error("Erreur lors de la modification :", error);
//       }
//     }
//   };

//   //Ajouter une réponse à une question
//   const addResponse = async (questionId) => {
//     const response = responses[questionId];
//     if (response && response.trim() !== "") {
//       try {
//         await addDoc(collection(db, "responses"), {
//           questionId,
//           response,
//           date: new Date(),
//         });
//         setResponses({ ...responses, [questionId]: "" }); // Réinitialiser le champ de réponse après envoi
//         // Recharger les réponses
//         const querySnapshot = await getDocs(collection(db, "responses"));
//         // Mise à jour des réponses pour chaque question
//         const updatedQuestions = questions.map((q) => ({
//           ...q,
//           responses: querySnapshot.docs.filter(doc => doc.data().questionId === q.id)
//             .map(doc => doc.data().response)
//         }));
//         setQuestions(updatedQuestions);
//         // Fermer la zone de réponse après l'envoi
//         setOpenResponse({ ...openResponse, [questionId]: false });
//       } catch (error) {
//         console.error("Erreur lors de l'ajout de la réponse :", error);
//       }
//     }
//   };



 




//   // Gérer l'ouverture/fermeture de la section de réponse
//   const toggleResponse = (questionId) => {
//     setOpenResponse((prevState) => ({
//       ...prevState,
//       [questionId]: !prevState[questionId],
//     }));
//   };

//   return (
//     <div className="pt-[10rem] pb-[2rem] bg-stone-100">
//       <div className="container mx-auto px-4">
//         <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">
//           Forum de discussion des Parents Encadreurs
//         </h1>

//         {/* Poser une question */}
//         <div className="bg-stone-200 shadow-md p-4 mb-10">
//           {/* <h2 className="text-xl font-semibold mb-4">Poser une question</h2> */}
//           <textarea
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//             placeholder="Entrez votre question"
//             className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
//           />
//           <button
//             onClick={addQuestion}
//             className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Envoi en cours..." : "Envoyer"}
//           </button>
//         </div>

//         {/* Liste des questions */}
//         <div className="bg-stone-200 shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-4">Questions posées</h2>
//           {questions.length > 0 ? (
//             questions.map((q) => (
//               <div key={q.id} className="mt-4 p-2 border rounded bg-white">
//                 {editingQuestionId === q.id ? (
//                   <>
//                     <textarea
//                       value={editingText}
//                       onChange={(e) => setEditingText(e.target.value)}
//                       className="w-full p-2 border rounded mb-2"
//                     />
//                     <button
//                       onClick={() => updateQuestion(q.id)}
//                       className="mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
//                     >
//                       Enregistrer
//                     </button>
//                     <button
//                       onClick={() => setEditingQuestionId(null)}
//                       className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
//                     >
//                       Annuler
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <p><strong>Question :</strong> {q.question}</p>
//                     <p className="text-sm text-gray-500">
//                       Date : {new Date(q.date.seconds * 1000).toLocaleString()}
//                     </p>
//                     <button
//                       onClick={() => {
//                         setEditingQuestionId(q.id);
//                         setEditingText(q.question);
//                       }}
//                       className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       onClick={() => deleteQuestion(q.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
//                     >
//                       Supprimer
//                     </button>
//                     <div className="mt-4">
//                       {/* Bouton Répondre */}
//                       <button
//                         onClick={() => toggleResponse(q.id)}
//                         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                       >
//                         Répondre
//                       </button>

//                       {/* Section de réponse */}
//                       {openResponse[q.id] && (
//                         <div className="mt-4">
//                           <textarea
//                             value={responses[q.id] || ""}
//                             onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
//                             placeholder="Entrez votre réponse"
//                             className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
//                           />
//                           <button
//                             onClick={() => addResponse(q.id)}
//                             className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//                           >
//                             Envoyer
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     {/* Afficher les réponses */}
//                     {q.responses && q.responses.length > 0 && (
//                       <div className="mt-4">
//                         <h3 className="font-semibold">Réponses :</h3>
//                         {q.responses.map((response, index) => (
//                           <p key={index} className="text-gray-600">{response}</p>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>Aucune question posée pour le moment.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentEncadreur;









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
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const ParentEncadreur = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [replyingQuestion, setReplyingQuestion] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [hoveredUserId, setHoveredUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);

    const fetchQuestions = async () => {
      const q = query(collection(db, "questions"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedQuestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(fetchedQuestions);
      });
      return unsubscribe;
    };

    fetchQuestions();
  }, []);

  const getUserInfo = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "utilisateurs", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          userId: currentUser.uid,
          userName: `${userData.nom} ${userData.prenom}`,
          userRole: userData.role || "eleve",
        };
      }
    }
    return {
      userId: null,
      userName: "Utilisateur Anonyme",
      userRole: "eleve",
    };
  };

  const addQuestion = async () => {
    if (newQuestion.trim() !== "") {
      setIsSubmitting(true);
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userDocRef = doc(db, "utilisateurs", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          await addDoc(collection(db, "questions"), {
            question: newQuestion,
            userId: currentUser.uid,
            userName: `${userData.nom} ${userData.prenom}`,
            role: userData.role,
            classe: userData.classe || null,
            matiere: userData.matiere || null,
            date: new Date(),
          });

          setSuccessMessage("Votre question a été ajoutée avec succès !");
          setNewQuestion("");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          console.error("Utilisateur non trouvé dans Firestore.");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la question :", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const deleteQuestion = async (question) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Vous devez être connecté pour supprimer une question.");
      return;
    }

    const userDocRef = doc(db, "utilisateurs", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const currentUserRole = userDoc.exists() ? userDoc.data().role : null;

    if (
      question.userId === currentUser.uid ||
      (currentUserRole === "encadreur" && question.role === "eleve")
    ) {
      try {
        await deleteDoc(doc(db, "questions", question.id));
        setQuestions(questions.filter((q) => q.id !== question.id));
        setSuccessMessage("La question a été supprimée avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression de la question :", error);
      }
    } else {
      alert("Vous n'avez pas la permission de supprimer cette question.");
    }
  };

  const editQuestion = async (id) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Vous devez être connecté pour modifier une question.");
      return;
    }

    const questionToEdit = questions.find((q) => q.id === id);

    if (questionToEdit.userId === currentUser.uid && editingText.trim() !== "") {
      try {
        await updateDoc(doc(db, "questions", id), { question: editingText });
        setQuestions(
          questions.map((q) => (q.id === id ? { ...q, question: editingText } : q))
        );
        setEditingQuestion(null);
        setEditingText("");
      } catch (error) {
        console.error("Erreur lors de la modification de la question :", error);
      }
    } else {
      alert("Vous n'avez pas la permission de modifier cette question.");
    }
  };

  const replyToQuestion = async (questionId) => {
    if (replyText.trim() !== "") {
      try {
        const userInfo = await getUserInfo();
        const questionDoc = doc(db, "questions", questionId);
        const updatedReplies = questions.find((q) => q.id === questionId)?.replies || [];

        updatedReplies.push({
          reply: replyText,
          userId: userInfo.userId,
          userName: userInfo.userName,
          userRole: userInfo.userRole,
          date: new Date(),
        });

        await updateDoc(questionDoc, { replies: updatedReplies });
        setQuestions(
          questions.map((q) =>
            q.id === questionId ? { ...q, replies: updatedReplies } : q
          )
        );

        setReplyingQuestion(null);
        setReplyText("");
      } catch (error) {
        console.error("Erreur lors de la réponse à la question :", error);
      }
    }
  };

  const sendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userDocRef = doc(db, "utilisateurs", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          await addDoc(collection(db, "messages"), {
            from: currentUser.uid,
            to: selectedUser.userId,
            text: messageText,
            date: new Date(),
            senderName: `${userData.nom} ${userData.prenom}`,
            senderRole: userData.role,
          });

          setMessageText("");
          setSelectedUser(null);
          setSuccessMessage("Message envoyé avec succès !");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          console.error("Utilisateur non trouvé dans Firestore.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
        <p className="ml-4 text-2xl font-bold text-purple-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="pt-[10rem] pb-[2rem] bg-green-50">
      <div className="container mx-auto px-4">
        <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline text-purple-700">
          Page de discussions parents-encadreurs
        </h1>

        {/* Poser une question */}
        <div className="mt-8 bg-green-100 shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Poser une question</h2>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            placeholder="Entrez votre question ici"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button
            className={`mt-4 bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
            }`}
            onClick={addQuestion}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
          {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
        </div>

        {/* Liste des questions posées */}
        <div className="mt-8 bg-green-100 p-4 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-purple-700">Questions posées</h2>
          {questions.length === 0 ? (
            <p>Aucune question posée pour le moment.</p>
          ) : (
            questions.map((question) => (
              <div key={question.id} className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
                <p>
                  <strong>Question :</strong> {question.question}
                </p>
                <p
                  className="text-purple-500 cursor-pointer hover:underline relative"
                  onMouseEnter={() => setHoveredUserId(question.userId)}
                  onMouseLeave={() => setHoveredUserId(null)}
                  onClick={() =>
                    setSelectedUser({
                      userId: question.userId,
                      userName: question.userName,
                    })
                  }
                >
                  <strong>Posée par :</strong> {question.userName || "Anonyme"}
                  {hoveredUserId === question.userId && (
                    <span className="absolute bg-purple-700 text-white text-sm px-2 py-1 rounded-lg top-[-25px] left-0">
                      Envoyer un message
                    </span>
                  )}
                </p>
                <p><strong>Rôle :</strong> {question.role || "Non spécifié"}</p>
                {question.role === "eleve" && question.classe && (
                  <p><strong>Classe :</strong> {question.classe}</p>
                )}
                {question.role === "encadreur" && question.matiere && (
                  <p><strong>Matière :</strong> {question.matiere}</p>
                )}
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
                          <span
                            className="text-purple-500 cursor-pointer hover:underline relative"
                            onMouseEnter={() => setHoveredUserId(reply.userId)}
                            onMouseLeave={() => setHoveredUserId(null)}
                            onClick={() =>
                              setSelectedUser({
                                userId: reply.userId,
                                userName: reply.userName,
                              })
                            }
                          >
                            {reply.userName || "Anonyme"} ({reply.userRole})
                            {hoveredUserId === reply.userId && (
                              <span className="absolute bg-purple-700 text-white text-sm px-2 py-1 rounded-lg top-[-25px] left-0">
                                Envoyer un message
                              </span>
                            )}
                          </span>{" "}
                          à{" "}
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
                    onClick={() => deleteQuestion(question)}
                  >
                    Supprimer
                  </button>
                </div>

                {editingQuestion === question.id && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="mt-2">
                      <button
                        className="bg-purple-500 text-white py-1 px-3 rounded mr-2"
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
                      className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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

        {/* Pop-up pour envoyer un message direct */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Envoyer un message à {selectedUser.userName}
              </h2>
              <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
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

export default ParentEncadreur;





























