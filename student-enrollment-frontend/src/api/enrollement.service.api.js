import { apiGateway } from "./axiosConfig";

export const submitCnieAlone = async (studentCnie) => {
    try{
        const response = await apiGateway.get(`/enrollments/student-cnie/${studentCnie}`);

        return response.data;
    }catch(error){
        console.error("Getting Enrollements failed:", error);
        throw error;
    }
}


export const showAvailableCourses = async (studentCnie) => {
    try{
        const response = await apiGateway.get(`/enrollments/courses/${studentCnie}`);

        return response.data;
    }catch(error){
        console.error("Getting available courses failed:", error);
        throw error;
    }
}


export const handleEnrollSubmit = async (studentCnie, courseTitle) => {

    const payload = {
        studentCnie: studentCnie,
        courseTitle: courseTitle
    }

    try{
        const response = await apiGateway.post('/enrollments/enroll', payload);

        return response.data;
    }catch(error){
        console.error("Enrolling failed:", error);
        throw error;
    }
}


export const handleDeleteEnrollment = async (enrollmentId) => {
    try{
        const response = await apiGateway.delete(`/enrollments/delete/${enrollmentId}`);
        return response.status;
    }catch(error){
        console.error("Enrolling failed:", error);
        throw error;
    }
}

