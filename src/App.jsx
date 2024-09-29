import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from'react-router-dom';
import Loader from './components/loader/Loader';



const Weather = lazy(() => import('./components/pages/weather'))

function App() {
  return (
  <Suspense fallback={<Loader /> }>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Weather />} />
  </Routes>
  </BrowserRouter>
  </Suspense>
  );
}

export default App;
