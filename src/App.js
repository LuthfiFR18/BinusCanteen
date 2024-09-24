
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ResetPassword from './Pages/ResetPassword';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';  
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
