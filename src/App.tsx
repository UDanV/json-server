import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Seminars from "./pages/Seminars.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Seminars />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App