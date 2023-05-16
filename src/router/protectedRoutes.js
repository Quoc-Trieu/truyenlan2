import Home from "../screens/home/Home";
import { Routes, Route } from 'react-router-dom'
import UserMan from "../screens/tab/userMan/UserMan";
// import Account from "../screens/tab/account/Account";
// import DetailUser from "../components/detailuser/DetailUser";
// import Setting from "../screens/tab/setting/Setting";
// import Sessionman from "../screens/tab/sessionMan/SessionMan";
// import DepositManager from "../screens/tab/depositManager/DepositManager";
// import SaleMain from "../screens/tab/saleMan/SaleMain";
// import AddSale from "../screens/addSale/AddSale";
import Author from "../screens/tab/author/Author";
import CommentMan from "../screens/tab/commentMan/CommentMan";

const ProtectedRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/" element={<UserMan />} />
                <Route path="/author" element={<Author />} />
                <Route path="/comment" element={<CommentMan />} />
                {/* <Route path="/account" element={<Account />} /> */}
                {/* <Route path="/detailUser" element={<DetailUser />} />
                <Route path="/sessionman" element={<Sessionman />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/DepositManager" element={<DepositManager />} />
                <Route path="/sale" element={<SaleMain/>} />
                <Route path="/addSale" element={<AddSale/>} /> */}
            </Route>
        </Routes>
    )
}

export default ProtectedRoutes;