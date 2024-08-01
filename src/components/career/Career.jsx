import './career.css'
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const Career = () => {

    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState('add');
    const [addPositionTasksInputs, setAddPositionTasksInputs] = useState(0)


useEffect(() => {
    (async() => {
        const response = await fetch('https://test.itpoint.uz/api/career/?type=experience');
        const data = await response.json();

        setData(data);
    })();
}, []);





    const elements = new Array(addPositionTasksInputs).fill(1).map(item => {
        return (
            <div className='position_tasks_input__items'>
            <label htmlFor="fifth">
                career: 
                <input type="text" id="fifth" name='another_career'/> 
            </label>

            <label htmlFor="sixth">
                text: 
                <input type="text" id="sixth" name='another_text'/> 
            </label>
        </div>
        )
    });

    const newFormElements = [1].map(item => {
        return (
            <>
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
                            <button className='tasks-input-btn' onClick={() => setAddPositionTasksInputs(prev => prev + 1)}>add</button>
                            <div className='position_tasks_input__items'>
                                <label htmlFor="fifth">
                                    career: 
                                    <input type="text" id="fifth" name='another_career'/> 
                                </label>

                                <label htmlFor="sixth">
                                    text: 
                                    <input type="text" id="sixth" name='another_text'/> 
                                </label>
                            </div>

                            {
                                elements
                            }
                </div>
                <button type='submit'>send</button>
            </>
        )
    })

    const valueInner = <>
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
                            <button className='tasks-input-btn' onClick={() => setAddPositionTasksInputs(prev => prev + 1)}>add</button>
                            <div className='position_tasks_input__items'>
                                <label htmlFor="fifth">
                                    career: 
                                    <input type="text" id="fifth" name='another_career'/> 
                                </label>

                                <label htmlFor="sixth">
                                    text: 
                                    <input type="text" id="sixth" name='another_text'/> 
                                </label>
                            </div>

                            {
                                elements
                            }
                </div>
                <button type='submit'>send</button>
    
    </>




    
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
                    newArr[(even / 2)].id= (even/2);
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
        newObj.id = uuid();

        console.log(newObj);


    };

    
  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}>add</button>
                    {
                        data.map((item, idx) => {
                            const { sub_title, text, title, year_range, position_tasks, id} = item;
                       
                            return (
                                    <div className='career__item' key={idx}>
                                        <p><span>Subtittle: </span>{sub_title}</p>
                                        <p><span>Text: </span>{text}</p>
                                        <p><span>Title: </span>{title}</p>
                                        <p><span>Year range: </span>{year_range}</p>

                                        {
                                            position_tasks.map(itemPositionTasks => {
                                                const { career, text} = itemPositionTasks
                                                return (
                                                    <>
                                                    <div className='position_tasks__item'>
                                                        <p><span>career: </span> {career}</p>
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
                            <button className='tasks-input-btn' onClick={() => setAddPositionTasksInputs(prev => prev + 1)}>add</button>
                            <div className='position_tasks_input__items'>
                                <label htmlFor="fifth">
                                    career: 
                                    <input type="text" id="fifth" name='another_career'/> 
                                </label>

                                <label htmlFor="sixth">
                                    text: 
                                    <input type="text" id="sixth" name='another_text'/> 
                                </label>
                            </div>

                            {
                                elements
                            }
                        </div>
                        <button type='submit'>send</button>
                    </form>
                </div>
            </section>

            
         </>
         );
 
}
 
export default Career;