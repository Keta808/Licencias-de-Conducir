import React, {useEffect, useState} from 'react';
import { getPostulaciones } from '../services/postulacion.service';

const Postulaciones = () => {
    const [postulaciones, setPostulaciones] = useState([]);

    useEffect(() => {
        getPostulaciones().then(response => {
            setPostulaciones(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Postulacion Ingresadas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rut</th>
                        <th>edad</th>
                        <th>Direccion</th>
                        <th>Tramite</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {postulaciones.map((postulacion) => (
                        <tr key={postulacion._id}>
                            <td>{postulacion.nombre}</td>
                            <td>{postulacion.rut}</td>
                            <td>{postulacion.edad}</td>
                            <td>{postulacion.direccion}</td>
                            <td>{postulacion.tramite}</td>
                            
                        </tr>
                            
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Postulaciones;