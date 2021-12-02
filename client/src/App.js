import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
