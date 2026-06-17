import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { AnimatedBorderButton } from '../components/AnimatedBorderButton'
import {AlertCircle, ArrowBigDown, Book, BookX, CheckCircle, CircleAlert, CircleCheck, CircleCheckBig, Search, XCircle} from 'lucide-react'
import {submitCnieAlone, showAvailableCourses, handleEnrollSubmit, handleDeleteEnrollment} from '../api/enrollement.service.api';
import { AnimatedBorderDeleteButton } from "../components/AnimatedBorderDeleteButton";
import { HttpStatusCode } from "axios";
import StatusNotification from "../components/StatusNotification";
import { useNavigate } from 'react-router-dom';



export const Main = () => {
    const [isGetMyCoursesLoading, setIsGetMyCoursesLoading] = useState(false);

    const [isEnrollLoading, setIsEnrollLoading] = useState(false);

    const [isGetCoursesLoading, setIsGetCoursesLoading] = useState(false);

    const [showCoursesSelect, setShowCoursesSelect] = useState(false);

    const [cnie, setCnie] = useState("");

    const [courseSelected, setCourseSelected] = useState("");

    const [message, setMessage] = useState({
        type: null,
        message: ""
    });

    const [enrollments, setEnrollments] = useState(null);

    const [availableCourse, setAvailableCourse] = useState([]);

    const navigate = useNavigate();



    const handleGetMyCourses = async (e) => {
        e.preventDefault();

        setIsGetMyCoursesLoading(true);
        if(cnie === ""){
            setMessage({type: "error", message: "Enter you cnie to see your enrollments."});
            setIsGetMyCoursesLoading(false);
            return;
        }

        try{
            const response = await submitCnieAlone(cnie);

            if(response?.status === HttpStatusCode.Ok) {
                setEnrollments(response?.data || []);
            }

        }catch(error){
            if(error?.response){
                const status = error.response.status;
                const serverMessage = error.response.data?.message || "An error occurred.";

                if(status === HttpStatusCode.NotFound){
                    setMessage({type: "error", message: serverMessage});
                }else if(status === HttpStatusCode.InternalServerError){
                    setMessage({ type: "error", message: "The course catalog is currently offline. Please try again later." });
                }else{
                    setMessage({ type: "error", message: `Something went wrong (Error ${status}).` });
                }
            }else{
                setMessage({ type: "error", message: "Network error. Please check your connection." });
            }
        }finally{
            setIsGetMyCoursesLoading(false);
        }
    };

    const getAvailableCourses = async(e) =>{
        e.preventDefault();

        setIsGetCoursesLoading(true);

        if(cnie === ""){
            setMessage({type: "error", message: "Enter you cnie to see available courses."});
            setIsGetCoursesLoading(false);
            return;
        }

        try{
            const response = await showAvailableCourses(cnie);

            if(response?.status === HttpStatusCode.Ok){
                if(response?.data !== null){
                    setAvailableCourse(prev => [...prev, ...response.data]);
                    setShowCoursesSelect(true);
                }else{
                    setAvailableCourse([]);
                }
            }else{
                setMessage({ type: "error", message: "Unexpected response from the server." });
            }
        }catch(error){
            if(error?.response){
                const status = error.response.status;
                const serverMessage = error.response.data?.message || "An error occurred.";

                if(status === HttpStatusCode.NotFound){
                    setMessage({type: "error", message: serverMessage});
                }else if(status === HttpStatusCode.InternalServerError){
                    setMessage({ type: "error", message: "The course catalog is currently offline. Please try again later." });
                }else{
                    setMessage({ type: "error", message: `Something went wrong (Error ${status}).` });
                }
            }else{
                setMessage({ type: "error", message: "Network error. Please check your connection." });
            }
        }finally{
            setIsGetCoursesLoading(false);
        }
    };

    const handleEnroll = async(e) =>{
        e.preventDefault();

        setIsEnrollLoading(true);

        try{
            const response = await handleEnrollSubmit(cnie, courseSelected);

            if(response?.data !== null){
                setEnrollments(prev => [...prev, response.data]);
                setAvailableCourse(prev => prev.filter(c => c !== courseSelected));
                setMessage({type: "success", message: "Enrolled Successfully"});
            }

        }catch(error){
            if(error?.response){
                const status = error.response.status;
                const serverMessage = error.response.data?.message || "An error occurred.";

                if(status === HttpStatusCode.NotFound || status === HttpStatusCode.BadRequest){
                    setMessage({type: "error", message: serverMessage});
                }else if(status === HttpStatusCode.InternalServerError){
                    setMessage({ type: "error", message: "The course catalog is currently offline. Please try again later." });
                }else{
                    setMessage({ type: "error", message: `Something went wrong (Error ${status}).` });
                }
            }else{
                setMessage({ type: "error", message: "Network error. Please check your connection." });
            }            
        }finally{
            setIsEnrollLoading(false);
        }
    };



    const handleUnenroll = async(enrollmentId) =>{

        try{
            const enrollmentToRemove = enrollments.find(e => e.enrollmentId === enrollmentId);

            const response = await handleDeleteEnrollment(enrollmentId);

            if(response?.status === HttpStatusCode.NoContent || response === HttpStatusCode.NoContent){
                setEnrollments(prev => prev.filter(e => e.enrollmentId !== enrollmentId));

                if(enrollmentToRemove){
                    setAvailableCourse(prev => [...prev, enrollmentToRemove.courseName])
                }

                setMessage({type: "success", message: "Deleted Successfully"});
            }

        }catch(error){
            if(error?.response){
                const status = error.response.status;
                const serverMessage = error.response.data?.message || "An error occurred.";

                if(status === HttpStatusCode.NotFound || status === HttpStatusCode.BadRequest){
                    setMessage({type: "error", message: serverMessage});
                }else if(status === HttpStatusCode.InternalServerError){
                    setMessage({ type: "error", message: "The course catalog is currently offline. Please try again later." });
                }else{
                    setMessage({ type: "error", message: `Something went wrong (Error ${status}).` });
                }
            }else {
                setMessage({ type: "error", message: "Network error. Please check your connection." });
            }
        }
    }


    return(
        <main className="flex-1 flex flex-col items-center py-10 w-full px-3 sm:px-6">
            <StatusNotification
                message={message}
                setMessage={setMessage}
            />
          <div className="w-full max-w-4xl flex flex-col gap-4">
            <div className="relative w-full glass p-6 md:p-8 m-3 rounded-3xl border border-primary/30 animate-fade-in overflow-hidden shadow-sm">
                <section className="space-y-6" id="form">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="cnie" className="block text-md font-medium mb-2 text-foreground">
                                        CNIE (Carte Nationale d'Identité Électronique) : 
                                    </label>
                                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                                        <input 
                                            type="text" 
                                            id="cnie"
                                            className="flex-1 w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="Enter your CNIE..."
                                            value={cnie}
                                            onChange={(event) => {
                                                setCnie(event.target.value);

                                                if(enrollments !== null){
                                                    setShowCoursesSelect(false);
                                                    setEnrollments(null);
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                                            <Button className="w-full sm:w-auto flex justify-center gap-2" type="button" onClick={handleGetMyCourses} disabled={isGetMyCoursesLoading}>
                                                {isGetMyCoursesLoading? (
                                                    <span>Getting Courses...</span>
                                                ) : (
                                                    
                                                    <>
                                                        <span>My Courses</span>
                                                        <Book className="w-5 h-5"/>
                                                    </>
                                                )}
                                            </Button>

                                            <AnimatedBorderButton onClick={getAvailableCourses}>
                                                    <div className="flex items-center gap-2">
                                                        {isGetCoursesLoading? (
                                                            <span>Getting Courses...</span>
                                                        ) : (
                                                            
                                                            <>
                                                                <span>Available Courses</span>
                                                                 <ArrowBigDown className="w-5 h-5"/>
                                                            </>
                                                        )}
                                                    </div>
                                            </AnimatedBorderButton>
                                        </div>
                                    </div>
                                </div>

                                <div id="coursesSelect" className="pt-4 border-t border-border/50" hidden={!showCoursesSelect}>
                                    <label htmlFor="courses" className="block text-md font-medium mb-2 text-foreground">
                                        Courses : 
                                    </label>
                                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                                        <div className="relative flex-1">
                                            <select 
                                                name="courses" 
                                                id="courses"
                                                defaultValue=""
                                                className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                                onChange={(e) => setCourseSelected(e.target.value)}
                                            >
                                                <option value="" disabled>Select a course</option>
                                                {availableCourse.map((course, index) => (
                                                    <option key={index}>{course}</option>
                                                ))}
                                            </select>
                                        
                                        </div>
                                    
                                        
                                        <Button className="w-full md:w-auto flex items-center justify-center gap-2 shrink-0" type="button" disabled={isEnrollLoading} onClick={handleEnroll}>
                                            {isEnrollLoading? (
                                                <span>Enrolling...</span>
                                            ) : (
                                                
                                                <>
                                                    <span>Enroll</span>
                                                    <CircleCheckBig className="w-5 h-5"/>
                                                </>
                                            )}
                                        </Button>                            
                                    </div>
                                </div>
                                
                            </form>
                </section>   
            </div>
            <div className="w-full glass p-6 md:p-8 m-3 rounded-3xl border border-primary/30 animate-fade-in shadow-sm">
                <section id="list" className="space-y-6">
                    <div className="overflow-x-auto pb-2">
                        {enrollments === null ? (
                            <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-3">
                                <Search className="w-8 h-8 opacity-50" /> 
                                <p>Enter your CNIE and click My Courses to view your enrollments.</p>
                            </div>
                        ):
                        enrollments.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-3">
                                <BookX className="w-8 h-8 opacity-50" />
                                <p>No enrollments found. Select a course above to enroll.</p>
                            </div>
                            ) : (
                            <table className="w-full min-w-150 border-separate border-spacing-y-3 text-md outline-none">
                                    <thead>
                                        <tr className="text-left text-muted-foreground text-sm uppercase tracking-wider">
                                            <th className="px-4 py-2 font-medium">Name</th>
                                            <th className="px-4 py-2 font-medium">Enrollment Date</th>
                                            <th className="px-4 py-2 font-medium text-right">Action</th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>
                                        {enrollments.sort((a,b) => b.deletable - a.deletable).map((enrollment) => (
                                            <tr className="group bg-surface/50 hover:bg-surface transition-all duration-200 shadow-sm hover:shadow-md" key={enrollment.enrollmentId}>
                                                <td className="px-4 py-4 text-foreground border-y border-l border-border group-hover:border-primary/40 rounded-l-xl font-medium">{enrollment.courseName}</td>
                                                <td className="px-4 py-4 text-muted-foreground border-y border-border group-hover:border-primary/40">{enrollment.date}</td>
                                                <td className="px-4 py-4 text-right border-y border-r border-border group-hover:border-primary/40 rounded-r-xl">
                                                    <div className="flex justify-end">
                                                        <AnimatedBorderDeleteButton disabled={!(enrollment.deletable)} onClick={() => handleUnenroll(enrollment.enrollmentId)}>
                                                            <div className="flex items-center gap-2">
                                                                <span>Unenroll</span>
                                                                <XCircle className="w-4 h-4"/>
                                                            </div>
                                                        </AnimatedBorderDeleteButton>
                                                    </div>
                                                
                                                </td>
                                            </tr>
                                        ))}
                                       
                                    </tbody>
                            </table>
                        )}
                    </div>
                
                </section>            
            </div>
        </div>
    </main>
         
    
    )
};