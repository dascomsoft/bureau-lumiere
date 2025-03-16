import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/Home.css'
import pray from '../assets/pray.webp'
import motivation from '../assets/motivation.webp'
import school from '../assets/school.webp'
import bu from '../assets/bu.jpg'
import bu1 from '../assets/bu1.jpg'
import bu2 from '../assets/bu2.jpg'
import bu3 from '../assets/bu3.jpg'
import bu5 from '../assets/bu5.jpg'
import bu6 from '../assets/bu6.jpg'
import bu19 from '../assets/bu19.jpg'
import bu0 from '../assets/bu0.jpg'
import bu42 from '../assets/bu42.jpg'
import bu40 from '../assets/bu40.jpg'
import bu45 from '../assets/bu45.jpg'
import bu46 from '../assets/bu46.jpg'
import pro from '../assets/pro.jpg'
import bu53 from '../assets/bu53.jpg'




function Home() {
  useEffect(() => {
    // Faire défiler vers le haut au chargement de la page
    window.scrollTo(0, 0);
}, []);

  return (
    <div className="home">
      <div className="hero-content  text-white text-2xl flex justify-center items-center pt-[6rem] pb-[5rem]">
        <div className="container mx-auto px-4">
          <h2 className='text-5xl font-extrabold py-[2rem]'>Bienvenue a Lumière Sante & Vie<br /> Commission d'Étude</h2>
          <p className='py-[1rem]'>"Accompagner chaque élève vers l'excellence avec des cours de soutien <br /> personnalisés pour réussir les examens."</p>
          <p>"Au sein de la Commission Étude, nous visons à approfondir les connaissances de nos apprenants, en alliant savoir académique et éclairage spirituel. Chaque session d’étude est une opportunité d'élargir nos horizons intellectuels tout en restant ancrés dans les valeurs de foi, de recherche de vérité et de sagesse divine."</p>
          <br /><br />
          <Link to="/blog" className=' bg-yellow-300 hover:bg-white hover:text-black text-black px-12 py-3 rounded-full'>En Savoir Plus</Link>
        </div>
      </div>
      <div className="devise-section py-[4rem] bg-stone-200">
        <div className="container mx-auto px-4">
          <h1 className='font-extrabold text-5xl mb-[4rem]'>Notre Device</h1>
          <div className="device-content grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="shadow-lg p-4 ">
              <svg width="80px" height="80px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z" /></svg>
              <div>
                <h1 className='font-bold text-2xl mt-2'>Études</h1>
                <p className='mt-4'>La connaissance éclaire notre chemin et renforce notre compréhension du monde. Par l'étude, nous cherchons à enrichir nos esprits et à approfondir notre foi, dans une quête de vérité et de sagesse.</p>
              </div>
            </div>
            <div className="shadow-lg p-4">
              <svg width="80px" height="80px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 15 3 C 13.355469 3 12 4.355469 12 6 L 12.015625 5.835938 L 11.03125 11.746094 L 9.140625 16.917969 C 9.105469 16.964844 9.0625 17 9 17 L 8 17 L 8 16 L 3 16 L 3 29 L 8 29 L 8 26 L 11.925781 26 C 13.570313 26 15.050781 25.203125 16 23.964844 C 16.949219 25.203125 18.429688 26 20.074219 26 L 24 26 L 24 29 L 29 29 L 29 16 L 24 16 L 24 17 L 23 17 C 22.9375 17 22.894531 16.964844 22.859375 16.917969 L 20.96875 11.746094 L 19.984375 5.835938 L 20 6 C 20 4.355469 18.644531 3 17 3 C 16.660156 3 16.3125 3.066406 16 3.226563 C 15.6875 3.066406 15.339844 3 15 3 Z M 14.964844 5.015625 C 14.984375 5.160156 15 5.488281 15 6 L 15 21.4375 C 14.722656 22.921875 13.445313 24 11.925781 24 L 8 24 L 8 19 L 9 19 C 9.785156 19 10.515625 18.574219 10.902344 17.890625 L 10.941406 17.816406 L 12.96875 12.253906 L 14 6.082031 L 14 6 C 14 5.449219 14.421875 5.035156 14.964844 5.015625 Z M 17.035156 5.015625 C 17.578125 5.035156 18 5.449219 18 6 L 18 6.082031 L 19.03125 12.253906 L 21.058594 17.816406 L 21.097656 17.890625 C 21.484375 18.574219 22.214844 19 23 19 L 24 19 L 24 24 L 20.074219 24 C 18.554688 24 17.277344 22.921875 17 21.4375 L 17 6 C 17 5.488281 17.015625 5.160156 17.035156 5.015625 Z M 5 18 L 6 18 L 6 27 L 5 27 Z M 26 18 L 27 18 L 27 27 L 26 27 Z" /></svg>
              <div>
                <h1 className='font-bold text-2xl mt-2'>Prière</h1>
                <p className='mt-4'>La prière nous unit à Dieu et nourrit notre esprit. Elle est une source de force intérieure qui nous permet de puiser dans la grâce divine, apportant paix et guidance à notre quotidien.</p>
              </div>
            </div>
            <div className="shadow-lg p-4">
              <svg width="80px" height="80px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M49.725 16.293c-.027.27-.043.578-.05.912l-3.834 1.831c-.537-.088-3.2.067-7.172-1.893c-1.007-.497-1.991-.761-2.936-.761a5.41 5.41 0 0 0-2.459.595c-1.003-.217-2.448-.773-3.293-.771c-1.912.01-6.259 1.567-7.463 1.7c-1.178.129-2.391.453-3.612.969c-2.219-.646-5.001-1.701-6.491-2.284L2 9v24.41l7.654 3.642c.111-.13.238-.33.376-.578l.237.11c.116.3.244.599.384.896c-.84 1.414-.94 3.007-.269 4.392c.575 1.185 1.646 2.017 2.839 2.25c.065.738.313 1.452.731 2.071c.75 1.107 1.942 1.768 3.191 1.768c.113 0 .226-.005.338-.018c.178.481.439.929.778 1.317c.754.867 1.81 1.364 2.896 1.364c.08 0 .158-.002.237-.008c.138.524.373 1.02.701 1.462c.755 1.02 1.92 1.627 3.118 1.627c.744 0 1.455-.228 2.082-.655c1.212.778 2.266 1.325 3.201 1.661c.469.191.957.289 1.455.289c1.178 0 2.321-.55 3.137-1.512c.303-.358.549-.758.729-1.186a3.78 3.78 0 0 0 1.087.162c1.252 0 2.439-.613 3.26-1.685a4.715 4.715 0 0 0 .83-1.711c.086.006.171.009.256.009c1.447 0 2.832-.849 3.611-2.216a4.735 4.735 0 0 0 .629-2.336c1.43-.213 2.689-1.23 3.302-2.713c.604-1.461.44-3.073-.403-4.417l3.895-2.195c.1.342.198.657.293.913L62 31.098V10.642l-12.275 5.651m-.001 3.037c.062 1.082.175 2.305.321 3.582c-.8-1.344-1.81-1.957-3.064-2.262l2.743-1.32m-5.228 23.756c-2.148-.739-6.619-5.995-6.619-5.995h.088c.455-.032 1.438-.511 2.541-.282c-1.732-1.488-3.637-.229-4.934-1c.301.965 1.748 1.269 2.119 1.281l4.284 4.982c1.94 2.255.589 5.045-1.356 5.489c-1.305-.635-4.99-5.018-4.99-5.018c.126-.023.873-.257 1.634-.157c-1.757-1.314-3.749-.174-4.931-.999c.67 1.655 2.877 1.231 3.108 1.191l2.292 2.926c1.834 2.34.393 5.043-1.555 5.409c-1.727-.607-2.848-2.767-2.848-2.767c.174-.028.756-.287 1.584-.167c-1.473-1.291-3.188-.12-4.219-.855c.637 1.388 2.225 1.072 2.314 1.062c1.588 2.501-.059 5.109-2.027 5.187h-.002l-.002.001c-1.182-.205-2.42-1.15-3.818-2.12c.48-.532.904-1.467.904-1.467c1.404-2.542-.418-4.79-2.299-4.597c1.526.417 2.67 2.365 1.479 4.528l-.523.88c-.568 1.035-1.455 1.66-2.107 1.583c-1.004-.122-2.419-1.588-1.824-3.656c.23-.21 2.448-3.603 2.448-3.603c1.525-2.456-.187-4.807-2.073-4.727c1.502.507 2.555 2.521 1.26 4.611l-1.803 2.811c-.615.994-1.411 1.557-2.17 1.453c-1.178-.16-2.004-1.597-1.815-3.08c-.01.009 1.298-1.454 1.298-1.454c1.738-2.271.25-4.807-1.633-4.94c1.447.674 2.309 2.798.832 4.731l-.638.782c-.7.918-1.543 1.385-2.281 1.201c-1.288-.323-1.958-2.733-1.349-3.39c.479-.517 1.824-2.154 1.824-2.154c1.737-2.272.251-4.807-1.634-4.942c1.448.676 2.31 2.8.833 4.734l-.638.78c-.704.926-1.55 1.391-2.293 1.202c-1.548-.392-2.321-2.782-.84-4.722c0 0-.503-1.598-.73-2.281l-.746-.346c1.749-4.075 4.391-13.069 4.513-16.057c1.288.459 4.688 1.437 5.049 1.439l-.002.002c3.66-1.15 7.496-1.023 9.246-1.699c.567-.216 1.695-.23 2.891.454c-.747.655-1.453 1.435-2.186 2.162c-1.752 1.739-8.266 4.451-7.01 7.303c1.084 2.461 4.137 4.979 9.258 1.026l2.88-.396l4.479 2.21l5.74 5.895c2.047 2.098.888 4.946-1.003 5.556m1.44-6.495c-.658-1.23-2.709-3.247-4.645-4.896l-.012-.012c.893.036 1.83-1.402 3.041-1.513c-.846-.646-2.248.1-2.685.218c-2.409.648-6.153-2.383-6.153-2.383l-3.582.516s-4.26 5.199-7.849.916c-1.949-2.326 5.114-5.364 6.854-7.093c2.229-2.215 4.215-4.925 7.882-3.079c3.046 1.536 4.246 1.441 8.332 2.152c1.218.213 2.062.771 2.967 1.86c.426 3.584 1.115 7.559 1.776 10.325c-.341.287-3.264 2.253-5.926 2.989" fill="#000000"></path></svg>
              <div>
                <h1 className='font-bold text-2xl mt-2'>Partage</h1>
                <p className='mt-4'>Le partage incarne la générosité et l'unité au sein de notre communauté. En donnant de nous-mêmes, nous créons des liens solides et contribuons à un environnement fondé sur l'amour et la solidarité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="staff-section py-[3rem]">
        <div className="container mx-auto px-4">
          <h1 className='font-extrabold text-3xl mb-[4rem] text-center'>Bureau De La Commission Etude De <br /> Lumiere Sante & Vie(Annee 2024/2025)</h1>
          <div className="mb-[100px] p-6 flex items-center flex-col">
            <img src={pro} id="proImage" alt="" />
            <div className='text-center mt-10'>
              <h1 className='font-bold text-xl py-2'>Prophétesse Maman Marie Lumiere</h1>
              <h2 className='font-semibold'>Marraine de la commission étude</h2>
            </div>
          </div>
          <div className="staff-content grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu0} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Nde Olivier</h1>
                <h2 className='font-semibold'>President de la commission étude</h2>
                <p className='mt-2'>Encadreur de fabrication Mécanique et matieres professionnels</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu1} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mme Jiotsop Maide Cristel</h1>
                <h2 className='font-semibold'>Vice-presidente de la commission étude</h2>
                <p>Encadreur de Mathematiques</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu2} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Papgo Talla Kevin</h1>
                <h2 className='font-semibold'>Censeur/Adjoint de la commission étude</h2>
                <p>Encadreur en classe de CLASS 6 (General Knowledge)</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu3} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Kamdem  Talla Romaric</h1>
                <h2 className='font-semibold'>Surveillant General/Adjoint de la commission étude</h2>
                <p>Encadreur en classe de CLASS 6 (Mathematiques)</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col ">
              <img src={bu5} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Boyogueno Hyppolite</h1>
                <h2 className='font-semibold'>Intendamt/Adjoint de la commission étude</h2>
                <p>Encadreur de SVT/MATH en classes de 1ere et Terminale</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu6} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Boutchouang Nzalli Ravel</h1>
                <h2 className='font-semibold'>Secretaire General de la commission étude</h2>
                <p>Encadreur de Math/Physiques/Chimie en classes de 1ere et Terminale</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu19} alt="" />
              < div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mme Makamte Melissa</h1>
                <h2 className='font-semibold'>Tresoriere de la commission étude</h2>
                <p>Encadreur de comptalibite classes de 1ere et terminale</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu53} alt="" />
              < div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mme Niof Beyokol Blanche Oceane </h1>
                <h2 className='font-semibold'>Commissaire aux comptes de la commission étude</h2>
                <p>Encadreur de la matiere IH(Insdustrie d'habillement) en classes de 1ere et terminale</p>
              </div>
            </div>
            <div className="shadow-lg p-6 flex items-center flex-col">
              <img src={bu} alt="" />
              <div className='text-center'>
                <h1 className='font-bold text-xl py-2'>Mr Tchapda Tankeu Juste</h1>
                <h2 className='font-semibold'>Censeur de la commission étude</h2>
                <p>Encadreur de matieres professionnels(Maconnerie)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="impact-section py-[3rem]">
        <div className="container mx-auto px-4">
          <h1 className='font-bold text-5xl py-2'>L'impact positif des cours de soutien <br /> sur les enfants</h1>
          <p>Lumiere Sante & vie - Commission Étude s'engage à offrir plus que de simples leçons aux enfants qui participent à nos cours de soutien. <br /> Voici comment ces cours contribuent à leur bien-être général :</p>
          
          <div className="impact-content mt-[5rem] grid md:grid-cols-2 gap-[5rem]">
           
            <div className="impact-detail grid md:grid-cols-1 gap-5  p-5 shadow-xl">
              <div>
                <h2 className='font-bold text-3xl py-2'>La prière comme fondement spirituel</h2>
                <p>Ce qui distingue nos cours de soutien des autres, c'est l'importance accordée à la prière. Avant chaque session, les enfants se rassemblent pour un moment de prière collectif, une pratique unique qui nourrit leur âme et renforce leur connexion spirituelle. Cela permet non seulement de commencer les cours avec calme et sérénité, mais aussi d'apporter un soutien moral et une guidance qui favorisent la concentration et la réussite. La prière établit une atmosphère de confiance et d'harmonie, offrant aux enfants un environnement où ils se sentent en sécurité, inspirés et soutenus, tant sur le plan académique que spirituel.</p>
              </div>
              <img src={pray} alt="" className='rounded-2xl' />
            </div>

            <div className="impact-detail grid md:grid-cols-1 gap-5  p-5 shadow-xl">
              <img src={bu45} alt="" className='rounded-2xl' />
              <div>
                <h2 className='font-bold text-3xl py-2'>Confiance en soi améliorée </h2>
                <p>En travaillant ensemble sur des projets ou en participant à des discussions constructives, les enfants apprennent à exprimer leurs idées, à écouter les autres, et à développer des compétences de gestion des conflits. Ce sont des compétences essentielles qui les accompagneront tout au long de leur vie, aussi bien dans leur parcours scolaire que dans leurs relations personnelles et professionnelles.</p>
                <p> Les cours de soutien, en plus de leur dimension spirituelle, aident les enfants à surmonter leurs difficultés scolaires en renforçant leur confiance en eux-mêmes. Chaque progrès leur donne la force d'avancer, augmentant leur motivation et leur estime de soi.</p>
              </div>
            </div>
           
            <div className="impact-detail grid md:grid-cols-1 gap-5 p-5 shadow-xl">
              <div>
                <h2 className='font-bold text-3xl py-2'>Amélioration des performances scolaires </h2>
                <p>Avec un soutien régulier, les élèves constatent une amélioration de leurs résultats scolaires. Cette réussite leur procure un sentiment de satisfaction et une plus grande estime de soi.</p>
                <p>À travers la prière et les moments de partage, les enfants développent un fort sentiment d'appartenance et de soutien mutuel. Cela contribue à leur bien-être émotionnel et les aide à développer des valeurs de respect, de solidarité et de persévérance.</p>
              </div>
              <img src={bu42} alt="" className='rounded-2xl' />
            </div>
           
            <div className="impact-detail grid md:grid-cols-1 gap-5  p-5 shadow-xl">
              <img src={bu40} alt="" className='rounded-2xl' />
              <div>
                <h2 className='font-bold text-3xl py-2'>Interaction sociale </h2>
                <p>Les cours de soutien en groupe permettent aux enfants de socialiser avec leurs pairs. Ils peuvent échanger des idées, travailler en équipe et développer leurs compétences en communication, créant ainsi un environnement joyeux et stimulant.</p>
                <br />
                <h2 className='font-bold text-3xl py-2'>Soutien émotionnel </h2>
                <p>Nos enseignants offrent non seulement un soutien académique, mais aussi émotionnel. Les encouragements qu'ils reçoivent contribuent à réduire l'anxiété liée à l'école et à favoriser une attitude positive envers l'apprentissage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blog-section py-[5rem]">
        <div class="container mx-auto px-4">
          <div class="blog-header text-center py-[2rem]">
            <h3 class="font-extrabold text-4xl">NOS DIFFERENTS BLOGS</h3>
            <p className='py-[1rem] text-2xl'>Maximiser le Potentiel de Chaque Élève avec le Soutien Académique!</p>
          </div>
          <div class="blog-container mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div class="blog-content shadow-xl">
              <img src={motivation} alt="" />
              <div class="blog-detail mt-3 p-7">
                <div class="icons flex justify-between">
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                        fill="blue">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z" />
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">15 Sept 2024</span>
                  </div>
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="icomoon-ignore"></g>
                        <path
                          d="M21.331 10.669v-7.997h-18.659v14.394h7.997v7.997h11.063l4.265 4.264h0.665v-4.264h2.666v-14.394h-7.997zM3.738 16v-12.262h16.527v6.931h-9.596v5.331h-6.931zM28.262 23.997h-2.666v3.422l-3.423-3.422h-10.439v-12.262h16.527v12.262z"
                          fill="blue"></path>
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">30 comments</span>
                  </div>
                </div>
                <h4 class="font-bold text-xl mt-4">Maximiser le Potentiel de Chaque Élève avec le Soutien Académique</h4>
                <p className='py-[1.2rem]'>L'éducation ne se limite pas aux heures passées en classe. Chez Bureau Lumière & Commission Étude, nous croyons que chaque élève mérite un accompagnement personnalisé pour atteindre son plein potentiel.</p>
                <Link to='/blog2' className='px-7 py-2 bg-black text-white'>En savoir plus</Link>
              </div>
            </div>
            <div class="blog-content shadow-xl">
              <img src={school} alt="" />
              <div class="blog-detail mt-3 p-7">
                <div class="icons flex justify-between">
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                        fill="blue">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z" />
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">22 Septembre 2024</span>
                  </div>
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="icomoon-ignore"></g>
                        <path
                          d="M21.331 10.669v-7.997h-18.659v14.394h7.997v7.997h11.063l4.265 4.264h0.665v-4.264h2.666v-14.394h-7.997zM3.738 16v-12.262h16.527v6.931h-9.596v5.331h-6.931zM28.262 23.997h-2.666v3.422l-3.423-3.422h-10.439v-12.262h16.527v12.262z"
                          fill="blue"></path>
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">3 comments</span>
                  </div>
                </div>
                <h4 class="font-bold text-xl mt-4">Les Clés pour Une Bonne Organisation Scolaire</h4>
                <p className='py-[1.2rem]'>La clé de la réussite scolaire ne réside pas seulement dans les cours de soutien, mais aussi dans la capacité de chaque élève à s’organiser efficacement.</p>
                <br />
                <Link to='/blog3' className='px-7 py-2 bg-black text-white'>En savoir plus</Link>
              </div>
            </div>
            <div class="blog-content shadow-xl">
              <img src={bu46} alt="" />
              <div class="blog-detail mt-3 p-7">
                <div class="icons flex justify-between">
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                        fill="blue">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z" />
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">29 Septembre 2024</span>
                  </div>
                  <div class="flex items-center">
                    <span>
                      <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="icomoon-ignore"></g>
                        <path
                          d="M21.331 10.669v-7.997h-18.659v14.394h7.997v7.997h11.063l4.265 4.264h0.665v-4.264h2.666v-14.394h-7.997zM3.738 16v-12.262h16.527v6.931h-9.596v5.331h-6.931zM28.262 23.997h-2.666v3.422l-3.423-3.422h-10.439v-12.262h16.527v12.262z"
                          fill="blue"></path>
                      </svg>
                    </span>
                    <span class="ms-2 mt-1">45 comments</span>
                  </div>
                </div>
                <h4 class="font-bold text-xl mt-4">Comment Nos Activités Renforcent l'Épanouissement Personnel</h4>
                <p className='py-[1.2rem]'>L’apprentissage ne se fait pas uniquement avec des livres et des exercices. Chez Bureau Lumière & Commission Étude, nous avons intégré des activités extrascolaires qui complètent l’expérience d’apprentissage des élèves en renforçant leur développement personnel.</p>
                <Link to='/blog1' className='px-7 py-2 bg-black text-white'>En savoir plus</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-notification py-[7rem]">
        <div className="container mx-auto px-4">
          <h1 className='text-3xl font-extrabold text-white'>Bureau Lumière & Commission Étude</h1>
          <p className='py-[1rem] text-white font-semibold'>Un environnement idéal pour l'épanouissement académique et spirituel de vos enfants. <br /> Offrez-leur un suivi personnalisé qui les prépare pour un avenir brillant, tout en nourrissant leur esprit et leur savoir.</p>
          <br />
          <Link to="/encadreurs" className='px-12 py-3 bg-white text-black rounded-full'>En savoir plus</Link>
        </div>
      </div>
    </div>
  )
}

export default Home