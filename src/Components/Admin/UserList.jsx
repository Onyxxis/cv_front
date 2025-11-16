import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FiRefreshCcw, FiTrash2, FiUsers, FiMail, FiUser, FiStar, FiFilter, FiUserPlus } from "react-icons/fi";
import { MdAdminPanelSettings, MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
    // <div className="flex justify-center items-center my-8">
    <div className="flex justify-center items-center mt-2">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    // </div>
);

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
    const [confirmPopup, setConfirmPopup] = useState({ visible: false, userId: null, userName: "" });
    const navigate = useNavigate();


    const fetchUsers = async (endpoint = "/users") => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(endpoint);
            setUsers(response.data.utilisateurs || []);
        } catch (error) {
            console.error("Erreur de récupération :", error);
            showPopup("Erreur lors du chargement des utilisateurs", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFilterChange = async (e) => {
        const value = e.target.value;
        setFilter(value);
        setLoading(true);

        try {
            if (value === "all") {
                await fetchUsers();
            } else if (value.startsWith("role:")) {
                const role = value.split(":")[1];
                await fetchUsers(`/users/role?role=${role}`);
            } else if (value === "premium:true") {
                await fetchUsers("/users/filter?role=user&ispremium=true");
            } else if (value === "premium:false") {
                const res = await axiosInstance.get("/users");
                const allUsers = res.data.utilisateurs || [];
                const filtered = allUsers.filter((u) => u.ispremium === false);
                setUsers(filtered);
            } else if (value === "user-premium") {
                await fetchUsers("/users/filter?role=user&ispremium=true");
            }
        } catch (error) {
            console.error("Erreur lors du filtrage :", error);
            showPopup("Erreur lors du filtrage", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        setConfirmPopup({ visible: false, userId: null, userName: "" });
        setLoading(true);
        try {
            await axiosInstance.delete(`/users/${userId}`);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
            showPopup("L'utilisateur a été supprimé avec succès.", "success");
        } catch (error) {
            console.error("Erreur de suppression :", error);
            showPopup("Échec de la suppression.", "error");
        } finally {
            setLoading(false);
        }
    };

    const showPopup = (message, type) => {
        setPopup({ visible: true, message, type });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <MdAdminPanelSettings className="text-red-500" />;
            case 'user': return <FiUser className="text-blue-500" />;
            default: return <MdOutlineSecurity className="text-gray-500" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800 border-red-200';
            case 'user': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const stats = {
        total: users.length,
        premium: users.filter(u => u.ispremium).length,
        admins: users.filter(u => u.role === 'admin').length,
        regular: users.filter(u => u.role === 'user' && !u.ispremium).length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-white p-6">
             <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-blue-800 rounded-xl text-white">
                                <FiUsers size={28} />
                            </div>
                            Gestion des Utilisateurs
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Gérez et surveillez tous les utilisateurs de votre plateforme
                        </p>
                    </div>

                    <button
                        onClick={() => fetchUsers()}
                        className="flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-800 hover:bg-blue-800 font-medium"
                    >
                        <FiRefreshCcw className={loading ? "animate-spin" : ""} />

                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Utilisateurs */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-center items-center">

                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                )}
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <FiUsers className="text-blue-600" size={24} />
                            </div>
                        </div>

                    </div>

                    {/* Utilisateurs Premium */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-center items-center">

                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Utilisateurs Premium</p>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.premium}</p>)}

                            </div>
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <FiStar className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Administrateurs */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-center items-center">

                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                                {loading ? (
                                    <Spinner />
                                ) : (<p className="text-2xl font-bold text-gray-900 mt-1">{stats.admins}</p>
                                )}
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <MdAdminPanelSettings className="text-red-600" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Utilisateurs Réguliers */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-center items-center">

                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Utilisateurs Réguliers</p>
                                {loading ? (
                                    <Spinner />
                                ) : (<p className="text-2xl font-bold text-gray-900 mt-1">{stats.regular}</p>
                                )}
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <FiUser className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Filter Section */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <FiFilter className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Filtrer les utilisateurs</h3>
                                <p className="text-sm text-gray-600">Affinez votre recherche selon différents critères</p>
                            </div>
                        </div>

                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm min-w-[250px]"
                            disabled={loading}
                        >
                            <option value="all"> Tous les utilisateurs</option>
                            <option value="role:user"> Utilisateurs standard</option>
                            <option value="role:admin"> Administrateurs</option>
                            <option value="premium:true"> Premium uniquement</option>
                            <option value="premium:false">Non Premium</option>
                            <option value="user-premium"> Utilisateurs premium</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-800 to-blue-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Utilisateur</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Rôle</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Statut</th>
                                        <th className="px-6 py-4 text-center text-white font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-blue-50 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                                                            {user.username?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{user.username}</p>
                                                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FiMail className="text-gray-400" size={16} />
                                                        <span className="text-gray-700">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                                                        {getRoleIcon(user.role)}
                                                        <span className="font-medium capitalize">{user.role}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.ispremium ? (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                                                            <FiStar size={14} />
                                                            <span className="font-medium">Premium</span>
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                                                            <FiUser size={14} />
                                                            <span className="font-medium">Standard</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setConfirmPopup({
                                                                visible: true,
                                                                userId: user.id,
                                                                userName: user.username
                                                            })}
                                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                                                            title="Supprimer l'utilisateur"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-500">
                                                    <FiUsers size={48} className="mb-4 text-gray-300" />
                                                    <p className="text-lg font-medium mb-2">Aucun utilisateur trouvé</p>
                                                    <p className="text-sm">
                                                        Aucun utilisateur ne correspond à vos critères de filtrage.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Popup */}
            {confirmPopup.visible && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform animate-scale-in">
                        <div className="text-center mb-2">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <FiTrash2 className="text-red-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Confirmer la suppression
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>"{confirmPopup.userName}"</strong> ?
                                Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmPopup({ visible: false, userId: null, userName: "" })}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => handleDeleteUser(confirmPopup.userId)}
                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 font-medium"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => navigate("/admin/ajout-utilisateur")}
                className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-700 to-blue-800 text-white p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 group"
            >
                <div className="relative">
                    <FiUserPlus size={22} className="transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>

            </button>

            {/* Notification Popup */}
            {popup.visible && (
                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg border-l-4 ${popup.type === "success"
                    ? "bg-green-50 text-green-800 border-green-500"
                    : "bg-red-50 text-red-800 border-red-500"
                    } animate-slide-down`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${popup.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}>
                            {popup.type === "success" ? "✓" : "!"}
                        </div>
                        <span className="font-medium">{popup.message}</span>
                    </div>
                </div>
            )}
        </div>


    );
};

export default UserList;