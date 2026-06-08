import { AlertCircle, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function StatusNotification ({message, setMessage}){
    useEffect(() => {
        if(message && message.type){
            const timer = setTimeout(() => {
                setMessage({ type: null, message: ""});
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if(!message || !message.type) return null;

    return (<div className={`flex items-center gap-3 p-4 rounded-xl ${
                    message.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
            >
                {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0"/>
                ):(
                    <AlertCircle className="w-5 h-5 shrink-0"/>
                )}
                <p className="text-sm">{message.message}</p>
            </div>
            
    )
}