import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='container'>

      <main className='dark'>
      
        <Outlet  />
   
      </main>

    
    </div>
  )
}

export default App
