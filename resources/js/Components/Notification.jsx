import { useEffect } from "react";

export default function Notification({ message, type, onClose }) {
    useEffect(function () {
        const timer = setTimeout(function () {
            onClose();
        }, 3000);
        return function () { clearTimeout(timer); };
    }, []);

    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    return (
        <div className={"fixed top-6 right-6 z-50 px-6 py-4 rounded-xl text-white shadow-lg flex items-center gap-3 " + (colors[type] || colors.info)}>
            {type === "success" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            )}
            {type === "error" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            <span className="text-sm font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}