import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Employee from "./pages/Employee";
import Users from "./pages/Users";
import Task from "./pages/Task";
import OrgChart from "./pages/OrgChart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>   {/* 👈 Wrap everything inside AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />

          <Route path="/SuperAdmin" element={
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <SuperAdmin />
    </ProtectedRoute>
  } />

  <Route
   path="/User"
   element={
      <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
         <Users />
      </ProtectedRoute>
   }
/>

  <Route path="/Admin" element={
    <ProtectedRoute allowedRoles={["admin","super-admin"]}>
      <Admin />
    </ProtectedRoute>
  } />
  <Route path="/Manager" element={
    <ProtectedRoute allowedRoles={["admin","manager"]}>
      <Manager />
    </ProtectedRoute>
  } />
  <Route path="/Employee" element={
    <ProtectedRoute allowedRoles={["employee","manager"]}>
      <Employee />
    </ProtectedRoute>
  } />
  <Route path="/Task" element={
    <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
      <Task />
    </ProtectedRoute>
  } />
  <Route path="/OrgChart" element={
    <ProtectedRoute allowedRoles={["super-admin", "admin", "manager", "employee"]}>
      <OrgChart />
    </ProtectedRoute>
  } />
  <Route path="/Profile" element={
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
