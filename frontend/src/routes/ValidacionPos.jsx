import { useNavigate, Route, Routes } from 'react-router-dom';
import ValidacionPosForm from '../components/ValidacionPosForm';
import Postulaciones from '../components/Postulaciones';
import Validaciones from '../components/Validaciones';

function validacionPostulacion() {
    const navigate = useNavigate();
    return (
        <div>
            <Postulaciones />
            <ValidacionPosForm />
            <Validaciones/>
        </div>
    );
}

export default validacionPostulacion;