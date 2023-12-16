import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createLicenciaPorRut } from '../services/licencia.service';
import "../../styles/licencia.css"; // Asegúrate de tener el archivo CSS adecuado

function CrearLicenciaForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { rut, TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = data;

        const formData = new FormData();
        formData.append('TipoLicencia', TipoLicencia);
        formData.append('FechaRetiro', FechaRetiro);
        formData.append('EstadoLicencia', EstadoLicencia);
        formData.append('pdfDocumento', pdfDocumento[0]); // Asumiendo que 'Archivo' es un array de archivos

        try {
            await createLicenciaPorRut(rut, formData);
            navigate('/');
        } catch (error) {
            console.error("Error al crear licencia", error);
            // Manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="rut">RUT del Usuario:</label>
                    <input
                        id="rut"
                        name="rut"
                        type="text"
                        {...register('rut', { required: true })}
                    />
                    {errors.rut && <span>El RUT es requerido</span>}
                </div>

                <div>
                    <label htmlFor="TipoLicencia">Tipo de Licencia:</label>
                    <select
                        id="TipoLicencia"
                        name="TipoLicencia"
                        {...register('TipoLicencia', { required: true })}
                    >
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        {/* Agrega más opciones según tus necesidades */}
                    </select>
                    {errors.TipoLicencia && <span>El tipo de licencia es requerido</span>}
                </div>

                <div>
                    <label htmlFor="FechaRetiro">Fecha de Retiro:</label>
                    <input
                        id="FechaRetiro"
                        name="FechaRetiro"
                        type="date"
                        {...register('FechaRetiro')}
                    />
                </div>

                <div>
                    <label htmlFor="EstadoLicencia">Estado de Licencia:</label>
                    <select
                        id="EstadoLicencia"
                        name="EstadoLicencia"
                        {...register('EstadoLicencia', { required: true })}
                    >
                        <option value="Retirada">Retirada</option>
                        <option value="En Tramite">En Tramite</option>
                        {/* Agrega más opciones según tus necesidades */}
                    </select>
                    {errors.EstadoLicencia && <span>El estado de licencia es requerido</span>}
                </div>

                <div>
                    <label htmlFor='pdfDocumento'>Adjuntar Archivo:</label>
                    <input
                        id='pdfDocumento'
                        name='pdfDocumento'
                        type='file'
                        {...register('pdfDocumento', { required: true })}
                    />
                    {errors.pdfDocumento && <span>El archivo es requerido</span>}
                </div>

                <button type="submit">Crear Licencia</button>
            </form>
        </div>
    );
}

export default CrearLicenciaForm;