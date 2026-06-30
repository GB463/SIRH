import { usePage, router } from "@inertiajs/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
    const { auth, stats, employesParDepartement, congesParStatut } = usePage().props;

    function handleLogout() {
        router.post("/logout");
    }

    const colors = ["#fbbf24", "#22c55e", "#ef4444"];

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-800">SIRH - ATECH CYBERSECURITE</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            {auth.user.prenom} {auth.user.nom} ({auth.user.role})
                        </span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Deconnexion
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-500 text-sm">Total Employes</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalEmployes}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-500 text-sm">Conges en attente</h3>
                        <p className="text-3xl font-bold text-orange-500">{stats.congesEnAttente}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-500 text-sm">Departements</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.totalDepartements}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Effectifs par departement</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={employesParDepartement}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nom" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Repartition des conges</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={congesParStatut}
                                    dataKey="total"
                                    nameKey="statut"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {congesParStatut.map(function (entry, index) {
                                        return <Cell key={index} fill={colors[index]} />;
                                    })}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex gap-4">
                    <a href="/employes" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">Gerer les employes</a>
                    <a href="/conges" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block">Gerer les conges</a>
                    <a href="/departements" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 inline-block">Gerer les departements</a>
                </div>
            </div>
        </div>
    );
}