import React from 'react'
import teach from '../assets/teach.png'
import { useEffect} from 'react';


const Blog3 = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='main-blog3 bg-stone-300 pb-[4rem]'>
            <div className='container mx-auto px-4'>
                <div className='pt-[10rem]'>
                    <h1 className='text-2xl font-extrabold pb-[3rem]'>Les Clés pour Une Bonne Organisation Scolaire</h1>
                    <img src={teach} alt="" className='w-full' />
                </div>
                <div>
                    <p className='mt-10'>La clé de la réussite scolaire ne réside pas seulement dans les cours de soutien, mais aussi dans la capacité de chaque élève à s’organiser efficacement. Chez Bureau Lumière & Commission Étude, nous aidons les élèves à développer des habitudes organisationnelles qui les accompagnent tout au long de leur scolarité.</p>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-bold mb-2'>1. L’importance de la planification</h1>
                    <p>Une bonne organisation commence par la planification des tâches et des devoirs. Encourager les élèves à utiliser un agenda ou une application pour noter les dates des examens, les échéances et les tâches à accomplir est une première étape vers une meilleure gestion du temps.</p>
                    <p className='font-bold text-xl mt-4 mb-2'>a. Astuces pour une organisation réussie :</p>
                    <ul>
                        <li><span className='font-bold'>** Diviser les tâches :</span> Apprenez aux élèves à diviser leurs devoirs en petites étapes, ce qui rend la tâche plus facile à gérer. </li>
                        <li><span className='font-bold'>** Éviter la procrastination :</span> Mettre en place des rappels et des objectifs quotidiens peut les aider à rester concentrés sur leurs tâches. </li>
                    </ul>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-bold mb-2'>2. Comment intégrer ces méthodes à nos cours de soutien ?</h1>
                    <p>Pendant nos sessions, nous apprenons aux enfants non seulement les matières scolaires, mais aussi comment planifier leurs révisions et organiser leur emploi du temps. Cette approche leur permet d’être plus autonomes.</p>
                </div>
                <div className='mt-10'>
                   <h1 className='text-2xl font-bold mb-2'>CONCLUSION</h1>
                   <p>Un élève bien organisé est un élève plus serein et performant. Grâce à nos cours de soutien et à nos conseils en gestion du temps, nous aidons chaque enfant à atteindre ses objectifs scolaires tout en gardant une bonne harmonie entre travail et détente.</p>
                </div>
            </div>
        </div>
    )
}

export default Blog3