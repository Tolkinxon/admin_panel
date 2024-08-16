import './project.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'
import uuid from 'react-uuid';

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
    const [elementsData, setElementsData] = useState(0)
    const [arr, setArr] = useState([])

    const [type, setType] = useState('')

    
    useEffect(() => {
        (async() => {
            const allResponse = await fetch('https://test.itpoint.uz/api/project/?type=all'); 
            const dataAll = await allResponse.json();
            setAllData(dataAll)
            setData(dataAll);

            console.log(dataAll);
            

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

    
        formData.append('url', '');

        // for(let [key, value] of formData.entries()){
        //     console.log(key, ' ', value);
            
        // }

        fetch(endpoint, {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) 
        .then(data => window.location.reload())
        .catch(console.error);
    };

    const handleDelete = () => {

        if(type == 'projectItem') {
            fetch(`https://test.itpoint.uz/api/project/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    window.location.reload();
                }
            })
        }


        if(type == 'projectPhoto') {
            fetch(`https://test.itpoint.uz/api/photo/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    window.location.reload();
                }
            })
        }

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

    const deleteSecondaryImage = (e) => {
       let idx = arr.findIndex(item => item.props.children[0].props.id == e.target.id)
       arr.splice(idx, 1);
       setElementsData(prev => prev + 1)
    }

    const addSecondaryImage = () => {
        arr.push(
            <div key={uuid()}>
                <button type='button' id={uuid()} onClick={(e) => deleteSecondaryImage(e)}>delete</button>
                <label>
                    Secondary images:
                <input name='photos' type="file" accept="image/png, image/jpg, image/jpeg" required />
                </label>
            </div>
        )

        setElementsData(prev => prev + 1)
    }


        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>

            <button className={`category-button ${isActiveCategory == 'all' ? 'category-active':''}`} onClick={() => {setData(allData); setIsActiveCategory('all');}} >all</button>

            <button className={`category-button ${isActiveCategory == 'interior' ? 'category-active':''}`} onClick={() => {setData(interiorData); setIsActiveCategory('interior')}}>interior</button>

            <button className={`category-button ${isActiveCategory == 'exterior' ? 'category-active':''}`} onClick={() => {setData(exteriorData); setIsActiveCategory('exterior')}}>exterior</button>

            <button className={`category-button ${isActiveCategory == 'archviz' ? 'category-active':''}`} onClick={() => {setData(archvizData); setIsActiveCategory('archviz')}}>archviz</button>
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}>
                <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> 
                    add
                    </button>
                    {
                        data.map((item, idx) => {
                            const { cropped_photo, title, location, software, client, url, project_type, source_type, description, id} = item;
                       
                            return (
                                    <div className='career__item project-career__item' key={idx}>
                                        <img src={close} alt=""  className='close-icon' onClick={() => {setIsOpenModal('open'); setFindId(id); setType('projectItem')}}/>

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
                            <label id='mainImage'>
                                Main image:
                                <input  name='photos' type="file" accept="image/png, image/jpg, image/jpeg"  required/>
                            </label>

                            <button onClick={() => {addSecondaryImage()}} type='button'>add secondary images</button>

                            { arr.map(item => (item)) }

                            {/* <label>
                                Description: 
                                <input type="text" name='description'/> 
                            </label> */}

                            {/* <label>
                                Source type: 
                                <select name="source_type" >
                                    <option value="photo" defaultValue={'photo'}>photo</option>
                                    <option value="video">video</option>
                                </select>
                            </label> */}

                            {/* <label >
                                Project type: 
                                <select name="project_type" >
                                    <option value="exterior" defaultValue={'exterior'}>exterior</option>
                                    <option value="interior">interior</option>
                                    <option value="archviz">archviz</option>
                                </select>
                            </label> */}

                            {/* <label >
                                Client: 
                                <input type="text"  name='client'/> 
                            </label> */}

                            {/* <label >
                                Software: 
                                <input type="text"  name='software'/> 
                            </label> */}

                            {/* <label >
                                Location: 
                                <input type="text"  name='location'/> 
                            </label> */}

                            {/* <label >
                                Title: 
                                <input type="text"  name='title'/> 
                            </label> */}



                           


 
                            <div class="form-floating">
                                <input type="text" name='client' class="form-control"  id="floatingPassword" placeholder="Client" />
                                <label for="floatingPassword">Client</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='title' class="form-control"  id="floatingPassword" placeholder="Title" />
                                <label for="floatingPassword">Title</label>
                            </div> 

                            <div class="form-floating">
                                <input type="text" name='location' class="form-control"  id="floatingPassword" placeholder="Location" />
                                <label for="floatingPassword">Location</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='software' class="form-control"  id="floatingPassword" placeholder="Software" />
                                <label for="floatingPassword">Software</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInput" name='description' placeholder="Description" />
                                <label for="floatingInput">Description</label>
                            </div>

                            <select class="form-select" aria-label="Default select example" name="source_type">
                                <option value="photo" defaultValue={'photo'}>photo</option>
                                <option value="video">video</option>
                            </select>

                            <select class="form-select" aria-label="Default select example" name="project_type">
                                    <option value="exterior" defaultValue={'exterior'}>exterior</option>
                                    <option value="interior">interior</option>
                                    <option value="archviz">archviz</option>
                            </select>                        
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

            <div className='modal' style={{display: isOpenModal == 'openImages' ? 'block' : 'none'}}>
                <div className='modal__wrapper project_modal__wrapper'>
                    {
                                elementsAllImages.map(item => {
                                    return (
                                        <>
                                            <div className='modal-image-wrapper'>
                                                <img src={close} alt=""   className='close-icon close-icon-photos' onClick={() => {setIsOpenModal('open'); setFindId(item.id); setType('projectPhoto')}}/>

                                                <img className='modal-image' src={item.url} alt=""  key={item.id}/>
                                            </div>
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