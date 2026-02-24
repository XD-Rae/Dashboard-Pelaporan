import React from "react";
import {Routes, Route} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../pages/Dashboard";
import EventList from "../../pages/events/EventList";
import EventDetail from "../../pages/events/EventDetail";
import EventForm from "../../pages/events/EventForm";
import ReportList from "../../pages/reports/ReportList";
import ReportForm from "../../pages/reports/ReportForm";
import ReportDetail from "../../pages/reports/ReportDetail";
import RoleList from "../../pages/roles/RoleList";
import RoleForm from "../../pages/roles/RoleForm";
import UserList from "../../pages/users/UserList";
import UserForm from "../../pages/users/UserForm";
import UserDetail from "../../pages/users/UserDetail";
import DusunList from "../../pages/dusun/DusunList";
import DusunForm from "../../pages/dusun/DusunForm";
import DusunDetail from "../../pages/dusun/DusunDetail";
import ProfilePage from "../../pages/profile/ProfilePage";
import ChangePasswordPage from "../../pages/profile/ChangePasswordPage";
import ChangeNamePage from "../../pages/profile/ChangeNamePage";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/change-name" element={<ChangeNamePage />} />
              <Route path="/profile/change-password" element={<ChangePasswordPage />} />


              {/* Dusun Routes */}
              <Route path="/dusun" element={<DusunList />} />
              <Route path="/dusun/new" element={<DusunForm />} />
              <Route path="/dusun/:id" element={<DusunDetail />} />
              <Route path="/dusun/edit/:id" element={<DusunForm />} />


              {/* Event Routes */}
              <Route path="/events" element={<EventList />} />
              <Route path="/events/new" element={<EventForm />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/events/edit/:id" element={<EventForm />} />

              {/* reports Routes */}
              <Route path="/reports" element={<ReportList />} />
              <Route path="/reports/new" element={<ReportForm />} />
              <Route path="/reports/:id" element={<ReportDetail />} />
              <Route path="/reports/edit/:id" element={<ReportForm />} />

              {/* Roles Routes */}
              <Route path="/roles" element={<RoleList />} />
              <Route path="/roles/new" element={<RoleForm />} />
              <Route path="/roles/:id" element={<ReportDetail />} />
              <Route path="/roles/edit/:id" element={<RoleForm />} />



              {/* Users Routes */}
              <Route path="/users" element={<UserList />} />
              <Route path="/users/new" element={<UserForm />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/users/edit/:id" element={<UserForm />} />

            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
