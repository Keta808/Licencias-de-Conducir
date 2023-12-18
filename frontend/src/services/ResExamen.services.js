import axios from './root.service'; 

export const getExamenes = async () => {
    try {
        const response = await axios.get(`/resExamen/ResExamenes`);
        return response.data;
    } catch (error) {
        throw error;
    }
};  

export const getExamenesAprobados = async () => {
    try {
        const response = await axios.get(`/resExamen/resExamenesAprobados`);
        return response.data;
    } catch (error) {
        throw error;
    }
};