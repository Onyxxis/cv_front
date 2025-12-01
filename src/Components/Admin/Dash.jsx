
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import {
  FiUsers,
  FiFileText,
  FiCheckCircle,
  FiBarChart2,
  FiPlus,
  FiEdit,
  FiMessageSquare,
  FiTrendingUp,
  FiArrowUp
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const Dash = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalCVs, setTotalCVs] = useState(null);
  const [recentCVs, setRecentCVs] = useState(null);
  const [completionData, setCompletionData] = useState(null);
  const [loadingCompletion, setLoadingCompletion] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTemplates, setTotalTemplates] = useState(null);

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Spinner />
        <span className="mt-2 text-gray-700 font-medium">Chargement...</span>
      </div>
    );
  }



  const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA"];


  const fetchTotalTemplates = async () => {
    try {
      const response = await axiosInstance.get("/templates");
      if (response.data.total !== undefined) {
        setTotalTemplates(response.data.total);
      } else {
        setTotalTemplates(response.data.templates.length);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération du total de templates :", err);
    }
  };


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, cvsRes, recentRes] = await Promise.all([
          axiosInstance.get("/users/count"),
          axiosInstance.get("/cvs/count"),
          axiosInstance.get("/cvs/recent?limit=4")
        ]);

        setTotalUsers(usersRes.data.total_utilisateurs || 0);
        setTotalCVs(cvsRes.data.total_cvs || 0);

        const recentCVsData = recentRes.data || [];

        // Pour chaque CV, récupérer le nom de l'utilisateur
        const recentCVsWithUsernames = await Promise.all(
          recentCVsData.map(async (cv) => {
            try {
              const userRes = await axiosInstance.get(`/users/${cv.user_id}`);
              return {
                ...cv,
                username: userRes.data.name || userRes.data.username || "Utilisateur inconnu"
              };
            } catch (err) {
              console.error(`Erreur récupération utilisateur ${cv.user_id}:`, err);
              return { ...cv, username: "Utilisateur inconnu" };
            }
          })
        );

        setRecentCVs(recentCVsWithUsernames);
      } catch (error) {
        console.error("Erreur chargement dashboard:", error);
        setTotalUsers(0);
        setTotalCVs(0);
        setRecentCVs([]);
      }
    };


    fetchDashboardData();
  }, []);

  const stats = [
    { title: "Utilisateurs", value: totalUsers, icon: <FiUsers className="w-6 h-6" />, color: "blue" },
    { title: "CVs générés", value: totalCVs, icon: <FiFileText className="w-6 h-6" />, color: "blue" },
    { title: "Template disponible", value: totalTemplates, icon: <FiCheckCircle className="w-6 h-6" />, color: "blue" },
    { title: "Score ATS moyen", value: "78%", change: "+5%", icon: <FiBarChart2 className="w-6 h-6" />, color: "blue" }
  ];

  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        const res = await axiosInstance.get("/cvs/stats/completion_tranches");
        const formattedData = Object.entries(res.data).map(([key, value]) => ({
          tranche: key,
          count: value
        }));
        setCompletionData(formattedData);
      } catch (error) {
        console.error("Erreur chargement tranches de complétion:", error);
        setCompletionData([]);
      } finally {
        setLoadingCompletion(false);
      }
    };
    fetchTotalTemplates();
    fetchCompletionData();
  }, []);

  const performanceData = [
    { name: "Lun", score: 65 },
    { name: "Mar", score: 72 },
    { name: "Mer", score: 68 },
    { name: "Jeu", score: 80 },
    { name: "Ven", score: 78 },
    { name: "Sam", score: 85 },
    { name: "Dim", score: 82 }
  ];

  useEffect(() => {
    const fetchUserRoleStats = async () => {
      try {
        const res = await axiosInstance.get("/users/stats/roles");
        const formattedData = res.data.data.map(item => ({
          name: item.role,
          value: item.count
        }));
        setPieData(formattedData);
      } catch (error) {
        console.error("Erreur récupération stats utilisateurs :", error);
        setPieData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleStats();
  }, []);


  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  const getStatusColor = (status) => {
    const statusMap = {
      "Optimisé": "bg-green-100 text-green-700",
      "En cours": "bg-blue-100 text-blue-700",
      "À améliorer": "bg-amber-100 text-amber-700",
      "Critique": "bg-red-100 text-red-700"
    };
    return statusMap[status] || "bg-gray-100 text-gray-700";
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="relative">
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-10"></div> */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Bonjour {user?.username || " "}, Bienvenue sur votre tableau de Bord Admin
                  </h1>
                  <div className="text-gray-600 mt-2 text-lg">
                    Aperçu complet des performances et activités
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-2xl">
                  <FiTrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Performance élevée</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm font-medium">{stat.title}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value === null ? <Spinner /> : stat.value}
                    </div>
                  </div>
                  <div className={`p-3 bg-${stat.color}-50 rounded-2xl`}>
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques Principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">CVs par tranche de complétion</h2>
            </div>

            {loadingCompletion ? (
              <div className="flex items-center justify-center h-72">
                <Spinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={completionData}>
                  <XAxis dataKey="tranche" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Nombre de CVs">
                    {completionData.map((entry, index) => {
                      const colors = ["#3B82F6", "#60A5FA", "#4C1D95", "#2563EB"];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Graphique en secteurs et performance */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Répartition des Utilisateurs</h2>
              {loading ? (
                <div className="flex items-center justify-center h-72">
                  <Spinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Hebdomadaire</h2>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-4 lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Derniers CVs Générés</h2>
            </div>
            {recentCVs === null ? (
              <div className="flex items-center justify-center h-72">
                <Spinner />
              </div>
            ) : (
              recentCVs.map((cv, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FiFileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cv.title}</h3>
                      <div className="text-sm text-gray-500">
                        {cv.username} • {new Date(cv.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cv.is_completed ? "Complété" : "En cours")}`}
                    >
                      {cv.is_completed ? "Complété" : "En cours"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(cv.completion_percentage)}`}
                    >
                      {cv.completion_percentage}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>


          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-6">Actions Rapides</h2>
            <div className="space-y-4">
              {[
                { icon: <FiPlus />, label: "Créer Nouvel utilisateur", link: "/admin/utilisateurs" },
                { icon: <FiEdit />, label: "Créer Template", link: "/admin/template-liste" },
                { icon: <FiMessageSquare />, label: "Créer Conseil", link: "/admin/conseils" },
                { icon: <FiTrendingUp />, label: "Voir Analytics", link: "/admin/statistique" }
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.link)}
                  className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl">{action.icon}</div>
                    <span className="font-semibold">{action.label}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiArrowUp className="w-4 h-4 transform -rotate-45" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dash;
