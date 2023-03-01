import './App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { ForgetPassword } from './pages/ForgetPassword';
import { ToastContainer } from 'react-toastify'

function App() {

 

  return (
    <div className=""> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path="password-reset" element={<ForgetPassword />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>

    </div>
  );
}

export default App;
