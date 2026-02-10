import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import MapPage from './pages/MapPage';
import HandbookPage from './pages/HandbookPage';
import SafetyPage from './pages/SafetyPage';
import FaqPage from './pages/FaqPage';

/**
 * Кореневий компонент додатку.
 * Визначає маршрутизацію між основними сторінками.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/handbook" element={<HandbookPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
