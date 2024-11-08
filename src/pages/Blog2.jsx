import React from 'react'
import motivation from '../assets/motivation.webp'
import { useEffect } from 'react';

const Blog2 = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='main-blog2 bg-stone-300 pb-[4rem]'>
            <div className='container mx-auto px-4'>
                <div className='pt-[10rem]'>
                    <h1 className='text-3xl font-extrabold pb-[4rem]'>Maximiser le Potentiel de Chaque Élève avec le Soutien Académique</h1>
                    <img src={motivation} alt="" className='w-full' />
                </div>
                <div>
                    <p className='mt-10'>Au Bureau Lumière & Commission Étude, notre mission est de révéler et de développer le potentiel de chaque élève. Nous savons que chaque enfant a des compétences, des intérêts, et un rythme d’apprentissage unique. Nos séances de soutien académique sont personnalisées afin de répondre aux besoins spécifiques de chaque élève, qu'il s'agisse de renforcer les bases dans une matière particulière, de combler des lacunes, ou d’approfondir ses connaissances. En offrant un suivi individualisé, nous permettons aux élèves de progresser à leur propre rythme, tout en les encourageant à surmonter les difficultés et à explorer de nouvelles idées.</p>
                </div>
                <div>
                    <p className='mt-10'>Nos séances de soutien ne se limitent pas seulement à l’aide aux devoirs ; elles visent également à développer des méthodes d’apprentissage efficaces. Nous enseignons aux élèves des stratégies pour mieux organiser leur travail, améliorer leur mémoire, et renforcer leurs compétences en résolution de problèmes. Ces outils leur donnent une autonomie précieuse, augmentant leur confiance et leur capacité à réussir dans leurs études, même après avoir quitté notre programme de soutien.</p>
                </div>
                <div>
                    <p className='mt-10'>En plus des matières académiques, nous mettons un accent particulier sur le développement des compétences de vie, telles que la gestion du temps et la prise de décision. Ces compétences sont essentielles pour préparer les élèves à affronter les défis de leur parcours scolaire et au-delà. En intégrant des activités pratiques et des exercices de réflexion, nous encourageons les élèves à prendre des initiatives et à adopter une approche proactive de leur éducation. Ce développement holistique vise à les préparer pour un avenir où ils pourront utiliser leurs capacités au maximum.</p>
                </div>
                <div>
                    <p className='mt-10'>Enfin, le soutien académique est aussi un espace de motivation et d’encouragement. Nos enseignants et encadreurs jouent un rôle de mentor en aidant chaque élève à rester motivé et déterminé, même en cas de difficultés. Nous favorisons un environnement d’apprentissage positif et stimulant, où chaque succès, petit ou grand, est reconnu et célébré. Cette atmosphère bienveillante aide les élèves à persévérer et à se dépasser, tout en cultivant leur passion pour l’apprentissage et leur envie de réussir.</p>
                </div>
            </div>
        </div>
    )
}

export default Blog2