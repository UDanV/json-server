import React, { useState } from "react";
import Seminar from "../types/seminar.ts";
import '../sass/modal.scss'
import ModalUpdateProps from "../types/modal-update.ts";

const ModalEdit: React.FC<ModalUpdateProps> = ({ isOpen, onClose, onSave, seminar }) => {
    const [title, setTitle] = useState(seminar?.title || "");
    const [date, setDate] = useState(seminar?.date || "");
    const [description, setDescription] = useState(seminar?.description || "");
    const [time, setTime] = useState(seminar?.time || "");
    const [photo, setPhoto] = useState(seminar?.photo || "");

    if (!isOpen || !seminar) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (seminar) {
            const updatedSeminar: Seminar = {
                ...seminar,
                title,
                date,
                description,
                time,
                photo,
            };
            onSave(updatedSeminar);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактирование семинара</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Название:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        Дата:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                    <label>
                        Описание:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label>
                        Время:
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </label>
                    <label>
                        Фото:
                        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                    </label>
                    <div className="modal-actions">
                        <button className="save" type="submit">Сохранить</button>
                        <button className="cancel" type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdit;