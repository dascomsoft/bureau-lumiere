// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { getMessaging, onMessage } from "firebase/messaging"; // Import FCM
// import { db } from "../firebase-config";

// const TableauEleve = () => {
//   const [eleves, setEleves] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [fcmMessages, setFcmMessages] = useState([]); // Pour les notifications FCM

//   useEffect(() => {
//     const fetchEleveConnecte = async () => {
//       const auth = getAuth();
//       const utilisateurConnecte = auth.currentUser;

//       if (utilisateurConnecte) {
//         try {
//           const querySnapshot = await getDocs(collection(db, "utilisateurs"));
//           const eleveConnecte = querySnapshot.docs
//             .map((doc) => ({ id: doc.id, ...doc.data() }))
//             .find((eleve) => eleve.id === utilisateurConnecte.uid);

//           if (eleveConnecte) {
//             setEleves([eleveConnecte]);
//           } else {
//             console.warn("Aucun élève trouvé pour cet utilisateur.");
//           }
//         } catch (error) {
//           console.error("Erreur lors de la récupération des données :", error);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         console.warn("Aucun utilisateur connecté.");
//         setIsLoading(false);
//       }
//     };

//     const fetchQuestions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         const fetchedQuestions = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setNotifications(fetchedQuestions);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des questions :", error);
//       }
//     };

//     const setupFCMListener = () => {
//       const messaging = getMessaging();
//       onMessage(messaging, (payload) => {
//         console.log("Message reçu : ", payload);
//         setFcmMessages((prev) => [...prev, payload.notification]);
//       });
//     };

//     fetchEleveConnecte();
//     fetchQuestions();
//     setupFCMListener();
//   }, []);

//   const ajouterQuestion = async () => {
//     if (question.trim() !== "") {
//       setIsSubmitting(true);
//       try {
//         if (editingQuestion) {
//           const questionDoc = doc(db, "questions", editingQuestion.id);
//           await updateDoc(questionDoc, { question });
//           setNotifications((prev) =>
//             prev.map((notif) =>
//               notif.id === editingQuestion.id ? { ...notif, question } : notif
//             )
//           );
//           setSuccessMessage("La question a été mise à jour avec succès !");
//         } else {
//           const newQuestionRef = await addDoc(collection(db, "questions"), {
//             question,
//             eleveId: eleves[0]?.id,
//             date: new Date(),
//           });
//           setNotifications((prev) => [
//             ...prev,
//             { id: newQuestionRef.id, question, date: new Date() },
//           ]);
//           setSuccessMessage("Votre question a été envoyée avec succès !");
//         }

//         setQuestion("");
//         setEditingQuestion(null);
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } catch (error) {
//         console.error("Erreur lors de l'envoi de la question :", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       console.warn("Veuillez entrer une question valide.");
//     }
//   };

//   const supprimerQuestion = async (id) => {
//     try {
//       const questionDoc = doc(db, "questions", id);
//       await deleteDoc(questionDoc);
//       setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//       setSuccessMessage("La question a été supprimée avec succès !");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Erreur lors de la suppression de la question :", error);
//     }
//   };

//   const preparerEdition = (notif) => {
//     setQuestion(notif.question);
//     setEditingQuestion(notif);
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
//         <h1 className="mb-[3rem] text-center text-2xl font-extrabold underline">
//           Tableau de l'élève
//         </h1>
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Profil de l'élève */}
//           <div className="bg-stone-200 shadow-md p-4">
//             <h1 className="text-2xl font-semibold mb-2">Profil de l'élève</h1>
//             {eleves.length > 0 ? (
//               eleves.map((eleve) => (
//                 <div key={eleve.id}>
//                   <h3>Nom : {eleve.nom}</h3>
//                   <p>Prenom : {eleve.prenom}</p>
//                   <p>Classe de l'élève : {eleve.classe}</p>
//                   <p>Examen a presenter : {eleve.examen}</p>
//                   <p>Quatier : {eleve.quatier}</p>
//                   <br />
//                   <Link to='/EncadreurEleve' className="text-white bg-slate-600 hover:bg-slate-800 p-3 rounded-lg text-center">TABLEAU QUESTIONS</Link>

//                 </div>
//               ))
//             ) : (
//               <p>Aucun élève connecté trouvé.</p>
//             )}
//           </div>

//           {/* Poser une question */}
//           <div className="bg-stone-200 shadow-md p-4">
//             <h2>{editingQuestion ? "Modifier une question" : "Poser une question"}</h2>
//             <textarea
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               placeholder="Entrez votre question"
//               className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
//               disabled={isSubmitting}
//             />
//             <button
//               onClick={ajouterQuestion}
//               className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//               }`}
//             >
//               {isSubmitting
//                 ? "Envoi en cours..."
//                 : editingQuestion
//                 ? "Mettre à jour"
//                 : "Envoyer"}
//             </button>
//             {successMessage && (
//               <div className="mt-4 text-green-600">{successMessage}</div>
//             )}

//             {notifications.map((notif) => (
//               <div
//                 key={notif.id}
//                 className="mt-4 p-2 border rounded bg-white"
//               >
//                 <p>
//                   <strong>Question :</strong> {notif.question}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => preparerEdition(notif)}
//                     className="bg-yellow-500 text-white py-1 px-3 rounded"
//                   >
//                     Éditer
//                   </button>
//                   <button
//                     onClick={() => supprimerQuestion(notif.id)}
//                     className="bg-red-500 text-white py-1 px-3 rounded"
//                   >
//                     Supprimer
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Zone de notification */}
//         <div className="mt-10 bg-stone-200 shadow-md p-4">
//           <h2 className="text-2xl font-bold">Notifications</h2>
//           {fcmMessages.length > 0 ? (
//             fcmMessages.map((msg, index) => (
//               <div key={index} className="mt-2 p-2 border rounded bg-white">
//                 <p>
//                   <strong>{msg.title}</strong>: {msg.body}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>Aucune notification pour le moment.</p>
//           )}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default TableauEleve;



       
                
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

const TableauEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [question, setQuestion] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchEleveConnecte = async () => {
      const auth = getAuth();
      const utilisateurConnecte = auth.currentUser;

      if (utilisateurConnecte) {
        try {
          const querySnapshot = await getDocs(collection(db, "utilisateurs"));
          const eleveConnecte = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .find((eleve) => eleve.id === utilisateurConnecte.uid);

          if (eleveConnecte) {
            setEleves([eleveConnecte]);
          } else {
            console.warn("Aucun élève trouvé pour cet utilisateur.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.warn("Aucun utilisateur connecté.");
        setIsLoading(false);
      }
    };

    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, "questions"), where("role", "==", "eleve"));
        const querySnapshot = await getDocs(q);
        const fetchedQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(fetchedQuestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      }
    };

    fetchEleveConnecte();
    fetchQuestions();
  }, []);

  const ajouterQuestion = async () => {
    if (question.trim() !== "") {
      setIsSubmitting(true);
      try {
        if (editingQuestion) {
          const questionDoc = doc(db, "questions", editingQuestion.id);
          await updateDoc(questionDoc, { question });
          setNotifications((prev) =>
            prev.map((notif) =>
              notif.id === editingQuestion.id ? { ...notif, question } : notif
            )
          );
          setSuccessMessage("La question a été mise à jour avec succès !");
        } else {
          const newQuestionRef = await addDoc(collection(db, "questions"), {
            question,
            eleveId: eleves[0]?.id,
            date: new Date(),
            role: "eleve", // Ajoutez ce champ
          });
          setNotifications((prev) => [
            ...prev,
            { id: newQuestionRef.id, question, date: new Date(), role: "eleve" },
          ]);
          setSuccessMessage("Votre question a été envoyée avec succès !");
        }

        setQuestion("");
        setEditingQuestion(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erreur lors de l'envoi de la question :", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.warn("Veuillez entrer une question valide.");
    }
  };

  const supprimerQuestion = async (id) => {
    try {
      const questionDoc = doc(db, "questions", id);
      await deleteDoc(questionDoc);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      setSuccessMessage("La question a été supprimée avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression de la question :", error);
    }
  };

  const preparerEdition = (notif) => {
    setQuestion(notif.question);
    setEditingQuestion(notif);
  };

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
          Tableau de l'élève
        </h1>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Profil de l'élève */}
          <div className="bg-stone-200 shadow-md p-4">
            <h1 className="text-2xl font-semibold mb-2">Profil de l'élève</h1>
            {eleves.length > 0 ? (
              eleves.map((eleve) => (
                <div key={eleve.id}>
                  <h3>Nom : {eleve.nom}</h3>
                  <p>Prenom : {eleve.prenom}</p>
                  <p>Classe de l'élève : {eleve.classe}</p>
                  <p>Examen a presenter : {eleve.examen}</p>
                  <p>Quatier : {eleve.quatier}</p>
                  <br />
                  <Link to='/EncadreurEleve' className="text-white bg-slate-600 hover:bg-slate-800 p-3 rounded-lg text-center">TABLEAU QUESTIONS</Link>
                </div>
              ))
            ) : (
              <p>Aucun élève connecté trouvé.</p>
            )}
          </div>

          {/* Poser une question */}
          <div className="bg-stone-200 shadow-md p-4">
            <h2>{editingQuestion ? "Modifier une question" : "Poser une question"}</h2>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Entrez votre question"
              className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 resize-none"
              disabled={isSubmitting}
            />
            <button
              onClick={ajouterQuestion}
              className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {isSubmitting
                ? "Envoi en cours..."
                : editingQuestion
                ? "Mettre à jour"
                : "Envoyer"}
            </button>
            {successMessage && (
              <div className="mt-4 text-green-600">{successMessage}</div>
            )}

            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="mt-4 p-2 border rounded bg-white"
              >
                <p>
                  <strong>Question :</strong> {notif.question}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => preparerEdition(notif)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => supprimerQuestion(notif.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauEleve;
            
              

