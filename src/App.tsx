import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarNav } from './components/layout/SidebarNav';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AiChat } from './components/ai/AiChat';
import MapPage from './pages/MapPage';
import FaqPage from './pages/FaqPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';

/**
 * Кореневий компонент додатку.
 * Визначає маршрутизацію та адаптивний лейаут.
 */
function App() {
  return (
    <BrowserRouter>
      {/* 
        Responsive Layout:
        - Mobile: Full width content, Bottom Navigation.
        - Desktop: Sidebar (Fixed Left), Main Content with left padding.
        - h-screen fixes full viewport usage.
      */}
      <div className="h-screen w-screen md:h-screen sm:h-screen lg:h-screen xl:h-screen 2xl:h-screen lg:w-screen xl:w-screen 2xl:w-screen supports-[height:100dvh]:h-[100dvh] bg-background overflow-hidden relative font-sans">
        {/* --- NAVIGATION --- */}

        {/* Desktop Sidebar (Fixed, Overlay on Expand) */}
        <SidebarNav />

        {/* Mobile Bottom Navigation (Floating) */}
        <MobileBottomNav />

        {/* --- MAIN CONTENT AREA --- */}
        {/* 
            md:pl-20 -> Offset content by collapsed sidebar width (w-20/80px) on desktop.
            On mobile (pl-0), content takes full width.
        */}
        <main className="w-full h-full md:pl-20 relative overflow-hidden transition-all duration-300">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        {/* --- AI CHAT (Only visible when online) --- */}
        <AiChat />
      </div>
    </BrowserRouter>
  );
}

export default App;
