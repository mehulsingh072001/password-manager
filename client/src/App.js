import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from './GlobalProvider';
import ProtectedRoute from './Components/ProtectedRoutes';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/" element={<Dashboard/>}/>
          {/* <Route exact path="/" */} 
          {/*   element={ */}
          {/*     <ProtectedRoute redirectTo="/login"> */}
          {/*       <Dashboard/> */}
          {/*     </ProtectedRoute> */}
          {/*   } */}
          {/* /> */}
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;
