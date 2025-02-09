import React from "react";
import '../sass/modal.scss'
import ModalDeleteProps from "../types/modal-delete.ts";

const ModalDelete: React.FC<ModalDeleteProps> = ({isOpen, onClose, onConfirm, title, message,}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="modal-button cancel">
                        Отмена
                    </button>
                    <button onClick={onConfirm} className="modal-button confirm">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete