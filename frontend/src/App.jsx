import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
// import Register from './components/Register';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import Dashboard from './components/Dashboard';

import NavMenuSE from "./Nav/NavQuerySena/NavMenuS_E.jsx";
import ContendR_H from "./home-init/Contend-R_H.jsx";
import Contend_Manuals from "./home-init/Contend-Manuals.jsx";
import ContendContacts from "./home-init/Contend-Contacts.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"; // Importar la nueva ruta protegida
import NavigationBar from "./components/navigationBar.jsx"; // Importar la barra de navegación
import Home from "./home/home.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

// CRUDS
import CrudProcess from "./process/crudProcess.jsx";
import CrudResponsables from "./responsables/crudResponsables.jsx";
import CrudUnits from "./unit/crudUnits.jsx";
import CrudAreas from "./area/crudAreas.jsx";
import CrudProcedures from "./procedure/crudProcedure.jsx";
import CrudFormatos from "./format/crudFormat.jsx";
import ConsultarFormato from "./format/ConsultarFormato.jsx";
import Register from "./components/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();
  const techManualUrl = "/pdf/Manual_de_las_Buenas_Prácticas_de_Ordeño.pdf";
  const userManualUrl = "/pdf/OPERACIONES_BASICAS.pdf";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   setIsAuthenticated(false);
  //   navigate('/login');
  // };



  return (
    <div>
      <NavigationBar isAuthenticated={isAuthenticated} />
      {/* handleLogout={handleLogout}  */}

      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/Mision-Vision" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/Register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />


        <Route
          path="/Areas"
          element={
            <PrivateRoute>
              <CrudAreas />
            </PrivateRoute>
          }
        />

        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/Unidades"
          element={
            <PrivateRoute>
              <CrudUnits />
            </PrivateRoute>
          }
        />
                <Route
          path="/Procesos"
          element={
            <PrivateRoute>
              <CrudProcess />
            </PrivateRoute>
          }
        />

        <Route
          path="/Responsable"
          element={
            <PrivateRoute>
              <CrudResponsables />
            </PrivateRoute>
          }
        />
        <Route
          path="/Procedimientos"
          element={
            <PrivateRoute>
              <CrudProcedures />
            </PrivateRoute>
          }
        />
        <Route
          path="/Formatos"
          element={
            <PrivateRoute>
              <CrudFormatos />
            </PrivateRoute>
          }
        />

        <Route path="/contacts" element={<ContendContacts />} />
        <Route path="/Mision-Vision" element={<NavMenuSE />} />
        <Route path="/Reseña-Historica" element={<ContendR_H />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId" element={< ResetPassword/>} />
        
        <Route
          path="/manuals"
          element={
            <Contend_Manuals
              techManual={techManualUrl}
              userManual={userManualUrl}
            />
          }
        />
      <Route path="/consultarFormato" element={<ConsultarFormato />} />

      </Routes>
    </div>
  );
};

export default App;
