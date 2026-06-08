import { ServerCrash, RefreshCcw, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ServerError = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-4xl flex flex-col gap-4 items-center justify-center min-h-[50vh]">
            <div className="relative w-full glass p-10 md:p-16 m-3 rounded-3xl border border-red-500/30 animate-fade-in shadow-sm flex flex-col items-center text-center space-y-6">
                
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center shadow-inner border border-red-500/20">
                    <ServerCrash className="w-10 h-10 text-red-500 opacity-80" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">500</h1>
                    <h2 className="text-xl md:text-2xl font-medium text-foreground">Internal Server Error</h2>
                    <p className="text-md text-muted-foreground max-w-md mx-auto">
                        Oops! Our servers seem to be experiencing a hiccup right now. Our technical team has been notified. Please try again in a few minutes.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        <span>Try Again</span>
                    </button>
                    
                    <Link 
                        to="/" 
                        className="px-6 py-3 border border-border bg-surface text-foreground rounded-xl hover:bg-surface-hover transition-all flex items-center gap-2 font-medium"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go Home</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};