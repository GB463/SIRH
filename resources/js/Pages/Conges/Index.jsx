import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "../../Components/Layout";

export default function CongesIndex() {
    const { demandes, auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ date_debut: "", date_fin: "", motif: "" });

    const isGestionnaire = auth.user.role === "DIRECTEUR" || auth.user.role === "ADMIN_RH";

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/conges", form, {
            onSuccess: function () {
                setShowModal(false);
                setForm({ date_debut: "", date_fin: "", motif: "" });
            },
        });
    }

    function handleApprouver(id) {
        router.put("/conges/" + id + "/approuver");
    }

    function handleRejeter(id) {
        const commentaire = prompt("Motif du rejet (optionnel) :");
        router.put("/conges/" + id + "/rejeter", { commentaire });
    }

    const statutColor = {
        EN_ATTENTE: "bg-yellow-100 text-yellow-800",
        APPROUVE: "bg-green-100 text-green-800",
        REJETE: "bg-red-100 text-red-800",
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {isGestionnaire ? "Demandes de conge" : "Mes demandes de conge"}
                </h2>
                {!isGestionnaire && (
                    <button onClick={function () { setShowModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        + Nouvelle demande
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {isGestionnaire && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Employe</th>}
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Du</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Au</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Motif</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Statut</th>
                            {isGestionnaire && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {demandes.map(function (demande) {
                            return (
                                <tr key={demande.id}>
                                    {isGestionnaire && (
                                        <td className="px-6 py-4">{demande.employe ? demande.employe.prenom + " " + demande.employe.nom : "-"}</td>
                                    )}
                                    <td className="px-6 py-4">{demande.date_debut}</td>
                                    <td className="px-6 py-4">{demande.date_fin}</td>
                                    <td className="px-6 py-4">{demande.motif}</td>
                                    <td className="px-6 py-4">
                                        <span className={"px-2 py-1 rounded text-xs " + (statutColor[demande.statut] || "")}>{demande.statut}</span>
                                    </td>
                                    {isGestionnaire && demande.statut === "EN_ATTENTE" && (
                                        <td className="px-6 py-4">
                                            <button onClick={function () { handleApprouver(demande.id); }} className="text-green-600 hover:underline mr-3">Approuver</button>
                                            <button onClick={function () { handleRejeter(demande.id); }} className="text-red-600 hover:underline">Rejeter</button>
                                        </td>
                                    )}
                                    {isGestionnaire && demande.statut !== "EN_ATTENTE" && (
                                        <td className="px-6 py-4">-</td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Nouvelle demande de conge</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm text-gray-600 mb-1">Date de debut</label>
                            <input type="date" value={form.date_debut} onChange={function (e) { setForm({ ...form, date_debut: e.target.value }); }} className="w-full mb-3 px-3 py-2 border rounded-lg" required />
                            <label className="block text-sm text-gray-600 mb-1">Date de fin</label>
                            <input type="date" value={form.date_fin} onChange={function (e) { setForm({ ...form, date_fin: e.target.value }); }} className="w-full mb-3 px-3 py-2 border rounded-lg" required />
                            <label className="block text-sm text-gray-600 mb-1">Motif</label>
                            <textarea value={form.motif} onChange={function (e) { setForm({ ...form, motif: e.target.value }); }} className="w-full mb-4 px-3 py-2 border rounded-lg" rows="3" required />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={function () { setShowModal(false); }} className="px-4 py-2 text-gray-600">Annuler</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Soumettre</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}