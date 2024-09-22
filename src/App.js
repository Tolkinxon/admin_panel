import Project from './components/project/Project'
import Career from './components/career/Career'
import './app.css'
import { useState, useEffect } from 'react';
import chart from './images/chart-line-solid.svg'

function App() {
  const [isActive, setIsActive] = useState('Project')
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    (async() => {
        const responseIsRandom = await fetch('https://test.itpoint.uz/api/configuration/'); 
        const dataIsRandom = await responseIsRandom.json();
        setIsRandom(dataIsRandom.at(-1).is_random_order)
    })();
}, []);

  function isRandomFunction(){
    fetch('https://test.itpoint.uz/api/configuration/',{
      headers:{"Content-type": "application/json"},
      method: "POST",
      body: JSON.stringify({is_random_order: !isRandom})
    })
    .then(response => response.json()) 
    .then(data => window.location.reload())
    .catch(console.error);
  }


  return (
    <div className="App">
      <section className='left-side'>
  
      <h2 className={`left-side__h2 ${isActive == 'Project'?'h2-active':''}`} onClick={() => setIsActive('Project')}> 
      <svg width={20} height={20}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill='white' d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5l-144 0c-19.1 0-36.3 8.4-48 21.7l0-37.7c0-8.8-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l64 0 0 128-160 0c-26.5 0-48-21.5-48-48l0-112-32 0c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304l0 144 192 0 0-144-192 0zm-48-16c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32l0 160 32 0c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48l-48 0-192 0-48 0c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16l32 0 0-160z"/></svg>
        Project
        </h2>

        <h2 className={`left-side__h2 ${isActive == 'Career'?'h2-active':''}`} onClick={() => setIsActive('Career')}>
        <svg width={15} height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='white' d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>
          Career
        </h2>

        <button className='randomBtn' onClick={()=>{isRandomFunction()}}>{isRandom ? 'ordered' : 'randomly'}</button>
      </section>

      <section className='right-side'>
       {isActive == 'Project' ? <Project /> : <></>} 
       {isActive == 'Career' ?  <Career /> : <></>} 
      </section>
    </div>
  );
}

export default App;
