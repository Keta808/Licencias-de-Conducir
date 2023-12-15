import { useNavigate, Route, Routes } from 'react-router-dom';
import PostulacionForm from '../components/PostulacionForm';

function postulacion() {
  const navigate = useNavigate();
  return (
    <div>
      <PostulacionForm />
    </div>
  );
}

export default postulacion;

