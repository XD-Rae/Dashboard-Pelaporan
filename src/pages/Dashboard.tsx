import React from "react";
import { useDataContext } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { Users, Award, Building, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { events, users, dusun, reports } = useDataContext();
  const { user } = useAuth();

  const StatCard = ({
    title,
    value,
    icon,
    gradient,
    linkTo,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    gradient: string;
    linkTo: string;
  }) => (
    <Link to={linkTo}>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 group">
        <div
          className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition ${gradient}`}
        />
        <div className="relative p-6 flex items-center gap-5">
          <div
            className={`p-3 rounded-xl text-white ${gradient} shadow-lg`}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat datang, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Ringkasan aktivitas dan data terbaru
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Kegiatan"
          value={events.length}
          icon={<Calendar className="w-7 h-7" />}
          gradient="bg-gradient-to-r from-purple-500 to-indigo-500"
          linkTo="/events"
        />

        <StatCard
          title="Total Laporan"
          value={reports.length}
          icon={<Users className="w-7 h-7" />}
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          linkTo="/reports"
        />

        <StatCard
          title="Total Dusun"
          value={dusun.length}
          icon={<Award className="w-7 h-7" />}
          gradient="bg-gradient-to-r from-amber-500 to-orange-500"
          linkTo="/dusun"
        />

        <StatCard
          title="User"
          value={users.length}
          icon={<Building className="w-7 h-7" />}
          gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
          linkTo="/users"
        />
      </div>

      {/* Optional Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Aktivitas Terbaru
        </h2>
        <p className="text-gray-500 text-sm">
          Fitur ini bisa menampilkan kegiatan terbaru, jadwal, atau notifikasi.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
