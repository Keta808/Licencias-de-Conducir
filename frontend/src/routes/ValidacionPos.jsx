import { useNavigate, Route, Routes } from 'react-router-dom';
import ValidacionPosForm from '../components/ValidacionPosForm';
import Postulaciones from '../components/Postulaciones';

function validacionPostulacion() {
    const navigate = useNavigate();
    return (
        <div>
            <Postulaciones />
            <ValidacionPosForm />
        </div>
    );
}

export default validacionPostulacion;