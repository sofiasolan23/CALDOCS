import React from 'react';



const FormResponsables = ({ responsable, setResponsable, handleSubmit, buttonForm }) => {

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setResponsable((prevResponsable) => ({
    ...prevResponsable,
    [name]: value,
  }));
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label htmlFor="Documento" className="form-label">Documento del Responsable</label>
        <input
          type="number"
          className="form-control"
          id="Documento"
          name="Id_Responsable" // Asegúrate de que el nombre coincida con el estado
          value={responsable.Id_Responsable}
          onChange={handleChange}
          required
        />



        <label htmlFor="nombre" className="form-label">Nombre del Responsable</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="Nom_Responsable" // Asegúrate de que el nombre coincida con el estado
          value={responsable.Nom_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <select
          className="form-select"
          id="estado"
          name="estado"
          value={responsable.estado}
          onChange={handleChange}
          required
        >
          <option value="Sí">Si</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{buttonForm}</button>
    </form>
  );
};

export default FormResponsables;