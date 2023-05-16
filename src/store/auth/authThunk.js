import { createAsyncThunk } from '@reduxjs/toolkit';
import { getuser, login } from '../../services/authServices';
import { setToken } from '../../utils/localStorage';
import Notiflix from 'notiflix';

export const fetchLogin = createAsyncThunk(
    'fetchLoginStatus',
    async (data) => {
        try {
            const resLogin = await login(data)
            await setToken(resLogin.data.auth);
            const user = await getuser();
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Đăng nhập thành công')
            console.log((user));
            return user.data
        } catch (error) {
            Notiflix.Notify.failure('Tài khoản không tồn tại')
            Notiflix.Loading.remove();
        }
    }
)

export const getUserInfor = createAsyncThunk(
    'getUserInforStatus',
    async () => {
        const user = await getuser();
        return user.data;
    }
)