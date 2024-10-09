import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios.jsx';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/Pagination';
import FormFormatos from './formFormat.jsx';
import SidebarAdministrator from '../Admin/SidebarAdministrator.jsx';
import Modal from '../Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    overflowX: 'hidden',
  },
  crudContainer: {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
    width: '107%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20px',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    paddingLeft: '20px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  areaTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

const CrudFormatos = () => {
  const [formatoList, setFormatoList] = useState([]);
  const [formato, setFormato] = useState({
    Cod_Formato: '',
    Fec_Actualizacion: '',
    Ver_Formato: '',
    Est_Formato: 'Activo',
    Id_Responsable: '',
    Nom_Formato: '',
    Nom_Magnetico: '',
    Id_Procedimiento: '',
    Id_Unidad: '',
  });
  const [formatoQuery, setFormatoQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getAllFormatos();
  }, [desde, hasta]);

  const getAllFormatos = async () => {
    try {
      const response = await clienteAxios.get('/api/formato', config);
      setFormatoList(response.data || []);
      setFormatoQuery(response.data || []);
    } catch (error) {
      console.error('Error al obtener los formatos:', error);
    }
  };

  const getFormato = async (Id_Formato) => {
    try {
      const response = await clienteAxios.get(`/api/formato/${Id_Formato}`, config);
      setFormato(response.data || {});
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el formato:', error);
    }
  };

  const deleteFormato = async (Id_Formato) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/formato/${Id_Formato}`, config);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllFormatos();
      } catch (error) {
        console.error('Error al eliminar el formato:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/formato', formato, config);
        Swal.fire('Agregado!', 'El formato ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/formato/${formato.Id_Formato}`, formato, config);
        Swal.fire('Actualizado!', 'El formato ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllFormatos();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setFormato({
      Cod_Formato: '',
      Fec_Actualizacion: '',
      Ver_Formato: '',
      Est_Formato: 'Activo',
      Id_Responsable: '',
      Nom_Formato: '',
      Nom_Magnetico: '',
      Id_Procedimiento: '',
      Id_Unidad: '',
      Archivo_URL:''
    });
    setButtonForm('Enviar');
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filteredFormatos = formatoList.filter((formato) =>
        formato.Nom_Formato.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFormatoQuery(filteredFormatos);
    } else {
      setFormatoQuery(formatoList);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Formatos</h1>
          <div style={styles.contentWrapper}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Buscar formato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button onClick={handleSearch} style={styles.searchButton}>
                <FontAwesomeIcon icon={faSearch} style={styles.icon} />
                Buscar
              </button>
              <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
                <FontAwesomeIcon icon={faFileAlt} style={styles.icon} />
                Añadir Formato
              </button>
            </div>
            <div style={styles.tableWrapper}>
              <table style={styles.areaTable}>
                <thead>
                  <tr style={styles.tableHeader}>

                    <th>Id_Formato</th>
                    <th>Código</th>
                    <th>Fecha de Actualizacion</th>
                    <th>Versión Formato</th>
                    <th>Estado</th>
                    <th>Documento Responsable</th>
                    <th>Nombre Formato</th>
                    <th>Nombre Magnético</th>
                    <th>Nombre Procedimiento</th>
                    <th>Nombre Unidad</th>
                    <th>Archivo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(formatoQuery) ? formatoQuery : []).map((formato) => (
                    <tr key={formato.Id_Formato}>
                      <td style={styles.tableCell}>{formato.Id_Formato}</td>
                      <td style={styles.tableCell}>{formato.Cod_Formato}</td>
                      <td style={styles.tableCell}>{formato.Fec_Actualizacion}</td>
                      <td style={styles.tableCell}>{formato.Ver_Formato}</td>
                      <td style={styles.tableCell}>{formato.Est_Formato}</td>
                      <td style={styles.tableCell}>{formato.Id_Responsable}</td>
                      <td style={styles.tableCell}>{formato.Nom_Formato}</td>
                      <td style={styles.tableCell}>{formato.Nom_Magnetico}</td>
                      <td style={styles.tableCell}>{formato.Id_Procedimiento}</td>
                      <td style={styles.tableCell}>{formato.Id_Unidad}</td>
                        <td style={styles.tableCell}>
                          {formato.Archivo_URL ? (
                            <a href={formato.Archivo_URL} download={formato.Archivo_URL.split('/').pop()}>
                              <button type="button" className="download-button">
                                Descargar Archivo
                              </button>
                            </a>
                          ) : (
                            'No hay archivo'
                          )}
                        </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionButtons}>
                          <button
                            style={{ ...styles.button, ...styles.editButton }}
                            onClick={() => getFormato(formato.Id_Formato)}
                          >
                            Editar
                          </button>
                          <button
                            style={{ ...styles.button, ...styles.deleteButton }}
                            onClick={() => deleteFormato(formato.Id_Formato)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination desde={desde} hasta={hasta} setDesde={setDesde} setHasta={setHasta} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Formulario de Formato"
      >
        <FormFormatos resetForm={resetForm} formato={formato} setFormato={setFormato} handleSubmit={handleSubmit} buttonForm={buttonForm} />
      </Modal>
    </div>
  );
};

export default CrudFormatos;
