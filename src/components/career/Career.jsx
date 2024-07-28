import './career.css'
import { useEffect, useState } from 'react';

const Career = () => {

    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState('add');

useEffect(() => {
    (async() => {
        const response = await fetch('https://test.itpoint.uz/api/career/?type=experience');
        const data = await response.json();

        setData(data);
    })();
}, []);




  
        return ( 
         <>
            <section className='career' style={{display: isActive == 'add' ? 'block' : 'none' }}>
                <div className='container'>
                <button className='career__button' onClick={() => setIsActive('back')}>add</button>
                    {
                        data.map(item => {
                            const { sub_title, text, title, year_range, position_tasks} = item;
                       
                            return (
                                    <div className='career__item'>
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
                    <div className='inputs__wrapper'>
                        <label htmlFor="first">
                            Subtitle: 
                            <input type="text" id='first'/> 
                        </label>

                        <label htmlFor="second">
                            Text: 
                            <input type="text" id="second"/> 
                        </label>

                        <label htmlFor="third">
                            Title: 
                            <input type="text" id='third'/> 
                        </label>

                        <label htmlFor="fourth">
                            Year range: 
                            <input type="text" id="fourth"/> 
                        </label>
             
                    </div>

                    <div className='position_tasks__wrapper'>
                        <div className='position_tasks__items'>
                            <label htmlFor="fifth">
                                career: 
                                <input type="text" id="fifth"/> 
                            </label>

                            <label htmlFor="sixth">
                                text: 
                                <input type="text" id="sixth"/> 
                            </label>
                        </div>
                    </div>
                </div>
            </section>
         </>
         );
 
}
 
export default Career;