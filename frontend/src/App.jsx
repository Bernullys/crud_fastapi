import { useRoutes, HashRouter, useLocation } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import ProtectedRoutes from './Components/ProtetedRoutes';
import AuthWatcher from './Components/AuthWatcher';
import Body from './Components/Body/Body';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes ([
    { path: '/', element: < HomePage />},
    { path: '/login', element: <LogIn />},
    { path: '/register', element: <Register />},
    { path: '/body', element:
      < ProtectedRoutes>
        < Body />
      </ProtectedRoutes>
    }
  ])

  return (
    <>
      < AuthWatcher />
      { routes }
    </>
  )
}

function App() {

  return (
    < HashRouter >
      <AppRoutes />
    </HashRouter>
  )
}

export default App;
