import './App.css';
import './assets/css/auth.css';
import Authentication from './screens/authentication';
import Dashboard from './screens/dashboard';
import ActivateAccount from './screens/activate-account';
import ProfileManagement from './screens/profile-management';
import ManageDevices from './screens/manage-devices';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./utils/protectedRoute";



function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Authentication />} />
        <Route path={"/activate-account"} element={<ActivateAccount />} />
        <Route
          path={"/dashboard"}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile-management"}
          element={
            <ProtectedRoute>
              <ProfileManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/manage-devices"}
          element={
            <ProtectedRoute>
              <ManageDevices />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
