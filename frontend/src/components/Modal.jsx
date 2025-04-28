import "../styles/modal.css";

export default function Modal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <h2 className="text-lg font-semibold mb-4 text-center">
          ¿Seguro que querés borrar el chat? 🧹
        </h2>
        <div className="modal-buttons mt-6">
          <button
            onClick={onConfirm}
            className="button-confirm"
          >
            Sí, borrar
          </button>
          <button
            onClick={onCancel}
            className="button-cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
