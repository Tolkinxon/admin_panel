import './career.css'
import { useEffect, useState } from 'react';
import close from './../../images/close.svg'
import closeSmall from './../../images/close_small.svg'
import uuid from 'react-uuid';
import edit from './../../images/edit.svg'


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


        if(type == 'edit-item') {
            fetch(`https://test.itpoint.uz/api/career/${findId}/`,{method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    fetch('https://test.itpoint.uz/api/career/', {
                        headers: {"Content-type": "application/json"},
                        method: "POST",
                        body: JSON.stringify(newObj)
                    }).then(response => {
                        if(response.ok){
                            window.location.reload();
                        }
                    })
                }
            })
        }
        else{
            fetch('https://test.itpoint.uz/api/career/', {
                headers: {"Content-type": "application/json"},
                method: "POST",
                body: JSON.stringify(newObj)
            }).then(response => {
                if(response.ok){
                    window.location.reload();
                }
            })
        }
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
            fetch(`https://test.itpoint.uz/api/special/short-task/${findId}`,{method: 'DELETE'})
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
            <div class="form-floating" key={uuid()}>
                <img className='secondary-text-garbage' src={closeSmall} alt="" id={uuid()} onClick={(e) => deletePositionTask(e)}/>
                <input type="text" class="form-control" name='text' id="floatingInput"  placeholder="Secondary text" />
                <label for="floatingInput">Secondary text</label>
            </div>
        )
        setElementsData(prev => prev + 1)
    }

    const addSecondaryTextForEdit = (text) => {
        arr.push(
            <div class="form-floating" key={uuid()}>
                <img className='secondary-text-garbage' src={closeSmall} alt="" id={uuid()} onClick={(e) => deletePositionTask(e)}/>
                <input type="text" class="form-control" name='text' id="floatingInput"  placeholder="Secondary text" value={text}/>
                <label for="floatingInput">Secondary text</label>
            </div>
        )
        setElementsData(prev => prev + 1)
    }


    const handleEdit = (id) => {
        setFindId(id)
        const selectectedItemForEdit = data.find(item => item.id == id);
        const elForm = document.querySelector('.main-form');
        const allInputs = elForm.querySelectorAll('input');
        const elSelect = elForm.querySelector('select');

        const { sub_title, text, title, year_range, type, position_tasks } = selectectedItemForEdit;

        allInputs[0].value = sub_title;
        allInputs[1].value = text;
        allInputs[2].value = title;
        allInputs[3].value = year_range
        elSelect.value = type 
        
        position_tasks.map(item => addSecondaryTextForEdit(item.text))
    }

    const handleAdd = () => {
        const elForm = document.querySelector('.main-form');
        const allInputs = elForm.querySelectorAll('input');
        const elSelect = elForm.querySelector('select');

        allInputs[0].value = '';
        allInputs[1].value = '';
        allInputs[2].value = '';
        allInputs[3].value = ''
        elSelect.value = 'experience' 

        setArr([]);
    }
  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>

            <button className={`category-button ${isActiveCategory == 'experience' ? 'category-active':''}`} onClick={() => {setData(experienceData); setIsActiveCategory('experience');}} >experience</button>

            <button className={`category-button ${isActiveCategory == 'education' ? 'category-active':''}`} onClick={() => {setData(educationData); setIsActiveCategory('education')}}>education</button>
                    
                
                <div className='container'>
                <button className='career__button' onClick={() => {setIsActive('back'); handleAdd();}}> 
                <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>    
                     add
                </button>
                    {
                        data.map((item, idx) => {
                            const { sub_title, text, title, year_range, position_tasks, id} = item;
                       
                            return (
                                    <div className='career__item' key={idx}>
                                        <img src={edit} alt="" className='edit-icon' onClick={() => {setIsActive('back'); setType(prev => prev = 'edit-item'); handleEdit(id)}}/>
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
                    <button className='career__button' onClick={() => {setIsActive('add'); setType('');}}>
                    <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill='white' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                        back</button>

                    <form  onSubmit={(e) => handleSubmit(e)} className='main-form'>
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
                        <button type='submit' className='send-button'>
                        <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#fff' d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
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
         </>
         );
 
}
 
export default Career;