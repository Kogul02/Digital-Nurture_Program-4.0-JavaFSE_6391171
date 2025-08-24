import React from "react";

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel} className="secondary">No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
