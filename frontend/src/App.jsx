import { useState, useEffect } from 'react'
import './App.css'
import CarList from './components/CarList.jsx'
import CarForm from './components/CarForm.jsx'

function App() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
      fetch('http://localhost:3001/api/cars')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then(data => {
          setCars(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }, [])
    
    const handleAdd = (newCar) => {
      setCars(prevCars => [newCar, ...prevCars])
    }

    const handleDelete = async (id) => {
      if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรถคันนี้?')) return
      try {
        const res = await fetch(`http://localhost:3001/api/cars/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setCars(prev => prev.filter(car => car.id !== id))
      } catch (err) {
        alert('ลบไม่สำเร็จ: ' + err.message)
      }
    }

    const handleUpdate = async (id, updatedData) => {
      try {
        const res = await fetch(`http://localhost:3001/api/cars/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const updated = await res.json()
        setCars(prev => prev.map(car => car.id === id ? updated : car))
      } catch (err) {
        alert('แก้ไขไม่สำเร็จ: ' + err.message)
      }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>ระบบจัดการข้อมูลรถยนต์</h1>
            <CarForm onAdd={handleAdd} />
            <CarList cars={cars} loading={loading} error={error} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
    )
}

export default App

//---------------
/*import './App.css'
import CarList from './components/CarList.jsx'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>ระบบจัดการข้อมูลรถยนต์</h1>
      <CarList />
    </div>
  )
}

export default App
*/



//---------------
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'





/*}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/