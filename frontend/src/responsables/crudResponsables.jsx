
import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios.jsx';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/pagination.jsx';
import FormResponsables from './formResponsibles.jsx';
import FormQueryResponsable from './formQueryResponsibles.jsx'
import SidebarAdministrator from '../Admin/SidebarAdministrator.jsx';
import Modal from '../Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';


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
    marginLeft: '190px',
  },
  icon: {
    marginRight: '8px', // Espacio entre el icono y el texto
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
};





const CrudResponsable = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [responsable, setResponsable] = useState({
    Id_Responsable: '',
    Nom_Responsable: '',
    estado: '',
  });
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, [desde, hasta]);

  const getAllResponsables = async () => {
    const token = localStorage.getItem('token'); // Asegúrate de tener el token guardado
    try {
      const response = await clienteAxios.get('/api/responsable', {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en el header
        },
      });
      setResponsableList(response.data);
      setResponsableQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    const token = localStorage.getItem('token'); // Asegúrate de tener el token guardado
    try {
      const response = await clienteAxios.get(`/api/responsable/${Id_Responsable}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en el header
        },
      });
      setResponsable(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el área:', error);
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
    const token = localStorage.getItem('token'); // Asegúrate de tener el token guardado
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
        await clienteAxios.delete(`/api/responsable/${Id_Responsable}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en el header
          },
        });
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el área:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Asegúrate de tener el token guardado
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsable', responsable, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en el header
          },
        });

        console.log(responsable)

        Swal.fire('Agregado!', 'El Responsable ha sido agregado.', 'success');
       
      } else {
        await clienteAxios.put(`/api/responsable/${responsable.Id_Responsable}`, responsable, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en el header
          },
        });
        Swal.fire('Actualizado!', 'El Responsable ha sido actualizada.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Id_Responsable: '',
      Nom_Responsable: '',
      estado: 'Sí', // Cambia a 'Sí' para mantener la consistencia
    });
    setButtonForm('Enviar');
  };

  return (
    <div  style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar}  />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Responsables</h1>
          <div style={styles.contentWrapper}>
            <button
            style={styles.addButton}
            onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faBuilding} style={styles.icon} />
              Añadir
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormResponsables
                responsable={responsable}
                setResponsable={setResponsable}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
              />
            </Modal>

            <div style={styles.tableWrapper}>
              <FormQueryResponsable responsableQuery={responsableQuery} setResponsableQuery={setResponsableQuery} />
              <table style={styles.areaTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Documento</th>
                    <th style={styles.tableHeader}>Nombre del Responsable</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(responsableQuery) &&
                    responsableQuery.slice(desde, hasta).map((responsable) => (
                      <tr key={responsable.Id_Responsable}>
                        <td style={styles.tableCell}>{responsable.Id_Responsable}</td>
                        <td style={styles.tableCell}>{responsable.Nom_Responsable}</td>
                        <td style={styles.tableCell}>{responsable.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button style={styles.button} onClick={() => getResponsable(responsable.Id_Responsable)}>
                              ✏️
                            </button>
                            <button style={styles.button} onClick={() => deleteResponsable(responsable.Id_Responsable)}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination URI="/api/responsable" setDesde={setDesde} setHasta={setHasta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsable;
