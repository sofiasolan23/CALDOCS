import { useEffect,useState } from "react";
import clienteAxios from '../config/axios.jsx';


const FormFormatos = ({ formato, setFormato, handleSubmit, buttonForm, resetForm }) => {
  const [procedimiento, setProcedimiento] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [resposable, setResponsable] = useState([]);

  const [file, setFile] = useState(null); // Estado para el archivo

  // Manejo del archivo
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]); // Almacena el archivo en el estado
  };

  // Fetch de los datos en el useEffect
  useEffect(() => {
    const fetchProcedimiento = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      
      try {
        const response = await clienteAxios.get('/api/procedimiento', config);
        setProcedimiento(response.data);
      } catch (error) {
        console.error('Error al obtener procedimientos:', error);
      }
    };

    const fetchUnidades = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      
      try {
        const response = await clienteAxios.get('/api/unidad', config);
        setUnidad(response.data);
      } catch (error) {
        console.error('Error al obtener unidades:', error);
      }
    };

    const fetchResponsables = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      
      try {
        const response = await clienteAxios.get('/api/responsable', config);
        setResponsable(response.data);
      } catch (error) {
        console.error('Error al obtener responsables:', error);
      }
    };

    fetchResponsables();
    fetchUnidades();
    fetchProcedimiento();
  }, []);



  // Función de manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormato((prevFormato) => ({
      ...prevFormato,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (file) {
      formData.append('archivo', file); // Añadir el archivo solo si existe
    }
    formData.append('Cod_Formato', formato.Cod_Formato);
    formData.append('Fec_Actualizacion', formato.Fec_Actualizacion);
    formData.append('Ver_Formato', formato.Ver_Formato);
    formData.append('Est_Formato', formato.Est_Formato);
    formData.append('Id_Responsable', formato.Id_Responsable);
    formData.append('Nom_Formato', formato.Nom_Formato);
    formData.append('Nom_Magnetico', formato.Nom_Magnetico);
    formData.append('Id_Procedimiento', formato.Id_Procedimiento);
    formData.append('Id_Unidad', formato.Id_Unidad);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para subir archivos
        },
      };

      // Comprobar si es una actualización o creación
      if (buttonForm === "Actualizar") {
        await clienteAxios.put(`/api/formato/${formato.Id_Formato}`, formData, config);
      } else {
        await clienteAxios.post('/api/formato', formData, config);
      }
      resetForm();
      // Aquí puedes mostrar una notificación de éxito
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
};





  return (
    <form onSubmit={handleSubmitForm} className="form">
      <div className="form-group">
        <label htmlFor="Cod_Formato">Código del Formato:</label>
        <input
          type="text"
          id="Cod_Formato"
          name="Cod_Formato"
          value={formato.Cod_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Fec_Actualizacion">Fecha de Actualización:</label>
        <input
          type="date"
          id="Fec_Actualizacion"
          name="Fec_Actualizacion"
          value={formato.Fec_Actualizacion}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Ver_Formato">Versión del Formato:</label>
        <input
          type="text"
          id="Ver_Formato"
          name="Ver_Formato"
          value={formato.Ver_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Est_Formato">Estado del Formato:</label>
        <select
          id="Est_Formato"
          name="Est_Formato"
          value={formato.Est_Formato}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <div className="form-group">
          <label htmlFor="Id_Responsable">Responsable</label>
          <select
            id="Id_Responsable"
            name="Id_Responsable"
            value={formato.Id_Responsable}
            onChange={handleChange}
            className="search-input"
            required
          >
            <option value="">Seleccionar Responsable</option>
            {resposable.map((responsable) => (
              <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                {/* {responsable.Nom_Responsable} */}
                {responsable.Id_Responsable}
              </option>
            ))}
          </select>
        </div>



      <div className="form-group">
        <label htmlFor="Nom_Formato">Nombre del Formato:</label>
        <input
          type="text"
          id="Nom_Formato"
          name="Nom_Formato"
          value={formato.Nom_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Nom_Magnetico">Nombre Magnético:</label>
        <input
          type="text"
          id="Nom_Magnetico"
          name="Nom_Magnetico"
          value={formato.Nom_Magnetico}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
          <label htmlFor="Id_Procedimiento">Procedimiento</label>
          <select
            id="Id_Procedimiento"
            name="Id_Procedimiento"
            value={formato.Id_Procedimiento}
            onChange={handleChange}
            className="search-input"
            required
          >
            <option value="">Seleccionar Procedimiento</option>
            {procedimiento.map((procedimiento) => (
              <option key={procedimiento.Id_Procedimiento} value={procedimiento.Id_Procedimiento}>
                {procedimiento.Nom_Procedimiento}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Id_Unidad">Unidad</label>
          <select
            id="Id_Unidad"
            name="Id_Unidad"
            value={formato.Id_Unidad}
            onChange={handleChange}
            className="search-input"
            required
          >
            <option value="">Seleccionar Unidad</option>
            {unidad.map((unidad) => (
              <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                {unidad.Nom_Unidad}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
  <label htmlFor="file">Subir Archivo:</label>
  <input
    type="file"
    id="file"
    name="file"
    onChange={handleChangeFile}
    className="form-input"
  />
</div>

      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
      <button type="button" onClick={resetForm} className="cancel-button">
        Cancelar
      </button>
    </form>
  );
};

export default FormFormatos;
