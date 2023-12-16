import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { createPostulaciones } from '../services/postulacion.service';
import "../../styles/postulacion.css"

function PostulacionForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createPostulaciones(data).then(() => {
            navigate('/');
        }).catch((error) => {
            console.error("Error al crear postulacion", error);
        });
    }

    return (
        <div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        {...register('nombre', { required: true })}
                    />
                    {errors.nombre && <span>El nombre es requerido</span>}
                </div>

                <div>
                    <label htmlFor="rut">RUT:</label>
                    <input
                        id="rut"
                        name="rut"
                        type="text"
                        {...register('rut', { required: true })}
                    />
                    {errors.rut && <span>El rut es requerido</span>}
                </div>

                <div>
                    <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                    <input
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        type="date"
                        {...register('fecha_nacimiento', { required: true })}
                    />
                    {errors.fecha_nacimiento && <span>La fecha de nacimiento es requerida</span>}
                </div>

                <div>
                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        {...register('direccion', { required: true })}
                    />
                    {errors.direccion && <span>La dirección es requerida</span>}
                </div>

                <div>
                    <label htmlFor="tramite">Trámite:</label>
                    <input
                        id="tramite"
                        name="tramite"
                        type="text"
                        {...register('tramite', { required: true })}
                    />
                    {errors.tramite && <span>El trámite que desea realizar es necesario</span>}
                </div>

                <div>
                    <label htmlFor='Archivo'>Adjuntar Archivos:</label>
                    <input
                        id='Archivo'
                        name='Archivo'
                        type='file'
                        {...register('Archivo', { required: true })}
                    />
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
        </div>
    );
}

export default PostulacionForm;
