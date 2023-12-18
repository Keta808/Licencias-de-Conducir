import axios from './root.service';

export const getPostulaciones = async () => {
    try {
        const response = await axios.get('/postulacion');
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return [];
    } catch (error) {
        console.log(error);
    }
};

export const getPostulacion = async (id) => {
    try {
        const response = await axios.get(`/postulacion/${id}`);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const createPostulacion = async (postulacion) => {
    try {
        const response = await axios.post('/postulacion', postulacion);
        const { status, data } = response;
        if(status === 201){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const updatePostulacion = async (id, postulacion) => {
    try {
        const response = await axios.put(`/postulacion/${id}`, postulacion);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const deletePostulacion = async (id) => {
    try {
        const response = await axios.delete(`/postulacion/${id}`);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const getValidacionPostulacion = async (id) => {
    try {
        const response = await axios.get(`/validacionPos/${id}`);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const getValidacionPostulaciones = async () => {
    try {
        const response = await axios.get('/validacionPos');
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}

export const createValidacionPostulacion = async (validacion) => {
    try {
        const response = await axios.post('/validacionPos', validacion);
        const { status, data } = response;
        if(status === 201){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const updateValidacionPostulacion = async (id, validacion) => {
    try {
        const response = await axios.put(`/validacionPos/${id}`, validacion);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

export const deleteValidacionPostulacion = async (id) => {
    try {
        const response = await axios.delete(`/validacionPos/${id}`);
        const { status, data } = response;
        if(status === 200){
            return data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}

