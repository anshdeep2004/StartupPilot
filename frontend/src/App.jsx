import './App.css'
import {Routes, Route} from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import CoverPage from './pages/CoverPage'

function App() {

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<CoverPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
