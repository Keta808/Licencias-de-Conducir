import React, {useEffect, useState} from 'react';
import { createValidacionPostulacion, getValidacionPostulaciones } from '../services/postulacion.service';

const Validaciones = () => {
    const [validaciones, setValidaciones] = useState([]);

    useEffect(() => {
        getValidacionPostulaciones().then(response => {
            if(response && response.data){
                setValidaciones(response.data);
            }
                
        }).catch(error => {
            console.log("Error al obtener las validaciones",error);
        });
    }, []);

    return (
        <div>
            <h1>Validaciones Ingresadas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Estado</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {validaciones.map((validacion) => (
                        <tr key={validacion._id}>
                            <td>{validacion.rut}</td>
                            <td>{validacion.estado ? "Aceptada" : "Rechazada"}</td>
                            
                        </tr>
                            
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Validaciones;