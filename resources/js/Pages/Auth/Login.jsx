import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        router.post("/login", form, {
            onFinish: function () { setLoading(false); }
        });
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">SIRH</h1>
                    <p className="text-gray-500 text-sm mt-1">ATECH CYBERSECURITE</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={function (e) { setForm({ ...form, email: e.target.value }); }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={function (e) { setForm({ ...form, password: e.target.value }); }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}