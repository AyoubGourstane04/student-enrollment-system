import { AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-4 items-center justify-center min-h-[50vh]">
            <div className="relative w-full glass p-10 md:p-16 m-3 rounded-3xl border border-primary/30 animate-fade-in shadow-sm flex flex-col items-center text-center space-y-6">
                
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center shadow-inner border border-border">
                    <AlertCircle className="w-10 h-10 text-primary opacity-80" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">404</h1>
                    <h2 className="text-xl md:text-2xl font-medium text-foreground">Page Not Found</h2>
                    <p className="text-md text-muted-foreground max-w-md mx-auto">
                        Oops! We couldn't find the page you're looking for. It might have been moved, or the URL might be misspelled.
                    </p>
                </div>

                <Link 
                    to="/" 
                    className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
                >
                    <Home className="w-5 h-5" />
                    <span>Go Back Home</span>
                </Link>

            </div>
        </div>
    );
};