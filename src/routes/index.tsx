import React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import LoginPage from "../pages/auth/LoginPage";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import EventList from "../pages/events/EventList";
import EventDetail from "../pages/events/EventDetail";
import EventForm from "../pages/events/EventForm";
import ReportList from "../pages/reports/ReportList";
import ReportForm from "../pages/reports/ReportForm";
import ReportDetail from "../pages/reports/ReportDetail";
import RoleList from "../pages/roles/RoleList";
import RoleForm from "../pages/roles/RoleForm";
import RoleDetails from "../pages/roles/RoleDetail";
import UserList from "../pages/users/UserList";
import UserForm from "../pages/users/UserForm";
import UserDetail from "../pages/users/UserDetail";
import DusunList from "../pages/dusun/DusunList";
import DusunForm from "../pages/dusun/DusunForm";
import DusunDetail from "../pages/dusun/DusunDetail";
import ProfilePage from "../pages/profile/ProfilePage";
import ChangeNamePage from "../pages/profile/ChangeNamePage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({children, allowedRoles}) => {
  const {user} = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const {user} = useAuth();

  // If user is logged in, redirect from login page to appropriate page
  if (user && window.location.pathname === "/login") {
    return (
      <Navigate to={user.role === "admin" ? "/" : "/faculty/new"} replace />
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        
        <Route path="profile">
          <Route index element={<ProfilePage />} />
          <Route path="change-name" element={<ChangeNamePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        <Route path="dusun">
          <Route index element={<DusunList />} />
          <Route path="new" element={<DusunForm />} />
          <Route path=":id" element={<DusunDetail />} />
          <Route path="edit/:id" element={<DusunForm />} />
        </Route>


        <Route path="events">
          <Route index element={<EventList />} />
          <Route path="new" element={<EventForm />} />
          <Route path=":id" element={<EventDetail />} />
          <Route path="edit/:id" element={<EventForm />} />
        </Route>

        <Route path="reports">
          <Route index element={<ReportList />} />
          <Route path="new" element={<ReportForm />} />
          <Route path=":id" element={<ReportDetail />} />
          <Route path="edit/:id" element={<ReportForm />} />
        </Route>

        <Route path="roles">
          <Route index element={<RoleList />} />
          <Route path="new" element={<RoleForm />} />
          <Route path=":id" element={<RoleDetails />} />
          <Route path="edit/:id" element={<RoleForm />} />
        </Route>

        <Route path="users">
          <Route index element={<UserList />} />
          <Route path="new" element={<UserForm />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="edit/:id" element={<UserForm />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
