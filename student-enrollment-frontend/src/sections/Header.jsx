import {GraduationCap} from 'lucide-react'


export const Header = () => {
    return (
        <header className="w-full pt-10 pb-6 px-4 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-5 border border-primary/20 shadow-sm">
                <GraduationCap className="w-8 h-8 text-primary"/>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
                Enrollment System
            </h1>

            <p className='text-muted-foreground text-sm md:text-base max-w-md mx-auto'>
                Enter your CNIE to instantly view available modules and manage your course enrollments.
            </p>

        </header>
    )
};