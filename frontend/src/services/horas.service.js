import axios from './root.service';

export const getHoras = async () => {
    try {
        const response = await axios.get('/horas');
        const {status, data} = response;
        if (status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error(error);
    }
};

