import { apiGateway } from "./axiosConfig";

export const submitCnieAlone = async (studentCnie) => {
        const response = await apiGateway.get(`/enrollments/student-cnie/${studentCnie}`);
        return response;
}


export const showAvailableCourses = async (studentCnie) => {
        const response = await apiGateway.get(`/enrollments/courses/${studentCnie}`);
        return response;
}


export const handleEnrollSubmit = async (studentCnie, courseTitle) => {

    const payload = {
        studentCnie: studentCnie,
        courseTitle: courseTitle
    }

    const response = await apiGateway.post('/enrollments/enroll', payload);
    return response;

}


export const handleDeleteEnrollment = async (enrollmentId) => {
        const response = await apiGateway.delete(`/enrollments/delete/${enrollmentId}`);
        return response;
}


