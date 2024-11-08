import { useParams } from 'react-router-dom';
import { EncadreurList } from '../components/EncadreurList';
import '../styles/Profile.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
     const[openContact , setOpenContact] = useState(true)


    const hide = "hide";
    const show = "show";

      const updateButton = ()=>{
        setOpenContact(!openContact)
      }

    const { id } = useParams();
    const teacher = Object.values(EncadreurList)
        .flat()
        .find(teacher => teacher.id === parseInt(id));

   

    if (!teacher) {
        return <div>Enseignant non trouvé</div>;
    }

    return (
        <div className=''>
            <div className='profile-container bg-stone-300 pt-[10rem] pb-[5rem]'>
                <div className="container mx-auto px-4">
                    <div className="profile-content grid md:grid-cols-2 gap-10 shadow-lg p-7">
                        <div>
                            <img src={teacher.image} alt="" />
                            <div className='mt-10'>
                                <p className='font-extrabold text-3xl'>{teacher.name}</p>
                                <p>Matiere d'enseignement : {teacher.subject}</p>
                                <p>{teacher.description}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-extrabold text-3xl'>Fonction : {teacher.occupation}</h1>
                            <p className='mt-5'>{teacher.fonction}</p>
                            <br />
                            <div>
                                <h1 className='font-extrabold text-3xl'>Contacter</h1>
                                <p>Pour tous autres besions particuliers ou cours de repetition a domicile veuillez contacter l'enseignant en cliquant sur le bouton ci-dessous</p>
                            </div>
                            <br />
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Link to="/encadreurs" className='px-10 py-2 rounded-full bg-stone-400 text-white shadow-md text-center'>Retour</Link>
                                <button onClick={updateButton}  className='px-10 py-2 rounded-full bg-stone-400 text-white shadow-md text-center '>Contact</button>
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
            <div id={openContact ? hide : show}>
                <div className="detail bg-white p-10 rounded-md ">
                    <h1 className='font-extrabold text-xl'>contact</h1>
                    <p><span className='text-red-600 font-semibold'>Telephone</span> : {teacher.phone}</p>
                    <br />
                    <Link to='/encadreurs' className='bg-red-600 text-white px-5 py-2 rounded-full'>Retour</Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
