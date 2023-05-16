import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import Doc from "../screens/Doc/Doc";
import { Routes, Route } from 'react-router-dom';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Doc />} />
        </Routes>
    )
}

export default PublicRoutes;