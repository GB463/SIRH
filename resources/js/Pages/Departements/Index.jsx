import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function DepartementsIndex() {
    const { departements, auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editingDep, setEditingDep] = useState(null);
    const [form, setForm] = useState({
        nom: "",
        description: "",
    });

    const isAdmin = auth.user.role === "ADMIN_RH";

    function openCreateModal() {
        setEditingDep(null);
        setForm({ nom: "", description: "" });
        setShowModal(true);
    }

    function openEditModal(dep) {
        setEditingDep(dep);
        setForm({ nom: dep.nom, description: dep.description || "" });
        setShowModal(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editingDep) {
            router.put("/departements/" + editingDep.id, form, {
                onSuccess: function () {
                    setShowModal(false);
                },
            });
        } else {
            router.post("/departements", form, {
                onSuccess: function () {
                    setShowModal(false);
                },
            });
        }
    }

    function handleDelete(id) {
        if (confirm("Voulez-vous vraiment supprimer ce departement ?")) {
            router.delete("/departements/" + id);
        }
    }

    function closeModal() {
        setShowModal(false);
    }

    function handleNomChange(e) {
        setForm({ ...form, nom: e.target.value });
    }

    function handleDescriptionChange(e) {
        setForm({ ...form, description: e.target.value });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-800">SIRH - Gestion des departements</h1>
                    <a href="/dashboard" className="text-blue-600 hover:underline">Retour au tableau de bord</a>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Liste des departements</h2>
                    {isAdmin && (
                        <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            + Nouveau departement
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nombre d'employes</th>
                                {isAdmin && (
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {departements.map(function (dep) {
                                return (
                                    <tr key={dep.id}>
                                        <td className="px-6 py-4 font-medium">{dep.nom}</td>
                                        <td className="px-6 py-4">{dep.description || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{dep.employes_count}</span>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4">
                                                <button onClick={function () { openEditModal(dep); }} className="text-blue-600 hover:underline mr-3">Modifier</button>
                                                <button onClick={function () { handleDelete(dep.id); }} className="text-red-600 hover:underline">Supprimer</button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">{editingDep ? "Modifier le departement" : "Nouveau departement"}</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm text-gray-600 mb-1">Nom</label>
                            <input type="text" value={form.nom} onChange={handleNomChange} className="w-full mb-3 px-3 py-2 border rounded-lg" required />
                            <label className="block text-sm text-gray-600 mb-1">Description</label>
                            <textarea value={form.description} onChange={handleDescriptionChange} className="w-full mb-4 px-3 py-2 border rounded-lg" rows="3" />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600">Annuler</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">{editingDep ? "Modifier" : "Creer"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}