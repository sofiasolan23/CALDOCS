import React from "react"
import ManualViewer from "../Manuals/ManualsTecnicUser.jsx"
const Contend_Manuals = ({ techManual, userManual }) => {
    return (
      <div>
        <ManualViewer techManual={techManual} userManual={userManual} />
      </div>
    );
  };
  
  export default Contend_Manuals;