import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { AnimatedBorderButton } from '../components/AnimatedBorderButton'
import {AlertCircle, ArrowBigDown, Book, BookX, CheckCircle, CircleAlert, CircleCheck, CircleCheckBig, XCircle} from 'lucide-react'
import {submitCnieAlone, showAvailableCourses, handleEnrollSubmit, handleDeleteEnrollment} from '../api/enrollement.service.api';
import { AnimatedBorderDeleteButton } from "../components/AnimatedBorderDeleteButton";
import { HttpStatusCode } from "axios";



export const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [showCoursesSelect, setShowCoursesSelect] = useState(false);

    const [cnie, setCnie] = useState("");

    const [courseSelected, setCourseSelected] = useState("");

    const [submitStatus, setSubmitStatue] = useState({
        type: null,
        message: ""
    });

    const [enrollments, setEnrollments] = useState([]);

    const [availableCourse, setAvailableCourse] = useState([]);

    const [enrollmentId, setEnrollmentId] = useState(null);

    const handleGetMyCourses = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        if(cnie === ""){
            setSubmitStatue({type: "error", message: "Enter you cnie to see your enrollments."});
            return;
        }

        try{
            const result = await submitCnieAlone(cnie);


            if(result !=  null){
                setEnrollments(prev => [...prev, ...result]);
            }

        }catch(error){
            setSubmitStatue({type: "error", message: error});
        }finally{
            setIsLoading(false);
        }
    };

    const getAvailableCourses = async(e) =>{
        e.preventDefault();


        if(cnie === ""){
            setSubmitStatue({type: "error", message: "Enter you cnie to see available courses."});
            return;
        }else{
            try{
                const result = await showAvailableCourses(cnie);

                if(result !== null && result!==""){
                    setAvailableCourse(prev => [...prev, ...result]);
                    setShowCoursesSelect(true);
                }

            }catch(error){
                setSubmitStatue({type: "error", message: error});
            }
        }

        
    };

    const handleEnroll = async(e) =>{
        e.preventDefault();

        setIsLoading(true);

        try{
            const result = await handleEnrollSubmit(cnie, courseSelected);

            if(result !== null){
                setEnrollments(prev => [...prev, result]);
                setAvailableCourse(prev => prev.filter(c => c !== courseSelected))
            }

        }catch(error){
            setSubmitStatue({type: "error", message: error});
        }finally{
            setIsLoading(false);
        }
    };

    

    const handleUnenroll = async(enrollmentId) =>{

        try{
            const enrollmentToRemove = enrollments.find(e => e.enrollmentId === enrollmentId);

            const result = await handleDeleteEnrollment(enrollmentId);

            if(result === HttpStatusCode.NoContent){
                setEnrollments(prev => prev.filter(e => e.enrollmentId !== enrollmentId));

                if(enrollmentToRemove){
                    setAvailableCourse(prev => [...prev, enrollmentToRemove.courseName])
                }

                setSubmitStatue({type: "success", message: "Deleted Successfully"});
            }

        }catch(error){
            setSubmitStatue({type: "error", message: error});
        }
    };

    


    //For debugging
    // useEffect(() => {
    //     console.log("Enrollments updated:", enrollments);
    // }, [enrollments]);



    return(
        <main className="flex-1 flex flex-col items-center py-10 w-full px-3 sm:px-6">
            {submitStatus.type &&(
                <div className={`flex items-center gap-3 p-4 rounded-xl ${
                        submitStatus.type === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                >
                    {submitStatus.type === "success" ? (
                        <CheckCircle className="w-5 h-5 shrink-0"/>
                    ):(
                        <AlertCircle className="w-5 h-5 shrink-0"/>
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                </div>
            )}
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
                                            onChange={(event) => setCnie(event.target.value)}
                                        />
                                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                                            <Button className="w-full sm:w-auto flex justify-center gap-2" type="button" onClick={handleGetMyCourses} disabled={isLoading}>
                                                {isLoading? (
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
                                                        <span>Available Courses</span>
                                                        <ArrowBigDown className="w-5 h-5"/>
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
                                    
                                        
                                        <Button className="w-full md:w-auto flex items-center justify-center gap-2 shrink-0" type="button" disabled={isLoading} onClick={handleEnroll}>
                                            {isLoading? (
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
                        {enrollments.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-3">
                                <BookX className="w-8 h-8 opacity-50" />
                                <p>No courses found. Select a course above to enroll.</p>
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
                                        {enrollments.map((enrollment,index) => (
                                            <tr className="group bg-surface/50 hover:bg-surface transition-all duration-200 shadow-sm hover:shadow-md" key={index}>
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