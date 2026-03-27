import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './containers/MainLayout'
import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import HotelPage from './pages/Hotelpage'
import { ROUTES } from './configs/routes'

function App() {
  return (
    <Routes>
      {/* Страницы внутри основного layout (хедер + футер сайта) */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<MainPage />} />
        <Route path={ROUTES.HOTEL} element={<HotelPage />} />
      </Route>

      {/* AuthPage — своя отдельная страница, без MainLayout */}
      <Route path={ROUTES.AUTH} element={<AuthPage />} />
    </Routes>
  )
}

export default App