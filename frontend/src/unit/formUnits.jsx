import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios.jsx';


const FormUnits = ({ unit, setUnit, handleSubmit, buttonForm }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        const response = await clienteAxios.get('/api/area', config); // Usar token en la petición
        console.log('Áreas obtenidas:', response.data); // Agrega este log para depurar
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  return (
    <div className='Fondo'>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="Nom_Unidad">Nombre de la Unidad</label>
          <input
            type="text"
            id="Nom_Unidad"
            name="Nom_Unidad"
            value={unit.Nom_Unidad}
            onChange={handleChange}
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Id_Area">Área</label>
          <select
            id="Id_Area"
            name="Id_Area"
            value={unit.Id_Area}
            onChange={handleChange}
            className="search-input"
            required
          >
            <option value="">Seleccionar Área</option>
            {areas.map((area) => (
              <option key={area.Id_Area} value={area.Id_Area}>
                {area.Nom_Area}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={unit.estado}
            onChange={handleChange}
            className="search-input"
            required
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormUnits;
