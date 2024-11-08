import React from 'react'
import bu46 from '../assets/bu46.jpg'
import { useEffect } from 'react';

function Blog1() {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className='main-blog1 bg-stone-300 pb-[4rem]'>
      <div className='container mx-auto px-4'>
        <div className='pt-[10rem]'>
          <h1 className='text-3xl font-extrabold pb-[4rem]'>Comment Nos Activités Renforcent l'Épanouissement Personnel</h1>
          <img src={bu46} alt="" className='w-full'/>
        </div>
        <div className='mt-10'>
          <p>Au Bureau Lumière & Commission Étude, nous croyons que l'épanouissement personnel est essentiel pour le développement global de chaque enfant. Nos activités sont soigneusement conçues pour favoriser la confiance en soi, la curiosité intellectuelle, et les compétences sociales. À travers des ateliers créatifs, des sessions de réflexion spirituelle, et des exercices de coopération, nous permettons aux enfants de découvrir leurs talents uniques, de cultiver leur autonomie, et de s'ouvrir aux autres. Cette approche holistique favorise non seulement la réussite scolaire, mais aussi l'émergence de jeunes adultes équilibrés et bien dans leur peau, prêts à relever les défis de demain avec résilience et détermination.</p>
        </div>
        <div className='mt-10'>
          <p>De plus, notre programme intègre des activités de communication et de résolution de problèmes, afin de renforcer l'esprit d'équipe et l'écoute active. En travaillant ensemble sur des projets ou en participant à des discussions constructives, les enfants apprennent à exprimer leurs idées, à écouter les autres, et à développer des compétences de gestion des conflits. Ce sont des compétences essentielles qui les accompagneront tout au long de leur vie, aussi bien dans leur parcours scolaire que dans leurs relations personnelles et professionnelles.</p>
        </div>
        <div className='mt-10'>
          <p>Enfin, nous organisons des sorties éducatives et culturelles pour exposer les enfants à de nouveaux environnements et encourager leur ouverture d’esprit. Ces expériences en dehors de la salle de classe leur permettent d’explorer différentes perspectives, d’acquérir de nouvelles connaissances, et de se sentir connectés à leur culture et à leur communauté. Grâce à ces activités, les enfants développent un sentiment d’appartenance et de responsabilité envers leur environnement, renforçant ainsi leur confiance et leur bien-être global.</p>
        </div>
      </div>
    </div>
  )
}

export default Blog1