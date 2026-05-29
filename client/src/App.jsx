import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Employee from "./pages/Employee";
import User from "./pages/User";
import Task from "./pages/Task";
import OrgChart from "./pages/OrgChart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>   {/* 👈 Wrap everything inside AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/superadmin" element={
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <SuperAdmin />
    </ProtectedRoute>
  } />

  <Route
   path="/user"
   element={
      <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
         <User />
      </ProtectedRoute>
   }
/>

  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={["admin","super-admin"]}>
      <Admin />
    </ProtectedRoute>
  } />
  <Route path="/manager" element={
    <ProtectedRoute allowedRoles={["admin","manager"]}>
      <Manager />
    </ProtectedRoute>
  } />
  <Route path="/employee" element={
    <ProtectedRoute allowedRoles={["employee","manager"]}>
      <Employee />
    </ProtectedRoute>
  } />
  <Route path="/task" element={
    <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
      <Task />
    </ProtectedRoute>
  } />
  <Route path="/orgChart" element={
    <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
      <OrgChart />
    </ProtectedRoute>
  } />
  <Route path="/profile" element={
    <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
      <Profile />
    </ProtectedRoute>
  } />

    <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
