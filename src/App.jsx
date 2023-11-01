import './App.scss'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <nav>
        <div className="container">
          <div className="flex">

            <div>
              <h1>Store App</h1>
            </div>

            <ul id="menu">
              <li>
                <a href={'/'}>
                  Table
                </a>
              </li>
              <li>
                <a href={'/dashboard'}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href={'/map'}>
                  Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
