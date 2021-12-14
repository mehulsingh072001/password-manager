import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Folders from './Pages/Folders';
import Folder from './Pages/Folder'
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
          <Route exact path="/" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Dashboard/>
              </ProtectedRoute>
            }
          />
          <Route exact path="/folders" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Folders/>
              </ProtectedRoute>
            }
          />
          <Route exact path="/folders/:name/" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Folder/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;
