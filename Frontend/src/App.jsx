import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Loading from './components/Loading';

function App() {
  const { authUser, loading } = useAuthContext();

  if(loading)
  return <Loading/>;

  return <>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  </>
}

export default App;