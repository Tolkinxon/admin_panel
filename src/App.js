import Project from './components/project/Project'
import Career from './components/career/Career'
import './app.css'

function App() {
  return (
    <div className="App">
      <section className='left-side'>
        <h2 className='left-side__h2 h2-active'>Project</h2>
        <h2 className='left-side__h2 '>Career</h2>
      </section>

      <section className='right-side'>
        <Project />
        <Career />
      </section>
    </div>
  );
}

export default App;
