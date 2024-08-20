import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './compo/Home.jsx';
import NavBar from './compo/NavBar.jsx';
import './compo/css/home.css';
import Signin from './compo/Signin.jsx';
import Login from './compo/Login.jsx';
import UserProfile from './compo/UserProfile.jsx';
import Email from './compo/Email.jsx';
import PassUp from './compo/PassUp.jsx';
import Token from './compo/Token.jsx';

function App() {
  

  return (
   <Router>
    <NavBar/>
    <Routes>
      <Route>
         <Route path='/' element={<Home/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/profile' element={<UserProfile/>}/>
         <Route path='/email' element={<Email/>}/>
         <Route path='/token' element={<Token/>}/>
         <Route path='/pass' element={<PassUp/>}/>
      </Route>
    </Routes>
   </Router>
  )
}

export default App
