import { useState } from "react";
import clienteAxios from "../config/axios";

const URI = "/api/formato/consulta";

const ConsultarFormato = () => {
  const [Cod_Fomato, setCod_Fomato] = useState("");
  const [Nom_Formato, setNom_Formato] = useState("");
  const [formatoList, setFormatoList] = useState([]);

  const sendForm = async (e) => {
    e.preventDefault();

    if (Cod_Fomato === "" && Nom_Formato === "") {
      alert("Debe proporcionar un Código o un Nombre para buscar.");
      return;
    }

    try {
      // Realizar la petición con ambos parámetros (si existen)
      const respuestaApi = await clienteAxios.get(`${URI}`, {
        params: {
          Cod_Formato: Cod_Fomato || undefined,
          Nom_Formato: Nom_Formato || undefined
        }
      });

      console.log("Respuesta API:", respuestaApi); // Verifica qué está recibiendo
      if (respuestaApi.status === 200) {
        if (respuestaApi.data.length > 0) {
          setFormatoList(respuestaApi.data);
          clearForm();
        } else {
          alert("No se encontraron formatos.");
          setFormatoList([]);
        }
      } else {
        alert("Error al cargar los registros!");
      }
    } catch (error) {
      console.error("Error en la petición:", error); // Para identificar posibles errores
      setFormatoList([]);
      alert(error.response?.data?.message);
    }
  };

  const clearForm = () => {
    setCod_Fomato("");
    setNom_Formato("");
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-7">
        <form
          id="formatoForm"
          onSubmit={sendForm}
          className="bg-white shadow-lg rounded px-5 pt-4 pb-5 mb-4 w-100 max-w-lg mt-5"
        >
          <h1 className="font-weight-bold text-dark text-center mb-5">
            Consultar <span className="text-primary">Formatos</span>
          </h1>
          <div className="form-group">
            <label className="text-dark font-weight-bold">
              Ingrese Código de Formato
            </label>
            <input
              type="number"
              value={Cod_Fomato}
              onChange={(e) => setCod_Fomato(e.target.value)}
              className="form-control"
              maxLength={10}
            />
          </div>
          <div className="form-group">
            <label className="text-dark font-weight-bold">
              Ingrese Nombre de Formato
            </label>
            <input
              type="text"
              value={Nom_Formato}
              onChange={(e) => setNom_Formato(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              value="Buscar"
              className="btn btn-primary w-100 py-2 mt-2 font-weight-bold"
            />
          </div>
        </form>
      </div>

      {formatoList.length > 0 && (
        <div className="px-4">
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Código Formato</th>
                  <th>Nombre Formato</th>
                  <th>Última Fecha de Actualización</th>
                  <th>Archivo Descargar</th>
                </tr>
              </thead>
              <tbody>
                {formatoList.map((formato) => (
                  <tr key={formato.Cod_Formato}>
                    <td>{formato.Cod_Formato}</td>
                    <td>{formato.Nom_Formato}</td>
                    <td>{formato.Fec_Actualizacion}</td>
                    <td>
                      {formato.Archivo_URL ? (
                        <a
                          href={formato.Archivo_URL}
                          download={formato.Archivo_URL.split("/").pop()}
                        >
                          <button type="button" className="btn btn-success">
                            Descargar Archivo
                          </button>
                        </a>
                      ) : (
                        "No hay archivo"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultarFormato;
