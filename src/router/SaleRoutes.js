
import Home from "../screens/home/Home";
import { Routes, Route } from 'react-router-dom'
import Account from "../screens/tab/account/Account";
import UserMan from "../screens/tab/userMan/UserMan";
import DetailUser from "../components/detailuser/DetailUser";
import BaivietMan from "../screens/tab/baivietMan/BaivietMan";

const SaleRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/" element={<BaivietMan />} />
                <Route path="/account" element={<Account />} />
                <Route path="/detailUser" element={<DetailUser />} />
            </Route>
        </Routes>
    )
}

export default SaleRoutes;