import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
    PointElement,
} from "chart.js";
import {
    FiUsers,
    FiActivity,
    FiStar,
    FiFileText,
    FiTarget,
    FiAward,
    FiTrendingUp,
    FiPieChart,
    FiBarChart2,
    FiLayers
} from "react-icons/fi";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
    PointElement
);

// Spinner amélioré
const Spinner = () => (
    <div className="flex justify-center items-center py-12">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

// Carte de statistique
const StatCard = ({ title, value, subtitle, icon, color, trend, loading }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                {loading ? (
                    <div className="h-8 flex items-center">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                        {subtitle && (
                            <p className="text-gray-400 text-xs">{subtitle}</p>
                        )}
                    </>
                )}
            </div>
            <div className={`p-3 rounded-lg ${color} ml-4`}>
                {icon}
            </div>
        </div>
        {trend && !loading && (
            <div className={`text-xs font-medium ${trend.color} flex items-center gap-1 mt-3`}>
                {trend.icon} {trend.value}
            </div>
        )}
    </div>
);

// Composant de graphique avec loading
const ChartContainer = ({ title, icon, children, loading, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                {icon}
            </div>
        </div>
        {loading ? <Spinner /> : children}
    </div>
);

const Statistique = () => {
    const [roleStats, setRoleStats] = useState(null);
    const [premiumStats, setPremiumStats] = useState(null);
    const [activityStats, setActivityStats] = useState(null);
    const [completionStats, setCompletionStats] = useState(null);
    const [templateStats, setTemplateStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cardsLoading, setCardsLoading] = useState(true);

    // Palette de couleurs harmonieuse avec le bleu
    const chartColors = {
        primary: ['#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8', '#2563EB'],
        secondary: ['#10B981', '#34D399', '#6EE7B7', '#047857', '#059669'],
        accent: ['#F59E0B', '#FBBF24', '#FCD34D', '#D97706', '#EA580C'],
        neutral: ['#092B70FF', '#8CA4CCFF', '#3964A3FF', '#4B5563', '#374151'],
        gradient: {
            blue: ['#3B82F6', '#60A5FA', '#93C5FD'],
            green: ['#10B981', '#34D399', '#6EE7B7'],
            orange: ['#F59E0B', '#FBBF24', '#FCD34D']
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setCardsLoading(true);

            const [roles, premium, freemium, allUsers, allCVs, completion, templates] = await Promise.all([
                axiosInstance.get("/users/stats/roles"),
                axiosInstance.get("/users/premium/true"),
                axiosInstance.get("/users/premium/false"),
                axiosInstance.get("/users"),
                axiosInstance.get("/cvs"),
                axiosInstance.get("/cvs/stats/completion_tranches"),
                axiosInstance.get("/templates")
            ]);

            setRoleStats(roles.data.data);
            setPremiumStats({
                premium: premium.data.length,
                freemium: freemium.data.length
            });

            const usersWithCV = new Set(allCVs.data.cvs.map((cv) => cv.user_id));
            setActivityStats({
                active: usersWithCV.size,
                inactive: allUsers.data.utilisateurs.length - usersWithCV.size,
                total: allUsers.data.utilisateurs.length
            });

            setCompletionStats(completion.data);

            const countByTemplate = {};
            allCVs.data.cvs.forEach((cv) => {
                const templateName = templates.data.templates.find(t => t.id === cv.template_id)?.name || "Aucun template";
                countByTemplate[templateName] = (countByTemplate[templateName] || 0) + 1;
            });
            setTemplateStats(countByTemplate);

        } catch (error) {
            console.error("Erreur lors du chargement des statistiques:", error);
        } finally {
            setLoading(false);
            setCardsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalCVs = Object.values(templateStats || {}).reduce((a, b) => a + b, 0);
    const activePercentage = activityStats ? ((activityStats.active / activityStats.total) * 100).toFixed(1) : 0;
    const premiumPercentage = premiumStats ? ((premiumStats.premium / activityStats?.total) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-fit p-3 bg-blue-800 rounded-xl text-white flex items-center justify-center">
                        <FiPieChart size={28} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Tableau de Bord Analytics
                        </h1>
                        <p className="text-gray-600">
                            Vue d'ensemble des performances et statistiques de la plateforme
                        </p>
                    </div>
                </div>
            </div>




            {/* Cartes de statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Utilisateurs Totaux"
                    value={activityStats?.total || 0}
                    subtitle="Inscrits sur la plateforme"
                    icon={<FiUsers className="text-blue-600 text-xl" />}
                    color="bg-blue-50"
                    loading={cardsLoading}
                />
                <StatCard
                    title="Utilisateurs Actifs"
                    value={activityStats?.active || 0}
                    subtitle="Avec au moins 1 CV créé"
                    icon={<FiActivity className="text-green-600 text-xl" />}
                    color="bg-green-50"
                    trend={{
                        value: `${activePercentage}%`,
                        color: "text-green-600",
                        icon: <FiTrendingUp className="inline" />
                    }}
                    loading={cardsLoading}
                />
                <StatCard
                    title="Utilisateurs Premium"
                    value={premiumStats?.premium || 0}
                    subtitle="Abonnés premium"
                    icon={<FiStar className="text-amber-600 text-xl" />}
                    color="bg-amber-50"
                    trend={{
                        value: `${premiumPercentage}%`,
                        color: "text-amber-600",
                        icon: <FiTrendingUp className="inline" />
                    }}
                    loading={cardsLoading}
                />
                <StatCard
                    title="CV Créés"
                    value={totalCVs}
                    subtitle="Total des CV générés"
                    icon={<FiFileText className="text-violet-600 text-xl" />}
                    color="bg-violet-50"
                    loading={cardsLoading}
                />
            </div>

            {/* Grille des graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Répartition par Rôle */}
                <ChartContainer
                    title="Répartition par Rôle"
                    icon={<FiTarget className="text-blue-600 text-lg" />}
                    loading={!roleStats}
                >
                    <div className="h-64">
                        <Doughnut
                            data={{
                                labels: roleStats?.map((r) => r.role) || [],
                                datasets: [
                                    {
                                        data: roleStats?.map((r) => r.count) || [],
                                        backgroundColor: chartColors.primary,
                                        borderColor: 'white',
                                        borderWidth: 3,
                                        borderRadius: 8,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '60%',
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            usePointStyle: true,
                                            font: {
                                                size: 11
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartContainer>

                {/* Premium vs Non Premium */}
                <ChartContainer
                    title="Répartition des Abonnements"
                    icon={<FiAward className="text-green-600 text-lg" />}
                    loading={!premiumStats}
                >
                    <div className="h-64">
                        <Pie
                            data={{
                                labels: ["Premium", "Free"],
                                datasets: [
                                    {
                                        data: [premiumStats?.premium || 0, premiumStats?.freemium || 0],
                                        backgroundColor: [chartColors.primary[0], chartColors.neutral[2]],
                                        borderColor: 'white',
                                        borderWidth: 3,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            usePointStyle: true,
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartContainer>

                {/* Taux d'activité */}
                <ChartContainer
                    title="Taux d'Activité des Utilisateurs"
                    icon={<FiTrendingUp className="text-violet-600 text-lg" />}
                    loading={!activityStats}
                >
                    <div className="h-64">
                        <Bar
                            data={{
                                labels: ["Actifs", "Inactifs"],
                                datasets: [
                                    {
                                        label: 'Utilisateurs',
                                        data: [activityStats?.active || 0, activityStats?.inactive || 0],
                                        backgroundColor: [chartColors.secondary[0], chartColors.neutral[0]],
                                        borderRadius: 8,
                                        borderWidth: 0,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(0, 0, 0, 0.05)'
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            }
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartContainer>

                {/* Complétion des CV - Diagramme en ligne unique */}
                <ChartContainer
                    title="Progression de Complétion des CV"
                    icon={<FiPieChart className="text-amber-600 text-lg" />}
                    loading={!completionStats}
                >
                    <div className="h-64">
                        <Line
                            data={{
                                labels: Object.keys(completionStats || {}).map(key => {
                                    const ranges = {
                                        '0-25': '0-25%',
                                        '25-50': '25-50%',
                                        '50-75': '50-75%',
                                        '75-100': '75-100%'
                                    };
                                    return ranges[key] || key;
                                }),
                                datasets: [
                                    {
                                        label: 'Nombre de CV',
                                        data: Object.values(completionStats || {}),
                                        borderColor: chartColors.accent[0],
                                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                        tension: 0.4,
                                        fill: true,
                                        pointBackgroundColor: chartColors.accent[0],
                                        pointBorderColor: 'white',
                                        pointBorderWidth: 2,
                                        pointRadius: 6,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(0, 0, 0, 0.05)'
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            }
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartContainer>

                {/* Utilisation des Templates */}
                <ChartContainer
                    title="Popularité des Templates"
                    icon={<FiLayers className="text-indigo-600 text-lg" />}
                    loading={!templateStats}
                    className="lg:col-span-2"
                >
                    <div className="h-80">
                        <Bar
                            data={{
                                labels: Object.keys(templateStats || {}),
                                datasets: [
                                    {
                                        label: 'Nombre de CV',
                                        data: Object.values(templateStats || {}),
                                        backgroundColor: chartColors.primary[0],
                                        borderRadius: 6,
                                        borderWidth: 0,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(0, 0, 0, 0.05)'
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            }
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            font: {
                                                size: 11
                                            },
                                            maxRotation: 45,
                                            minRotation: 45
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartContainer>
            </div>
        </div>
    );
};

export default Statistique;