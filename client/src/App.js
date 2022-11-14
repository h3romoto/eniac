import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Connect, Dashboard, Error, Instance, Landing, Register } from './pages'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='/eniac' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/create-instance' element={<Instance />} />
        <Route path='/connect-instance' element={<Connect />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;