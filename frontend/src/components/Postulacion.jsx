import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPostulaciones } from '../services/postulacion.service';

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
        <form>
            <input
                name="nombre"
                type="text"
                {...register('nombre', { required: true })}
            />
            {errors.nombre && <span>El nombre es requerido</span>}

            <input
                name="rut"
                type="text"
                {...register('rut', { required: true })}
            />
            {errors.rut && <span>El rut es requerido</span>}

            <input
                name="fecha_nacimiento"
                type="date"
                {...register('fecha_nacimiento', { required: true })}
            />
            {errors.fecha_nacimiento && <span>La fecha de nacimiento es requerida</span>}

            <input
                name="direccion"
                type="text"
                {...register('direccion', { required: true })}
            />
            {errors.direccion && <span>La direccion es requerida</span>}

            <input
                name="tramite"
                type="text"
                {...register('tramite', { required: true })}
            />
            {errors.tramite && <span>El tramite que desea realizar es necesario</span>}

            <input type="submit" />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default PostulacionForm;
