import React, {createContext, useContext, useState, useEffect} from "react";
import {
  Event,
  Report,
  Role,
  User,
  USER,
  Dusun, // Tambahan Import Dusun
} from "../types";
import {
  eventAPI,
  reportAPI,
  roleAPI,
  userAPI,
  dusunAPI, // Tambahan Import API Dusun
} from "../services/api";
import toast from "react-hot-toast";

interface DataContextType {
  dusun: Dusun[]; // Tambahan State Type
  users: USER[];
  roles: Role[];
  events: Event[];
  reports: Report[];
  loading: boolean;
  error: string | null;

  // --- Tambahan Interface Handler Dusun ---
  addDusun: (data: Partial<Dusun>) => Promise<void>;
  updateDusun: (id: string, data: Partial<Dusun>) => Promise<void>;
  deleteDusun: (id: string) => Promise<void>;
  getDusunById: (id: string) => Promise<Dusun | undefined>;
  // ----------------------------------------

  addRole: (data: FormData) => Promise<void>;
  updateRole: (id: string, data: FormData) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  getRoleById: (id: string) => Promise<Role | undefined>;

  addUsers: (data: FormData) => Promise<void>;
  updateUsers: (id: string, data: FormData) => Promise<void>;
  deleteUsers: (id: string) => Promise<void>;
  getUsersById: (id: string) => Promise<Role | undefined>;

  addEvent: (data: FormData) => Promise<void>;
  updateEvent: (id: string, data: FormData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventById: (id: string) => Promise<Event | undefined>;

  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Mengganti state faculty menjadi aparatur
  const [dusun, setDusun] = useState<Dusun[]>([]); // Tambahan State Dusun
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<Role[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        dusunData, // Tambahan Data Destructuring
        roleData,
        userData,
        eventsData,
        reportsData,
    
      ] = await Promise.all([
        dusunAPI.getAll(), // Tambahan API Call
        roleAPI.getAll(),
        userAPI.getAll(),
        eventAPI.getAll(),
        reportAPI.getAll(),
      ]);
      setDusun(dusunData); // Set State Dusun
      setRoles(roleData);
      setUsers(userData);
      setEvents(eventsData);
      setReports(reportsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---- Dusun Handlers (TAMBAHAN) ----
  const addDusun = async (data: Partial<Dusun>) => {
    try {
      await dusunAPI.create(data);
      await fetchData();
      toast.success("Data dusun berhasil ditambahkan");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan data dusun");
      throw err;
    }
  };

  const updateDusun = async (id: string, data: Partial<Dusun>) => {
    try {
      await dusunAPI.update(id, data);
      await fetchData();
      toast.success("Data dusun berhasil diperbarui");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui data dusun");
      throw err;
    }
  };

  const deleteDusun = async (id: string) => {
    try {
      await dusunAPI.delete(id);
      await fetchData();
      toast.success("Data dusun berhasil dihapus");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus data dusun");
      throw err;
    }
  };

  const getDusunById = async (id: string): Promise<Dusun | undefined> => {
    try {
      const data = await dusunAPI.getById(id);
      return data;
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil detail data dusun");
      throw err;
    }
  };

  // ---- User Handlers ----
  const addUsers = async (data: Partial<User>) => {
    try {
      await userAPI.create(data as any);
      await fetchData();
    } catch (err) {
      toast.error("Failed to add user");
      throw err;
    }
  };

  const updateUsers = async (id: string, data: Partial<User>) => {
    try {
      await userAPI.update(id, data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to update user");
      throw err;
    }
  };

  const deleteUsers = async (id: string) => {
    try {
      await userAPI.delete(id);
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete user");
      throw err;
    }
  };

  const getUsersById = async (id: string): Promise<User | undefined> => {
    try {
      return await userAPI.getById(id);
    } catch (err) {
      toast.error("Failed to get user details");
      throw err;
    }
  };
  // ---- Roles Handlers ----
  const addRole = async (data: FormData) => {
    try {
      await roleAPI.create(data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to add role");
      throw err;
    }
  };

  const updateRole = async (id: string, data: FormData) => {
    try {
      await roleAPI.update(id, data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to update role");
      throw err;
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await roleAPI.delete(id);
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete role");
      throw err;
    }
  };

  const getRoleById = async (id: string): Promise<Role | undefined> => {
    try {
      return await roleAPI.getById(id);
    } catch (err) {
      toast.error("Failed to get role details");
      throw err;
    }
  };

  // ---- Event Handlers ----
  const addEvent = async (data: FormData) => {
    try {
      await eventAPI.create(data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to add event");
      throw err;
    }
  };

  const updateEvent = async (id: string, data: FormData) => {
    try {
      await eventAPI.update(id, data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to update event");
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await eventAPI.delete(id);
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete event");
      throw err;
    }
  };

  const getEventById = async (id: string): Promise<Event | undefined> => {
    try {
      return await eventAPI.getById(id);
    } catch (err) {
      toast.error("Failed to get event details");
      throw err;
    }
  };

  // ---- Report Handlers ----
  const addReport = async (data: FormData) => {
    try {
      await reportAPI.create(data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to add report");
      throw err;
    }
  };

  const updateReport = async (id: string, data: FormData) => {
    try {
      await reportAPI.update(id, data);
      await fetchData();
    } catch (err) {
      toast.error("Failed to update report");
      throw err;
    }
  };

  const deleteReport = async (id: string) => {
    try {
      await reportAPI.delete(id);
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete report");
      throw err;
    }
  };

  const getReportById = async (id: string): Promise<Report | undefined> => {
    try {
      return await reportAPI.getById(id);
    } catch (err) {
      toast.error("Failed to get report details");
      throw err;
    }
  };

  const value: DataContextType = {
    users,
    dusun, // Tambahan Value Dusun
    roles,
    events,
    reports,
    loading,
    error,
    // --- Tambahan Handler Dusun ---
    addDusun,
    updateDusun,
    deleteDusun,
    getDusunById,
    // -----------------------------
    addUsers,
    updateUsers,
    deleteUsers,
    getUsersById,
    addRole,
    updateRole,
    deleteRole,
    getRoleById,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    addReport,
    updateReport,
    deleteReport,
    getReportById,
    refreshData: fetchData,
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
