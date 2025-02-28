import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Employé from './Components/Users/Employés';
import Manager from './Components/Users/Manager';
import Logout from './Components/Logout/Logout';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Logout />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/manager' element={<Manager />} />
        <Route path='/employe' element={<Employé />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
