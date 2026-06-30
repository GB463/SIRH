import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function CongesIndex() {
    const { demandes, auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        date_debut: "",
        date_fin: "",
        motif: "",
    });

    const isGestionnaire = auth?.user?.role === "DIRECTEUR" || auth?.user?.role === "ADMIN_RH";

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/conges", form, {
            onSuccess: () => {
                setShowModal(false);
                setForm({ date_debut: "", date_fin: "", motif: "" });
            },
        });
    };

    const handleApprouver = (id) => {
        router.put(`/conges/${id}/approuver`);
    };

    const handleRejeter = (id) => {
        const commentaire = prompt("Motif du rejet (optionnel) :");
        router.put(`/conges/${id}/rejeter`, { commentaire });
    };

    const statutColor = {
        EN_ATTENTE: "bg-yellow-100 text-yellow-800",
        APPROUVE: "bg-green-100 text-green-800",
        REJETE: "bg-red-100 text-red-800",
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-800">
                        SIRH - Gestion des congés
                    </h1>
                    <a href="/dashboard" className="text-blue-600 hover:underline">
                        Retour au tableau de bord
                    </a>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isGestionnaire ? "Demandes de congé" : "Mes demandes de congé"}
                    </h2>
                    {!isGestionnaire && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            + Nouvelle demande
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {isGestionnaire && (
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Employé</th>
                                )}
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Du</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Au</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Motif</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Statut</th>
                                {isGestionnaire && (
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {demandes?.map((demande) => (
                                <tr key={demande.id}>
                                    {isGestionnaire && (
                                        <td className="px-6 py-4">
                                            {demande.employe?.prenom} {demande.employe?.nom}
                                        </td>
                                    )}
                                    <td className="px-6 py-4">{demande.date_debut}</td>
                                    <td className="px-6 py-4">{demande.date_fin}</td>
                                    <td className="px-6 py-4">{demande.motif}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${statutColor[demande.statut]}`}>
                                            {demande.statut}
                                        </span>
                                    </td>
                                    {isGestionnaire && demande.statut === "EN_ATTENTE" && (
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleApprouver(demande.id)}
                                                className="text-green-600 hover:underline mr-3"
                                            >
                                                Approuver
                                            </button>
                                            <button
                                                onClick={() => handleRejeter(demande.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Rejeter
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Nouvelle demande de congé</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm text-gray-600 mb-1">Date de début</label>
                            <input
                                type="date"
                                value={form.date_debut}
                                onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
                                className="w-full mb-3 px-3 py-2 border rounded-lg"
                                required
                            />
                            <label className="block text-sm text-gray-600 mb-1">Date de fin</label>
                            <input
                                type="date"
                                value={form.date_fin}
                                onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
                                className="w-full mb-3 px-3 py-2 border rounded-lg"
                                required
                            />
                            <label className="block text-sm text-gray-600 mb-1">Motif</label>
                            <textarea
                                value={form.motif}
                                onChange={(e) => setForm({ ...form, motif: e.target.value })}
                                className="w-full mb-4 px-3 py-2 border rounded-lg"
                                rows="3"
                                required
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Soumettre
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}