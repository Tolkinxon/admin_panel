import Project from './components/project/Project'
import Career from './components/career/Career'
import './app.css'
import { useState } from 'react';

function App() {
  const [isActive, setIsActive] = useState('Project')



  return (
    <div className="App">
      <section className='left-side'>
        <h2 className={`left-side__h2 ${isActive == 'Project'?'h2-active':''}`} onClick={() => setIsActive('Project')}>Project</h2>
        <h2 className={`left-side__h2 ${isActive == 'Career'?'h2-active':''}`} onClick={() => setIsActive('Career')}>Career</h2>
      </section>

      <section className='right-side'>
       {isActive == 'Project' ? <Project /> : <></>} 
       {isActive == 'Career' ?  <Career /> : <></>} 
      </section>
    </div>
  );
}

export default App;
