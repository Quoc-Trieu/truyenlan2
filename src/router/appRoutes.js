import React, { useEffect, useState } from 'react'
import { Loading } from 'notiflix';
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from './protectedRoutes';
import PublicRoutes from './publicRoutes';
import { getToken, setToken } from '../utils/localStorage';
import { getUserInfor } from '../store/auth/authThunk';
import { refeshToken } from '../services/refeshTokenServices';
import SaleRoutes from './SaleRoutes';

function AppRoutes() {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user);
    const Routes = user?.role[0] == 'ADMIN'||user?.role[0] == 'AUTHER' ? ProtectedRoutes : PublicRoutes;

    // get user
    useEffect(() => {
        const jwtToken = getToken();

        if (jwtToken) {
            dispatch(getUserInfor());
        }
    }, []);


    return !loading && <React.Fragment><Routes /></React.Fragment>;
}

export default AppRoutes