import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import Notification from "./Notification";

export default function Layout({ children }) {
    const { auth, flash } = usePage().props;
    const [notification, setNotification] = useState(null);

    useEffect(function () {
        if (flash && flash.success) {
            setNotification({ message: flash.success, type: "success" });
        }
        if (flash && flash.error) {
            setNotification({ message: flash.error, type: "error" });
        }
    }, [flash]);

    function handleLogout() {
        router.post("/logout");
    }

    const isAdmin = auth.user.role === "ADMIN_RH";
    const currentPath = window.location.pathname;

    function navClass(path) {
        return "flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm " +
            (currentPath === path ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300");
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={function () { setNotification(null); }}
                />
            )}

            <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-lg">S</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white">SIRH</h1>
                            <p className="text-xs text-gray-400">ATECH CYBERSECURITE</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-600 w-9 h-9 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{auth.user.prenom[0]}{auth.user.nom[0]}</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{auth.user.prenom} {auth.user.nom}</p>
                            <span className="text-xs text-blue-400">{auth.user.role}</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-3 px-4">Menu</p>
                    <ul className="space-y-1">
                        <li>
                            <a href="/dashboard" className={navClass("/dashboard")}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/employes" className={navClass("/employes")}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Employes
                            </a>
                        </li>
                        <li>
                            <a href="/conges" className={navClass("/conges")}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Conges
                            </a>
                        </li>
                        {isAdmin && (
                            <li>
                                <a href="/departements" className={navClass("/departements")}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Departements
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition text-sm text-gray-300 hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Deconnexion
                    </button>
                </div>
            </aside>

            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}