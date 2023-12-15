import { useNavigate, Route, Routes } from 'react-router-dom';
import PostulacionForm from '../components/PostulacionForm';

function App() {
  return (
    <Routes>
      <Route path="/postulacion" element={<PostulacionForm />} />
      {/* Otros routes si los hay */}
    </Routes>
  );
}

export default App;

