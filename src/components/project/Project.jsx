import './project.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'

const Project = () => {

    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [isActive, setIsActive] = useState('add');
    const [isOpenModal, setIsOpenModal] = useState('close');
    const [findId, setFindId] = useState(-1);
    const [isActiveCategory, setIsActiveCategory] = useState('all');
    const [addPositionTasksInputs, setAddPositionTasksInputs] = useState(0)


    useEffect(() => {
        (async() => {
            const allResponse = await fetch('https://test.itpoint.uz/api/project/?type=all');
            const dataAll = await allResponse.json();
            setAllData(dataAll)

            setData(allData);

        })();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newObj = {};
        const newArr = ['empty'];
        let even = 0;
    
        for (let [key, value] of formData.entries()) {
            const newAnotherObj = {};
            if(key.slice(0, 8) == 'another_'){
                even++
                const keyName = key.slice(8);
                newAnotherObj[keyName] = value;
                if(even % 2 == 0){
                    newArr[(even / 2)][keyName]=value;
                }
                else {
                    newArr.push(newAnotherObj);
                }
            }
            else {
                newObj[key] = value;
            }
        }
        newArr.shift();
        newObj["position_tasks"] = newArr;

        fetch('https://test.itpoint.uz/api/career/', {
            headers: {"Content-type": "application/json"},
            method: "POST",
            body: JSON.stringify(newObj)
        }).then(response => {
            if(response.ok){
                window.location.reload();
            }
        })

        
    };

    const handleDelete = () => {
        fetch(`https://test.itpoint.uz/api/career/${findId}/`,{method: 'DELETE'})
        .then(response => {
            if(response.ok){
                window.location.reload();
            }
        })
    }

    
  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>

            <button className={`category-button ${isActiveCategory == 'all' ? 'category-active':''}`} onClick={() => {setData(allData); setIsActiveCategory('all');}} >all</button>

            <button className={`category-button ${isActiveCategory == 'interior' ? 'category-active':''}`} onClick={() => { setIsActiveCategory('education')}}>interior</button>

            <button className={`category-button ${isActiveCategory == 'exterior' ? 'category-active':''}`} onClick={() => { setIsActiveCategory('education')}}>exterior</button>

            <button className={`category-button ${isActiveCategory == 'archviz' ? 'category-active':''}`} onClick={() => { setIsActiveCategory('education')}}>archviz</button>
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}>add</button>
                    {
                        data.map((item, idx) => {
                            const { cropped_photo, title, location, software, client, url, project_type, source_type, description, id} = item;
                       
                            return (
                                    <div className='career__item project-career__item' key={idx}>
                                        <img src={close} alt=""  className='close-icon' onClick={() => {setIsOpenModal('open'); setFindId(id)}}/>

                                        <img className='project__image' src={cropped_photo} alt="" />
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
                            <label htmlFor="first">
                                Subtitle: 
                                <input type="text" id='first' name='sub_title'/> 
                            </label>

                            <label htmlFor="second">
                                Text: 
                                <input type="text" id="second" name='text'/> 
                            </label>

                            <label htmlFor="third">
                                Title: 
                                <input type="text" id='third' name='title'/> 
                            </label>

                            <label htmlFor="fourth">
                                Year range: 
                                <input type="text" id="fourth" name='year_range'/> 
                            </label>

                            <label htmlFor="fourth">
                                Year range: 
                                <select name="type" >
                                    <option value="experience" defaultValue={'experience'}>experience</option>
                                    <option value="education">education</option>
                                </select>
                            </label>
                        </div>

                        <div className='position_tasks_input__wrapper'>
                            <button type='button' className='tasks-input-btn' onClick={() => setAddPositionTasksInputs(prev => prev + 1)}>add</button>
                            <div className='position_tasks_input__items'>
                               <label htmlFor="sixth">
                                    text: 
                                    <input type="text" id="sixth" name='another_text'/> 
                                </label>
                            </div>
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
            
         </>
         );
 
}
 
export default Project;