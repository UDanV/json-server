import Seminar from "./seminar.ts";

interface ModalUpdateProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedSeminar: Seminar) => void;
    seminar: Seminar | null;
}

export default ModalUpdateProps