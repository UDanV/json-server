export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
    onDelete: () => void;
    onUpdate: () => void;
}

export default Seminar