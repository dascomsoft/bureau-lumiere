import React from 'react';
import { Link } from 'react-router-dom';
import { EncadreurList } from '../components/EncadreurList';
import { Tabs } from '@medusajs/ui';
import '../styles/Encadreurs.css'
import { useEffect, useState } from 'react';

function ProfilEncadreur() {

  useEffect(() => {
    // Faire défiler vers le haut au chargement de la page
    window.scrollTo(0, 0);
  }, []);
  const allTeachers = Object.values(EncadreurList).flat();


  const [inscription, setInscription] = useState(true)


  const hideInscription = "hideInscription";
  const showInscription = "showInscription";

  const updateInscription = () => {
    setInscription(!inscription)
  }


  const update = () => {
    setInscription(true)
  }


  return (
    <div className='encadreur pt-[10rem] bg-stone-200'>
      <div className="container mx-auto px-4">
        <h2 className='text-2xl font-extrabold'>NOS ENCADREURS</h2>

        <Tabs defaultValue="all" className='pt-[5rem] pb-[10rem]'>
          <Tabs.List className='mb-[5rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
            <Tabs.Trigger value="all" className='border-2 border-stone-400 p-2'>TOUS LES ENCADREURS</Tabs.Trigger>
            <Tabs.Trigger value="math" className='border-2 border-stone-400 p-2'>Encadreurs Math</Tabs.Trigger>
            <Tabs.Trigger value="anglais" className='border-2 border-stone-400 p-2'> Encadreurs Anglais</Tabs.Trigger>
            <Tabs.Trigger value="francais" className='border-2 border-stone-400 p-2'> Encadreurs Francais</Tabs.Trigger>
            <Tabs.Trigger value="biologie" className='border-2 border-stone-400 p-2'> Encadreurs Biologie</Tabs.Trigger>
            <Tabs.Trigger value="physique" className='border-2 border-stone-400 p-2'> Encadreurs Phy/Chi</Tabs.Trigger>
            <Tabs.Trigger value="comptabilite" className='border-2 border-stone-400 p-2'> Encadreurs Compta</Tabs.Trigger>
            <Tabs.Trigger value="maconnerie" className='border-2 border-stone-400 p-2'> Encadreurs Maconnerie</Tabs.Trigger>
            <Tabs.Trigger value="ih" className='border-2 border-stone-400 p-2'> Encadreurs IH</Tabs.Trigger>
            <Tabs.Trigger value="informatique" className='border-2 border-stone-400 p-2'> Encadreurs Info</Tabs.Trigger>
            <Tabs.Trigger value="electricite" className='border-2 border-stone-400 p-2'> Encadreurs Elec</Tabs.Trigger>
            <Tabs.Trigger value="gk" className='border-2 border-stone-400 p-2'> Encadreurs GK</Tabs.Trigger>
            <Tabs.Trigger value="allemand" className='border-2 border-stone-400 p-2'> Encadreurs All/Phy</Tabs.Trigger>
          </Tabs.List>

          {/* Panel for All Teachers */}
          <Tabs.Content value="all" className='allTeachers grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {allTeachers.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>

          {/* Panel for Math Teachers */}
          <Tabs.Content value="math" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.mathematique.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`}  className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}

          </Tabs.Content>
          <Tabs.Content value="anglais" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.anglais.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`}  className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="biologie" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.biologie.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="francais" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.francais.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />

                  {/*to={`/profile/${teacher.id}`}  */}

                  <Link  to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="physique" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.physique.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="comptabilite" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.comptabilite.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`}  className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="maconnerie" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.maconnerie.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="ih" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.ih.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="informatique" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.informatique.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="electricite" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.electricite.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="gk" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.gk.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`}  className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value="allemand" className='grid  md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {EncadreurList.allemand.map((teacher, index) => (
              <div key={index} className="teacher shadow-xl p-4">
                <img src={teacher.image} alt="" />
                <div className='pt-7'>
                  <h3 className='font-extrabold text-xl'>{teacher.name}</h3>
                  <p>{teacher.description}</p>
                  <br />
                  <Link to={`/Profile/${teacher.id}`} className='px-10 py-2 rounded-full bg-stone-300 text-black'>Voir le profil</Link>
                </div>
              </div>
            ))}
          </Tabs.Content>
        </Tabs>
      </div>
      {/* <div id={inscription ? hideInscription : showInscription}>
        <div className="detail bg-white p-[2rem] rounded-md gap-4 ">
          <h1 className='font-extrabold text-xl'>Vous n'êtes pas connecté</h1>
          <p className="mt-2">Veillez vous connecter avant d'effectuer cette action</p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Link onClick={update} to='/Login' className='bg-red-600 text-white px-5 py-2 rounded-full'>Connexion</Link>
            <Link onClick={update} to='/' className='bg-slate-950 text-white px-5 py-2 rounded-full'>Close</Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ProfilEncadreur;
