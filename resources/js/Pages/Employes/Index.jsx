import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "../../Components/Layout";

export default function EmployesIndex() {
    const { employes, departements, auth, errors } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editingEmploye, setEditingEmploye] = useState(null);
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "EMPLOYE",
        poste: "",
        departement_id: "",
    });

    const isAdmin = auth.user.role === "ADMIN_RH";

    function openCreateModal() {
        setEditingEmploye(null);
        setForm({ nom: "", prenom: "", email: "", password: "", role: "EMPLOYE", poste: "", departement_id: "" });
        setShowModal(true);
    }

    function openEditModal(employe) {
        setEditingEmploye(employe);
        setForm({
            nom: employe.nom,
            prenom: employe.prenom,
            email: employe.email,
            password: "",
            role: employe.role,
            poste: employe.poste || "",
            departement_id: employe.departement_id || "",
        });
        setShowModal(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editingEmploye) {
            router.put("/employes/" + editingEmploye.id, form, {
                onSuccess: function () { setShowModal(false); },
            });
        } else {
            router.post("/employes", form, {
                onSuccess: function () { setShowModal(false); },
            });
        }
    }

    function handleDelete(id) {
        if (confirm("Voulez-vous vraiment supprimer cet employe ?")) {
            router.delete("/employes/" + id);
        }
    }

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Liste des employes</h2>
                {isAdmin && (
                    <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        + Nouvel employe
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Poste</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Departement</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employes.map(function (employe) {
                            return (
                                <tr key={employe.id}>
                                    <td className="px-6 py-4">{employe.prenom} {employe.nom}</td>
                                    <td className="px-6 py-4">{employe.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{employe.role}</span>
                                    </td>
                                    <td className="px-6 py-4">{employe.poste || "-"}</td>
                                    <td className="px-6 py-4">{employe.departement ? employe.departement.nom : "-"}</td>
                                    <td className="px-6 py-4">
                                        <a href={"/pdf/attestation/" + employe.id} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline mr-3">PDF</a>
                                        {isAdmin && (
                                            <button onClick={function () { openEditModal(employe); }} className="text-blue-600 hover:underline mr-3">Modifier</button>
                                        )}
                                        {isAdmin && (
                                            <button onClick={function () { handleDelete(employe.id); }} className="text-red-600 hover:underline">Supprimer</button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
                        <h3 className="text-lg font-bold mb-4">{editingEmploye ? "Modifier l'employe" : "Nouvel employe"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" placeholder="Nom" value={form.nom} onChange={function (e) { setForm({ ...form, nom: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg" required />
                                {errors && errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder="Prenom" value={form.prenom} onChange={function (e) { setForm({ ...form, prenom: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg" required />
                                {errors && errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                            </div>
                            <div className="mb-3">
                                <input type="email" placeholder="Email" value={form.email} onChange={function (e) { setForm({ ...form, email: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg" required />
                                {errors && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            {!editingEmploye && (
                                <div className="mb-3">
                                    <input type="password" placeholder="Mot de passe (min 6 caracteres)" value={form.password} onChange={function (e) { setForm({ ...form, password: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg" required />
                                    {errors && errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                            )}
                            <div className="mb-3">
                                <select value={form.role} onChange={function (e) { setForm({ ...form, role: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg">
                                    <option value="EMPLOYE">Employe</option>
                                    <option value="DIRECTEUR">Directeur</option>
                                    <option value="ADMIN_RH">Administrateur RH</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder="Poste" value={form.poste} onChange={function (e) { setForm({ ...form, poste: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <select value={form.departement_id} onChange={function (e) { setForm({ ...form, departement_id: e.target.value }); }} className="w-full px-3 py-2 border rounded-lg">
                                    <option value="">Aucun departement</option>
                                    {departements.map(function (dep) {
                                        return <option key={dep.id} value={dep.id}>{dep.nom}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={function () { setShowModal(false); }} className="px-4 py-2 text-gray-600">Annuler</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">{editingEmploye ? "Modifier" : "Creer"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}