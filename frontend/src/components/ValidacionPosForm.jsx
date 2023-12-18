import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import "../../styles/validacionPos.css"
import { createValidacionPostulacion } from '../services/postulacion.service';

function ValidacionPosForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createValidacionPostulacion(data).then(() => {
            navigate('/');
        }).catch((error) => {
            console.error("Error al crear validacion", error);
        });
    }

    return (
        <div>
            <h1>Ingresar Validacion</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor='rut'>Rut:</label>
                        <input
                            id='rut'
                            name='rut'
                            type='text'
                            {...register('rut', { required: true })}
                        />
                        {errors.rut && <span>El rut es requerido</span>}
                    </div>

                    <div>
                        <label htmlFor='estado'>Estado:</label>
                            <input
                                id='estado'
                                name='estado'
                                type='boolean'
                                {...register('rut', { required: true })}
                            />
                            {errors.estado && <span>El estado es requerido</span>}
                    </div>

                    <button type='submit'>Enviar</button>

                    
                </form>
            </div>
        </div>
    );
}

export default ValidacionPosForm;