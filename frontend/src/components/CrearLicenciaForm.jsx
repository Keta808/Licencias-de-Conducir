import React from 'react';

import { useForm } from 'react-hook-form';
import { createLicenciaPorRut } from '../services/licencia.service';
// import "../../styles/licencia.css"; // Asegúrate de tener el archivo CSS adecuado

function CrearLicenciaForm() {
   

    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); 

    

    const onSubmit = async (licenciaData) => {
        const { rut, TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = licenciaData; 
        // Manipula la fecha aquí 
        const fecha = new Date(FechaRetiro); 
        fecha.setDate(fecha.getDate() + 1); 
     
    
        const formData = new FormData();
        formData.append('TipoLicencia', TipoLicencia);
        formData.append('FechaRetiro', fecha); 
        formData.append('EstadoLicencia', EstadoLicencia);
        formData.append('pdfDocumento', pdfDocumento[0]);
    
        try {
            const response = await createLicenciaPorRut(rut, formData);
            console.log("Respuesta del backend:", response); 
            console.log("response.state", response.state);
            // Verificar si la creación de la licencia fue exitosa
            if (response.state === 'Success') {
                alert("Licencia creada exitosamente");
                window.location.reload(); // Recarga la página actual
            } else {
                alert("Hubo un problema al crear la licencia");
            }   
        } catch (error) {
            console.error("Error al crear licencia", error);
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
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        <option value="A5">A5</option>
                        <option value="B">B</option> 
                        <option value="C">C</option>
                        <option value="D">D</option> 
                        <option value="E">E</option> 
                        <option value="F">F</option>
                        
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
                        <option value="Retirable">Retirable</option>
                        
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