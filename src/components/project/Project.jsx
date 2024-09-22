import './project.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'
import uuid from 'react-uuid';
import edit from './../../images/edit.svg'

const Project = () => {

    const [data, setData] = useState([]);
    const [elementsAllImages, setElementsAllImages] = useState([]);

    const [allData, setAllData] = useState([]);
    // const [archvizData, setArchvizData] = useState([]);
    const [exteriorData, setExteriorData] = useState([]);
    const [interiorData, setInteriorData] = useState([]);

    const [isActive, setIsActive] = useState('add');
    const [isActiveCategory, setIsActiveCategory] = useState('all');
    const [isOpenModal, setIsOpenModal] = useState('close');
    const [findId, setFindId] = useState(-1);
    const [elementsData, setElementsData] = useState(0)
    const [arr, setArr] = useState([])
    const [mainPhoto, setMainPhoto] = useState('')
    const [type, setType] = useState('')
    const [hideMainImg, setHideMainImg] = useState(true);
    const [loadingTitme, setLoadingTime] = useState(false)
    const [softwareBtns, setSoftwareBtns] = useState([])


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

            // const archvizResponse = await fetch('https://test.itpoint.uz/api/project/?type=archviz');
            // const dataArchviz = await archvizResponse.json();
            // setArchvizData(dataArchviz)

            const softwareBtns = await fetch('https://test.itpoint.uz/api/auto-suggestion/');
            const dataSoftwareBtns = await softwareBtns.json();
            let arr = [];
            dataSoftwareBtns.map(item => {
                arr.push(item.name);
            })
            setSoftwareBtns(arr);
        })();
    }, []);

    


    

    const handleSubmit = (event) => {
        event.preventDefault();

        const endpoint = 'https://test.itpoint.uz/api/project/';
        const formData = new FormData(event.target);
        formData.append('url', '');
      
        let countingFromSecondItem = 0;
        if(type == 'edit-item'){
            let newObj = {}
            for(let [key, value] of formData.entries()){
                if(key != 'photos'){
                    newObj[key] = value;
                }   
                else {
                    if(!hideMainImg && countingFromSecondItem == 0) {
                        formData.append('mainPhoto', value)
                    }
                    else {
                        formData.append('photo', value)
                    }
                    countingFromSecondItem++
                }         
            }

            formData.append('id', findId)
            formData.delete('title')
            formData.delete('location')
            formData.delete('software')
            formData.delete('client')
            formData.delete('url')
            formData.delete('photos')
            formData.delete('project_type')
            formData.delete('source_type')
            formData.delete('description')
            formData.delete('order')



                setLoadingTime(true);            
                fetch(`https://test.itpoint.uz/api/project/${findId}/`, {
                    headers: {"Content-type": "application/json"},
                    method: "PATCH",
                    body: JSON.stringify(newObj)
                })
                .then(response => response.json()) 
                .then(data => {
                    setLoadingTime(true);
                    if(!hideMainImg){
                        let newFormData = new FormData();
        
                        newFormData.append('photo', formData.get('mainPhoto'))
                        newFormData.append('id', findId)
                        newFormData.append('type', 'primary')
                        formData.delete('mainPhoto')
        
                        // for(let [key, value] of newFormData.entries()){
                        //     console.log(key, value);
                        // }
                        setLoadingTime(true);
                        fetch('https://test.itpoint.uz/api/photo/', {
                            method: "POST",
                            body: newFormData
                        })
                        .then(response => response.json()) 
                        .then(data => window.location.reload())
                        .catch(console.error);
                    }
                    else {
                        setLoadingTime(true);
                        setTimeout(() => {
                            window.location.reload()
                        }, 2500); 
                    }

                    if(formData.get('photo')){
                        formData.append('type', 'secondary')

                        setLoadingTime(true);
                        fetch('https://test.itpoint.uz/api/photo/', {
                            method: "POST",
                            body: formData
                        })
                        .then(response => response.json()) 
                        .then(data => window.location.reload())
                        .catch(console.error);
                    }
                    else {
                        setLoadingTime(true);
                        setTimeout(() => {
                            window.location.reload()
                        }, 2500);  
                    }
                })
                .catch(console.error);
        }

        else {
            let storeObj = {}
            for(let [key, value] of formData.entries()){
                console.log(key, value);
                storeObj[key] = value;
            }
            localStorage.setItem('obj', JSON.stringify(storeObj))

            setLoadingTime(true);
            fetch(endpoint, {
                method: "POST",
                body: formData
            })
            .then(response => response.json()) 
            .then(data => window.location.reload())
            .catch(console.error);
        }
    }

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

        if(type == 'edit-item') {
            let filteredImges = elementsAllImages.filter(item => item.id != findId)
            setElementsAllImages(filteredImges)

            fetch(`https://test.itpoint.uz/api/photo/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    console.log('item deleted');
                    
                }
            })
        }


    }

    const handleEdit = (id) => {
        setFindId(id)
        const selectectedItemForEdit = data.find(item => item.id == id);
        const elForm = document.querySelector('.project-form');
        const elAllInputs = elForm.querySelectorAll('input');
        const elAllSelects = elForm.querySelectorAll('select');

        const { client, order, description, location, project_type, software, source_type, title} = selectectedItemForEdit;

        elAllInputs[1].value = client;
        elAllInputs[2].value = title;
        elAllInputs[3].value = location;
        elAllInputs[4].value = software;
        elAllInputs[5].value = description;
        elAllInputs[6].value = order;
     
        elAllSelects[0].value = source_type;
        elAllSelects[1].value = project_type;        
    }

    const handleAdd = () => {
        const elForm = document.querySelector('.project-form');
        const elAllInputs = elForm.querySelectorAll('input');
        const elAllSelects = elForm.querySelectorAll('select');

        elAllInputs[1].value = '';
        elAllInputs[2].value = '';
        elAllInputs[3].value = '';
        elAllInputs[4].value = '';
        elAllInputs[5].value = '';
     
        elAllSelects[0].value = 'photo';
        elAllSelects[1].value = 'exterior'; 

        setArr([]);
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
        setMainPhoto(dataAllImages.cropped_photo)
        
    }

    const deleteSecondaryImage = (e) => {
       let idx = arr.findIndex(item => item.props.children[0].props.id == e.target.id)
       arr.splice(idx, 1);
       setElementsData(prev => prev + 1)
    }

    const addSecondaryImage = () => {
        arr.push(
            <div key={uuid()} className='secondary-image'>
                <img className='secondary-text-garbage project-secondary-text-garbage' src={closeSmall} alt="" id={uuid()} onClick={(e) => deleteSecondaryImage(e)}/>
                <label for="formFileLg" class="form-label">Secondary image:</label>
                <input name='photos' class="form-control form-control-lg" id="formFileLg" type="file" required accept="image/png, image/jpg, image/jpeg" />
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

            {/* <button className={`category-button ${isActiveCategory == 'archviz' ? 'category-active':''}`} onClick={() => {setData(archvizData); setIsActiveCategory('archviz')}}>archviz</button> */}
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => {setIsActive('back'); setType(''); handleAdd(); setHideMainImg(false)}}>
                <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> 
                    add
                    </button>
                    {
                        data.map((item, idx) => {
                            const { cropped_photo, title, location, software, client, url, project_type, source_type, description, id} = item;

                            
                       
                            return (
                                    <div className='career__item project-career__item' key={idx}>
                                        <img src={edit} alt="" className='edit-icon' onClick={() => {setIsActive('back'); setType(prev => prev = 'edit-item');handleAllImages(id); setFindId(id);handleEdit(id)}}/>
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
                <button className='career__button' onClick={() => {setIsActive('add'); setHideMainImg(true)}}>
                    <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill='white' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                        back</button>
                        <h2 className={`${!type ? 'visually-hidden': ''}`}>Main image</h2>
                        <img className={`${type ? '':'visually-hidden'}`} src={mainPhoto} width={400} alt=""/>
                        <h2 className={`${!type ? 'visually-hidden': ''}`}>Secondary images</h2>
                        <div  className='sending-side-avialable-images'>
                            
                        {
                               type && elementsAllImages.map(item => {
                                    return (
                                        <>
                                            <div className='modal-image-wrapper'>
                                                <img src={close} alt=""   className='close-icon close-icon-photos' onClick={() => {setIsOpenModal('open'); setFindId(item.id); setType('edit-item')}}/>

                                                <img className='modal-image' src={item.url} alt=""  key={item.id}/>
                                            </div>
                                        </>
                                    )
                                })
                        }
                        </div>

                    <form className='project-form' onSubmit={(e) => handleSubmit(e)}>
                        <div className='inputs__wrapper' >
                            <button type='button' className={`${!type ? 'visually-hidden': ''} career__button add-secondary-img-btn`} onClick={() => setHideMainImg(false)} style={{display: !hideMainImg ? 'none':'block'}}>change main image</button>

                            <div style={{position: 'relative'}} className={`${hideMainImg  ? 'visually-hidden':''}`}>
                                
                                <img  className={`${type ? '':'visually-hidden'} secondary-text-garbage project-secondary-text-garbage`} src={closeSmall} onClick={() => setHideMainImg(true)} alt="" />
                                <label for="formFileLg" class="form-label">Main image:</label>
                                <input disabled={hideMainImg ? true:false}  name='photos' class="form-control form-control-lg" id="formFileLg" type="file" required accept="image/png, image/jpg, image/jpeg" />
                            </div>

                            <button className='career__button add-secondary-img-btn' onClick={() => {addSecondaryImage()}} type='button'>add secondary images</button>

                            { arr.map(item => (item)) }

                            <div class="form-floating">
                                <input type="text" name='client' class="form-control"  id="floatingPassword" placeholder="Client" />
                                <label for="floatingPassword">Client</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='title' class="form-control"  id="floatingPassword" placeholder="Title"  required/>
                                <label for="floatingPassword">Title</label>
                            </div> 

                            <div class="form-floating">
                                <input type="text" name='location' class="form-control"  id="floatingPassword" placeholder="Location" />
                                <label for="floatingPassword">Location</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='software' readOnly class="form-control"  id="floatingPassword" placeholder="Software" />
                                <label for="floatingPassword">Software</label>
                            </div>

                            <div className='d-flex flex-wrap gap-2'>
                               {
                                softwareBtns.map(item => {
                                  return  (
                                                <>
                                                    <button className='software-bt'>
                                                        { item }
                                                    </button>
                                                </>
                                    )
                                })
                               }
                            </div>

                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInput" name='description' placeholder="Description" />
                                <label for="floatingInput">Description</label>
                            </div>

                            <div class="form-floating">
                                <input type="number" name='order' min={1} class="form-control" id="floatingInput"  placeholder="Description" />
                                <label for="floatingInput">order</label>
                            </div>

                            <select class="form-select" aria-label="Default select example" name="source_type">
                                <option value="photo" defaultValue={'photo'}>photo</option>
                                <option value="video" disabled>video</option>
                            </select>

                            <select class="form-select" aria-label="Default select example" name="project_type">
                                    <option value="exterior" defaultValue={'exterior'}>exterior</option>
                                    <option value="interior">interior</option>
                                    <option value="archviz">archviz</option>
                            </select>                        
                        </div>

                        <button type='submit' className='send-button'>
                        <svg width={20} height={20}  style={{display: loadingTitme ? 'none' : 'block'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#fff' d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                        <div className='loader' style={{display: loadingTitme ? 'block' : 'none'}}></div>
                            send
                            </button>
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