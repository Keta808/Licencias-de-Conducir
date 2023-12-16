import { useNavigate, Route, Routes } from 'react-router-dom';
import ValidacionPosForm from '../components/ValidacionPosForm';

function validacionPostulacion() {
    const navigate = useNavigate();
    return (
        <div>
        <ValidacionPosForm />
        </div>
    );
}

export default validacionPostulacion;