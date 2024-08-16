import './career.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'
import uuid from 'react-uuid';


const Career = () => {

    const [data, setData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [experienceData, setExperienceData] = useState([]);
    const [isActive, setIsActive] = useState('add');
    const [isOpenModal, setIsOpenModal] = useState('close');
    const [findId, setFindId] = useState(-1);
    const [isActiveCategory, setIsActiveCategory] = useState('experience');
    const [addPositionTasksInputs, setAddPositionTasksInputs] = useState(0)
    const [type, setType] = useState('')
    const [arr, setArr] = useState([])
    const [elementsData, setElementsData] = useState(0)




    useEffect(() => {
        (async() => {
            const experienceResponse = await fetch('https://test.itpoint.uz/api/career/?type=experience');
            const dataExperience = await experienceResponse.json();
            setExperienceData(dataExperience)

            const educationResponse = await fetch('https://test.itpoint.uz/api/career/?type=education');
            const dataEducation = await educationResponse.json();
            setEducationData(dataEducation)

            setData(dataExperience);

        })();
    }, []);

    // const elements = new Array(addPositionTasksInputs).fill(1).map(item => {
    //     return (
    //         <div className='position_tasks_input__items'>
    //             <label htmlFor="sixth">
    //                 text: 
    //                 <input type="text" id="sixth" name='another_text'/> 
    //             </label>
    //         </div>
    //     )
    // });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formData2 = new FormData(event.target.children[1]);
        const newObj = {};

        const textsArr = []
        for (let [key, value] of formData2.entries()) { 
            let textObj = {}
            textObj[key] = value
            textsArr.push(textObj)
        }

        for (let [key, value] of formData.entries()) {
            newObj[key] = value;
        }
        
        newObj["position_tasks"] = textsArr;


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
        if(type == 'career__item') {
            fetch(`https://test.itpoint.uz/api/career/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    window.location.reload();
                }
            })
        }

        if(type == 'position_tasks') {
            fetch(`https://test.itpoint.uz/api/position-task/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    window.location.reload();
                }
            })
        }
    }

    const deletePositionTask = (e) => {
        let idx = arr.findIndex(item => item.props.children[0].props.id == e.target.id)
        arr.splice(idx, 1);
        setElementsData(prev => prev + 1)
     }

    const addSecondaryText = () => {
        arr.push(
            <div className='position_tasks_input__items' key={uuid()}>
                <button type='button' id={uuid()} onClick={(e) => deletePositionTask(e)}>delete</button> 
                <label htmlFor="sixth">
                    text: 
                    <input type="text" id="sixth" name='text'/> 
                </label>

            </div>
        )
        setElementsData(prev => prev + 1)
    }

    
  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>

            <button className={`category-button ${isActiveCategory == 'experience' ? 'category-active':''}`} onClick={() => {setData(experienceData); setIsActiveCategory('experience');}} >experience</button>

            <button className={`category-button ${isActiveCategory == 'education' ? 'category-active':''}`} onClick={() => {setData(educationData); setIsActiveCategory('education')}}>education</button>
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}> 
                <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>    
                     add
                </button>
                    {
                        data.map((item, idx) => {
                            const { sub_title, text, title, year_range, position_tasks, id} = item;
                       
                            return (
                                    <div className='career__item' key={idx}>
                                        <img src={close} alt=""  className='close-icon' onClick={() => {setIsOpenModal('open'); setType('career__item'); setFindId(id)}}/>
                                        <p><span>Subtittle: </span>{sub_title}</p>
                                        <p><span>Text: </span>{text}</p>
                                        <p><span>Title: </span>{title}</p>
                                        <p><span>Year range: </span>{year_range}</p>

                                        {
                                            position_tasks.map(itemPositionTasks => {
                                                const { text, id } = itemPositionTasks
                                                return (
                                                    <>
                                                    <div className='position_tasks__item'>
                                                        <img className='close-small-icon' src={closeSmall} alt="close icon"  onClick={() => {setIsOpenModal('open');setType('position_tasks'); setFindId(id)}}/>
                                                        <p><span>text: </span> {text}</p>
                                                    </div>

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className='career' style={{display: isActive == 'back' ? 'block' : 'none' }}>
                <div className='container'>
                    <button className='career__button' onClick={() => setIsActive('add')}>
                    <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill='white' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                        back</button>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='inputs__wrapper' >
                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInput" name='sub_title' placeholder="Subtitle" />
                                <label for="floatingInput">Subtitle</label>
                            </div>
 
                            <div class="form-floating">
                                <input type="text" name='text' class="form-control"  id="floatingPassword" placeholder="Text" />
                                <label for="floatingPassword">Text</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='title' class="form-control"  id="floatingPassword" placeholder="Title" />
                                <label for="floatingPassword">Title</label>
                            </div>

                            <div class="form-floating">
                                <input type="text" name='year_range' class="form-control"  id="floatingPassword" placeholder="Year range" />
                                <label for="floatingPassword">Year range</label>
                            </div>

                            <select class="form-select" aria-label="Default select example" name="type">
                                <option value="experience" defaultValue={'experience'}>experience</option>
                                <option value="education">education</option>
                            </select>
                        </div>

                        <form className='position_tasks_input__wrapper'>
                            <button type='button' className='tasks-input-btn' onClick={() => addSecondaryText()}>add secondary text</button>
                            { arr.map(item => (item)) }
                        </form>
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
 
export default Career;