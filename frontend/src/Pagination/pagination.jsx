import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clienteAxios from "../config/axios.jsx"; // Ajusta la ruta según la ubicación de tu configuración de Axios
import "./Pagination.css"; // Importa el archivo CSS para aplicar estilos

const Pagination = ({ URI, setDesde, setHasta }) => {
  const [numRegistros, setNumRegistros] = useState(0);
  const [registrosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginas, setPaginas] = useState(0);

  // Función para obtener todos los registros
  const GetAllUsers = async () => {
    const token = localStorage.getItem('token'); // Obtener token desde localStorage
    if (!token) {
      console.error("Token no disponible. Redirigiendo a la página de login.");
      window.location.href = '/login'; // Redirigir al login si no hay token
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await clienteAxios.get(URI, config);
      const data = response.data;

      if (Array.isArray(data)) {
        const cantidadRegistros = data.length;
        setNumRegistros(cantidadRegistros);
        setPaginas(Math.ceil(cantidadRegistros / registrosPorPagina));
      } else {
        console.error("La respuesta de la API no es un array:", data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error de respuesta:", error.response.data);
        if (error.response.status === 403) {
          console.error("Token inválido o expirado. Redirigiendo al login.");
          window.location.href = '/login'; // Redirigir si el token es inválido
        }
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    GetAllUsers();
  }, [URI]);

  useEffect(() => {
    const desde = (paginaActual - 1) * registrosPorPagina;
    const hasta = Math.min(paginaActual * registrosPorPagina, numRegistros);
    // Verifica si setDesde y setHasta son funciones antes de llamarlas
    if (typeof setDesde === 'function') setDesde(desde);
    if (typeof setHasta === 'function') setHasta(hasta);
  }, [paginaActual, numRegistros, registrosPorPagina, setDesde, setHasta]);

  const anterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const siguiente = () => {
    if (paginaActual < paginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={anterior}
        disabled={paginaActual === 1}
      >
        <ChevronLeftIcon className="pagination-icon" />
        <span className="sr-only">Anterior</span>
      </button>
      <div className="pagination-pages">
        {[...Array(paginas).keys()].map((n) => (
          <button
            key={n + 1}
            className={`pagination-button ${
              n + 1 === paginaActual ? "pagination-button-active" : ""
            }`}
            onClick={() => setPaginaActual(n + 1)}
          >
            {n + 1}
          </button>
        ))}
      </div>
      <button
        className="pagination-button"
        onClick={siguiente}
        disabled={paginaActual === paginas}
      >
        <ChevronRightIcon className="pagination-icon" />
        <span className="sr-only">Siguiente</span>
      </button>
    </div>
  );
};

export default Pagination;
