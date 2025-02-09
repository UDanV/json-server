import React from 'react';
import Seminar from "../types/seminar.ts";

interface SeminarCardProps extends Seminar {
    onDelete: () => void
}

const SeminarCard:React.FC<SeminarCardProps> = ({ id, title, date, description, time, photo, onDelete, onUpdate }) => {
    return (
        <div className="card">
            <small>{id}</small>
            <img src={photo} alt={title} className="card-image"/>
            <h2 className="title-card">{title}</h2>
            <p className="description">{description}</p>
            <p className="date-time">
                {date} в {time}
            </p>
            <button className="del" onClick={onDelete} rel="noopener noreferrer">
                Удалить семинар
            </button>
            <button className="update" onClick={onUpdate} >
                Редактировать семинар
            </button>
        </div>
    );
};

export default SeminarCard