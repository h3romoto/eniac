import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Connect, Error, Instance, Landing, Provision, Register } from './pages'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/create-instance' element={<Provision />} />
        <Route path='/connect' element={<Connect />} />
        <Route path='/instance' element={<Instance />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;