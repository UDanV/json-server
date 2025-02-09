import React, {useEffect, useState} from "react";
import Seminar from "../types/seminar.ts"
import SeminarCard from "../components/seminar-card.tsx";
import "../sass/seminars.scss"
import ModalDelete from "../components/modal-delete.tsx";
import ModalUpdate from "../components/modal-update.tsx";

const Seminars: React.FC = () => {
    const [seminars, setSeminar] = useState<Seminar[]>([]);
    const [isModalOpen ,setIsModalOpen] = useState(false)
    const [seminarToDelete, setSeminarToDelete] = useState<number | null>(null);
    const [isFetching, setIsFetching] = useState(false)
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Удаление семинара
    const handleDeleteClick = (id: number) => {
        setIsModalOpen(true);
        setSeminarToDelete(id);
    };

    // Отмена удаления семинара
    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setSelectedSeminar(null);
    };

    // Обновление семинара
    const handleUpdate = (id: number) => {
        const seminar = seminars.find(seminar => seminar.id === id);
        if (seminar) {
            setSelectedSeminar({ ...seminar });
            setIsEditModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSeminarToDelete(null);
    };

    // Логика сохранения семинара
    const handleSaveUpdate = async (updatedSeminar: Seminar) => {
        try {
            const response = await fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedSeminar),
            });

            if (response.ok) {
                const updatedSeminars = seminars.map(seminar =>
                    seminar.id === updatedSeminar.id ? updatedSeminar : seminar
                );
                setSeminar(updatedSeminars);
                setIsEditModalOpen(false);
                setSelectedSeminar(null);
            } else {
                console.error("Ошибка при обновлении семинара");
            }
        } catch (error) {
            console.error("Ошибка при обновлении семинара:", error);
        }
    };

    // Логика удаления семинара
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/seminars/${seminarToDelete}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updatedSeminars = seminars.filter((seminar) => seminar.id !== seminarToDelete);
                setSeminar(updatedSeminars);
            } else {
                console.error("Ошибка при удалении семинара");
            }
        } catch (error) {
            console.error("Ошибка при удалении семинара:", error);
        } finally {
            setIsModalOpen(false)
            setSeminarToDelete(null)
        }
    }

    // Запрос с ограничением на повторяющиеся запросы
    useEffect(() => {
        const fetchSeminars = async () => {
            if (isFetching) return;
            setIsFetching(true);
            try {
                const response = await fetch('http://localhost:3001/seminars');
                if (!response.ok) {
                    throw new Error("Ошибка при получении семинаров");
                }
                const data = await response.json();
                setSeminar(data);
            } catch (error) {
                console.error("Ошибка: ", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchSeminars();
    }, [])

    return (
        <div className="card-container">
            {seminars.map(seminar =>
                <SeminarCard
                    id={seminar.id}
                    title={seminar.title}
                    date={seminar.date}
                    description={seminar.description}
                    time={seminar.time}
                    photo={seminar.photo}
                    onDelete={() => handleDeleteClick(seminar.id)}
                    onUpdate={() => handleUpdate(seminar.id)}
                />
            )}
            <ModalDelete
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleDelete}
                title="Удаление семинара"
                message="Вы уверены, что хотите удалить этот семинар?"
            />
            <ModalUpdate
                isOpen={isEditModalOpen}
                onClose={handleCancelEdit}
                onSave={handleSaveUpdate}
                seminar={selectedSeminar}
            />
        </div>
    )
}

export default Seminars
