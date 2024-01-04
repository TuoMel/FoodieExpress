import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Restaurants from './views/Restaurants';
import Signup from './views/Signup';

function App() {
  return (
      <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/register" element={<Signup />} />
        </Routes>
      </>
  );
}

export default App;
