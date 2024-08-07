import './project.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'

const Project = () => {

    const [data, setData] = useState([]);
    const [elementsAllImages, setElementsAllImages] = useState([]);

    const [allData, setAllData] = useState([]);
    const [archvizData, setArchvizData] = useState([]);
    const [exteriorData, setExteriorData] = useState([]);
    const [interiorData, setInteriorData] = useState([]);

    const [isActive, setIsActive] = useState('add');
    const [isActiveCategory, setIsActiveCategory] = useState('all');
    const [isOpenModal, setIsOpenModal] = useState('close');
    const [findId, setFindId] = useState(-1);


    useEffect(() => {
        (async() => {
            const allResponse = await fetch('https://test.itpoint.uz/api/project/?type=all'); 
            const dataAll = await allResponse.json();
            setAllData(dataAll)
            setData(dataAll);

            const interiorResponse = await fetch('https://test.itpoint.uz/api/project/?type=interior');
            const dataInterior = await interiorResponse.json();
            setInteriorData(dataInterior)

            const exteriorResponse = await fetch('https://test.itpoint.uz/api/project/?type=exterior');
            const dataExterior = await exteriorResponse.json();
            setExteriorData(dataExterior)

            const archvizResponse = await fetch('https://test.itpoint.uz/api/project/?type=archviz');
            const dataArchviz = await archvizResponse.json();
            setArchvizData(dataArchviz)
        })();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const endpoint = 'https://test.itpoint.uz/api/project/';
        const formData = new FormData(event.target);
        const elInput = event.target.firstChild.firstChild.lastChild
    
        formData.append('url', '');
        for(let item of elInput.files){
            formData.append("photos", item, item.name);
        }

        fetch(endpoint, {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) 
        .then(data => console.log(data))
        .catch(console.error);
    };

    const handleDelete = () => {
        fetch(`https://test.itpoint.uz/api/career/${findId}/`,{method: 'DELETE'})
        .then(response => {
            if(response.ok){
                window.location.reload();
            }
        })
    }

    const handleAllImages = async (id) => {
        const allImagesResponse = await fetch(`https://test.itpoint.uz/api/project/${id}/`, {
            headers:{
                'accept': 'application/json',
                'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
              } 
        });
        
        const dataAllImages = await allImagesResponse.json();
        const croppedData = await dataAllImages.photos

        setElementsAllImages(croppedData)
    }

  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>

            <button className={`category-button ${isActiveCategory == 'all' ? 'category-active':''}`} onClick={() => {setData(allData); setIsActiveCategory('all');}} >all</button>

            <button className={`category-button ${isActiveCategory == 'interior' ? 'category-active':''}`} onClick={() => {setData(interiorData); setIsActiveCategory('interior')}}>interior</button>

            <button className={`category-button ${isActiveCategory == 'exterior' ? 'category-active':''}`} onClick={() => {setData(exteriorData); setIsActiveCategory('exterior')}}>exterior</button>

            <button className={`category-button ${isActiveCategory == 'archviz' ? 'category-active':''}`} onClick={() => {setData(archvizData); setIsActiveCategory('archviz')}}>archviz</button>
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}>add</button>
                    {
                        data.map((item, idx) => {
                            const { cropped_photo, title, location, software, client, url, project_type, source_type, description, id} = item;
                       
                            return (
                                    <div className='career__item project-career__item' key={idx}>
                                        <img src={close} alt=""  className='close-icon' onClick={() => {setIsOpenModal('open'); setFindId(id)}}/>

                                        <img className='project__image' src={cropped_photo} alt="" onClick={() => {setIsOpenModal('openImages'); handleAllImages(id)}  }/>
                                        <div>
                                            <p><span>Location: </span>{location}</p>
                                            <p><span>Client: </span>{client}</p>
                                            <p><span>Title: </span>{title}</p>
                                            <p><span>Project type: </span>{project_type}</p>
                                            <p><span>Source type: </span>{source_type}</p>
                                            <p><span>Software: </span>{software}</p>
                                            <p><span>Description: </span>{description}</p>
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className='career' style={{display: isActive == 'back' ? 'block' : 'none' }}>
                <div className='container'>
                    <button className='career__button' onClick={() => setIsActive('add')}>back</button>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='inputs__wrapper' >
                            <label>
                                Uploading image:
                                <input type="file" accept="image/png, image/jpg, image/jpeg" multiple />
                            </label>

                            <label>
                                Description: 
                                <input type="text" name='description'/> 
                            </label>

                            <label>
                                Source type: 
                                <select name="type" >
                                    <option value="photo" defaultValue={'photo'}>photo</option>
                                    <option value="video">video</option>
                                </select>
                            </label>

                            <label >
                                Project type: 
                                <select name="type" >
                                    <option value="all" defaultValue={'all'}>all</option>
                                    <option value="exterior">exterior</option>
                                    <option value="interior">interior</option>
                                    <option value="archviz">archviz</option>
                                </select>
                            </label>

                            <label >
                                Client: 
                                <input type="text"  name='client'/> 
                            </label>

                            <label >
                                Software: 
                                <input type="text"  name='software'/> 
                            </label>

                            <label >
                                Location: 
                                <input type="text"  name='location'/> 
                            </label>

                            <label >
                                Title: 
                                <input type="text"  name='title'/> 
                            </label>
                        </div>
                        <button type='submit'>send</button>
                    </form>
                </div>
            </section> 

            <div className='modal' style={{display: isOpenModal == 'open' ? 'block' : 'none'}} onClick={() => setIsOpenModal('close')}>
                <div className='modal__wrapper'>
                    <p className='modal__text'>Do you want to delete?</p>
                    <button className='modal__ok'  onClick={() => {setIsOpenModal('close'); handleDelete()}}>ok</button>
                    <button className='modal__cancel' onClick={() => setIsOpenModal('close')}>cancel</button>
                </div>
            </div>

            <div className='modal' style={{display: isOpenModal == 'openImages' ? 'block' : 'none'}} onClick={() => setIsOpenModal('closeImages')}>
                <div className='modal__wrapper project_modal__wrapper'>
                    {
                                elementsAllImages.map(item => {
                                    return (
                                        <>
                                            <img className='modal-image' src={item.url} alt=""  key={item.id}/>
                                        </>
                                    )
                                })
                    }
                    <button className='modal__cancel' onClick={() => setIsOpenModal('closeImages')}>cancel</button>
                </div>
            </div>
            
         </>
         );
 
}
 
export default Project;