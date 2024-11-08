import React from 'react'
import { useEffect } from 'react'
import '../styles/blog.css'
import { Link } from 'react-router-dom'
import picture from '../assets/timetable.jpg'
import pray from '../assets/pray.webp'


function Blog() {

  useEffect(() => {
    // Faire défiler vers le haut au chargement de la page
    window.scrollTo(0, 0);
}, []);
  return (
    <div className='blog-wrapper mb-10'>
      <div className="hero-container  text-white text-2xl flex justify-center items-center py-[9rem]">
        <div className="container mx-auto px-4">
          <h2 className='text-5xl font-extrabold py-[2rem]'>Bienvenue sur le Blog du Bureau Lumière & <br /> Commission Étude </h2>
          <p className='mb-[3rem]'>Retrouvez ici des conseils, des idées et des ressources pour accompagner vos enfants vers la réussite académique et personnelle. Ce blog est un lieu d’inspiration pour tous ceux qui souhaitent contribuer à l’épanouissement scolaire et spirituel de nos jeunes.</p>
          <Link to="/contact" className=' bg-yellow-300 hover:bg-white hover:text-black text-black px-12 py-3 rounded-full'>En Savoir Plus</Link>
        </div>
      </div>
      <div className="blog-content pt-[5rem] pb-[5rem] bg-stone-300">
        <div className="container mx-auto px-4">
          <h1 className='font-extrabold text-[3em] pt-[1rem] pb-[4rem] text-red-600'>Organiser son emploi du temps</h1>
          <div className="blog-detail grid md:grid-cols-2 gap-10">
            <img src={picture} alt="emploi de temps picture" />
            <div>
              <h1 className='font-extrabold text-[2em]'>Un Emploi du Temps Bien Structuré pour un Bon Élève à la Maison</h1>
              <p>Pour être un élève discipliné et réussir dans toutes les dimensions de sa vie, il est essentiel de suivre un emploi du temps structuré, même à la maison. Cela implique de consacrer du temps à l’étude, à la prière, aux responsabilités familiales et à la détente. Présenter cet emploi du temps à ses parents renforce l’engagement et montre respect et responsabilité, car les parents sont les guides et les maîtres de la maison.</p>
            </div>
          </div>
          <div className="blog-explanation">
            <h1 className='font-extrabold text-3xl mt-10 text-red-600'>L'Importance de l'Emploi du Temps pour un Équilibre à la Maison</h1>
            <div>
              <h3 className='font-bold text-xl mt-3'>Responsabilité et Autodiscipline :</h3>
              <p>Un emploi du temps encourage l’élève à être organisé et à respecter ses engagements. En structurant ses journées, il apprend la valeur de la discipline, un atout fondamental pour son avenir.</p>
              <h3 className='font-bold text-xl mt-3'>Priorité à la Prière et au Développement Spirituel :</h3>
              <p>Prendre du temps pour la prière permet de débuter la journée avec calme et de nourrir l’esprit. Cela renforce la foi et procure la paix intérieure, offrant un équilibre face aux défis académiques et personnels.</p>
              <h3 className='font-bold text-xl mt-3'>Productivité et Concentration Améliorées :</h3>
              <p>En consacrant des créneaux spécifiques à l’étude et à la détente, l’élève peut se concentrer pleinement sur chaque tâche sans se sentir submergé. Cela augmente l’efficacité de l’apprentissage.</p>
              <h3 className='font-bold text-xl mt-3'>Harmonie Familiale :</h3>
              <p>En soumettant son emploi du temps aux parents, l’élève montre respect et responsabilité, rappelant qu’il est sous leur protection et leur direction. Cela crée une relation de confiance et renforce le soutien parental.</p>
            </div>
            <div>
              <h1 className='font-extrabold text-3xl mt-10 text-red-600'>Planifier son Emploi du Temps en Fonction des Matières Scolaires</h1>
              <p className='mt-3'>Organiser son emploi du temps selon les matières scolaires est essentiel pour maximiser l'apprentissage, consolider les connaissances et maintenir un bon équilibre d’étude. Une planification bien pensée aide l'élève à accorder du temps à chaque matière, en fonction de son niveau de difficulté, des objectifs personnels et des échéances de devoirs et d'examens.</p>
              <h1 className='font-bold text-2xl mt-5'>Étapes pour Planifier son Emploi du Temps par Matières</h1>
              <h2 className='font-bold mt-4 '>Évaluer les Matières et leurs Exigences :</h2>
              <p>1. Commencez par identifier les matières principales et secondaires. Par exemple, les matières principales comme les mathématiques, les sciences, et le français nécessitent souvent plus de temps d’étude.</p>
              <p>2. Réfléchissez aux matières qui demandent plus de pratique (comme les mathématiques ou les sciences) par rapport à celles qui demandent de la mémorisation (comme l’histoire ou la géographie).</p>
              <h2 className='font-bold mt-4'>Prioriser les Matières en Fonction des Objectifs et des Dates d’Échéance :</h2>
              <p>1. Classez les matières selon leur importance et les évaluations à venir. Si un examen ou un devoir approche, consacrez plus de temps à la préparation de cette matière.</p>
              <p>2. Définissez des objectifs hebdomadaires, par exemple : réussir à résoudre des problèmes mathématiques complexes, mémoriser un chapitre en histoire, ou améliorer ses compétences de rédaction en français.</p>
              <h2 className='font-bold mt-4'>Adapter son Emploi du Temps Selon les Résultats et les Besoins :</h2>
              <p>Après chaque évaluation, prenez le temps de revoir votre emploi du temps et d’ajuster les heures d’étude si nécessaire. Par exemple, si des difficultés sont constatées en anglais, envisagez de consacrer un peu plus de temps à cette matière.</p>
            </div>
            <div>
              <h1 className='font-extrabold text-3xl mt-10 text-red-600'>Exemple d'Emploi du Temps en Fonction des Matières</h1>
              <h3 className='font-bold text-xl mt-3'>Voici une suggestion d’emploi du temps hebdomadaire pour équilibrer l’étude des différentes matières scolaires :</h3>
            </div>
            <div className='grid md:grid-cols-3 gap-5 mt-5'>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Lundi:</h4>
                <p>. Mathématiques (45 min)</p>
                <p>. Français (30 min)</p>
                <p>. Histoire (20 min)</p>
              </div>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Mardi:</h4>
                <p>. Sciences (45 min) </p>
                <p>. Anglais (30 min)</p>
                <p>. Révision générale (20 min)</p>
              </div>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Mercredi:</h4>
                <p>. Physique/Chimie (40 min)</p>
                <p>. Mathématiques (30 min)</p>
                <p>. Géographie (20 min)</p>
              </div>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Jeudi:</h4>
                <p>. Sciences (45 min) </p>
                <p>. Français - Lecture et rédaction (45 min)</p>
                <p>. Histoire ou culture générale (15 min)</p>
              </div>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Vendredi:</h4>
                <p>. Mathématiques (30 min)</p>
                <p>. Anglais - Vocabulaire et exercices (45 min)</p>
                <p>. Révision générale (20 min)</p>
              </div>
              <div className='shadow-lg p-6'>
                <h4 className='font-bold text-xl'>Samedi:</h4>
                <p>. Révision complète (1 heure) : Revoir les notions apprises durant la semaine et préparer les devoirs à remettre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className='pt-[1rem]'>
          <h1 className='text-3xl font-extrabold py-[4rem]'>L'impact spirituel et émotionnel des cours de soutien à Bureau Lumière & Commission Étude</h1>
          <img src={pray} alt="" className='w-full h-[30rem] object-cover' />
        </div>
        <div className='mt-10'>
          <h1 className='text-3xl font-extrabold pb-3'>1. La prière comme fondement spirituel : </h1>
          <p>Ce qui distingue nos cours de soutien des autres, c'est l'importance accordée à la prière. Avant chaque session, les enfants se rassemblent pour un moment de prière collectif, une pratique unique qui nourrit leur âme et renforce leur connexion spirituelle. Cela permet non seulement de commencer les cours avec calme et sérénité, mais aussi d'apporter un soutien moral et une guidance qui favorisent la concentration et la réussite. La prière établit une atmosphère de confiance et d'harmonie, offrant aux enfants un environnement où ils se sentent en sécurité, inspirés et soutenus, tant sur le plan académique que spirituel.</p>
        </div>
        <div className='mt-10'>
          <h1 className='text-3xl font-extrabold pb-3'>2. Confiance en soi améliorée : </h1>
          <p>Les cours de soutien, en plus de leur dimension spirituelle, aident les enfants à surmonter leurs difficultés scolaires en renforçant leur confiance en eux-mêmes. Chaque progrès leur donne la force d'avancer, augmentant leur motivation et leur estime de soi.</p>
        </div>
        <div className='mt-10'>
         <h1 className='text-3xl font-extrabold pb-3'>3. Soutien émotionnel et communautaire : </h1>
         <p>À travers la prière et les moments de partage, les enfants développent un fort sentiment d'appartenance et de soutien mutuel. Cela contribue à leur bien-être émotionnel et les aide à développer des valeurs de respect, de solidarité et de persévérance.</p>
        </div>
        <div className='mt-10'>
          <h1 className='text-3xl font-extrabold pb-3'>CONCLUSION</h1>
          <p>En combinant les bienfaits spirituels et académiques, Bureau Lumière & Commission Étude offre un cadre unique où les enfants s'épanouissent, non seulement dans leurs études, mais aussi dans leur développement personnel et spirituel.</p>
        </div>
      </div>
    </div>
  )
}

export default Blog