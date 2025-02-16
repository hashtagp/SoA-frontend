import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from './context/storeContext';
import SignIn from './pages/auth/SignIn';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Test from './pages/test/Test';
import './App.css';
import Instruction from './pages/instruction/Instruction';
import About from './pages/About';

function App() {
  const { isVerified } = useContext(StoreContext);

  const ProtectedRoute = ({ element }) => {
    return isVerified ? element : <Navigate to="/auth" />;
  };
  
  return (
    <div className="app">
      <Navbar />
      <div className="appmain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<SignIn onClose={() => {}} returnPath="/" />} />
          <Route path="/instruction" element={<ProtectedRoute element={<Instruction />} />} />
          <Route path="/test" element={<ProtectedRoute element={<Test />} />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
