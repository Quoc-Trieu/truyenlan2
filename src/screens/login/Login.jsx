import React from 'react'
import './login.css'
import bgLogin from "../../assets/images/bgLogin.png";
import { MdEmail } from 'react-icons/md';
import { RiKeyFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Notiflix from "notiflix";
import { useForm } from "react-hook-form";
import iconUser from "../../assets/icons/icon-feather-user.png";
import iconLock from "../../assets/icons/icon-feather-lock.png";
import { fetchLogin } from '../../store/auth/authThunk';
import { getToken } from '../../utils/localStorage';

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    await dispatch(fetchLogin(data))
    await navigate('/')
  }
  return (
    <div className="container flex h-screen">
      {/* <div className="w-5/12 h-full flex items-center p-[30px]">
        <img src={bgLogin} className="h-full flex aspect-[700/1020]" alt="" />
      </div> */}

      <div className="w-7/12 items-center flex flex-col justify-center items-center">
        <span className="text-3xl font-bold text-[#000000] my-[40px]">
          Đăng nhập
        </span>

        <div className="w-6/12">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="w-full flex flex-col">
              <span className="text-lg font-semibold my-[5px]">Tài khoản</span>
              <div className="h-[60px] flex flex-row items-center border-2 border-solid rounded-md border-[#BCBCBC] ">
                <img
                  src={iconUser}
                  className="flex max-h-[25px] aspect-[68/76] mx-[10px]"
                  height="20px"
                  width="auto"
                />
                <input
                  className="w-full flex flex1 outline-0"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              {errors?.email?.type === "required" && <p className="text-[#FF0000]">Vui lòng nhập tài khoản</p>}
            </label>

            <label className="w-full flex flex-col mt-[20px]">
              <span className="text-lg font-semibold my-[5px]">Mật khẩu</span>
              <div className="h-[60px] flex flex-row items-center border-2 border-solid rounded-md border-[#BCBCBC] ">
                <img
                  src={iconLock}
                  className="flex max-h-[25px] aspect-[68/76] mx-[10px]"
                  height="20px"
                  width="auto"
                />
                <input
                  type="password"
                  className="w-full flex flex1 outline-0"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              {errors?.password?.type === "required" && <p className="text-[#FF0000]">Vui lòng nhập mật khẩu</p>}
            </label>

            <button
              className="w-full h-[60px] text-lg text-[#FFFFFF] rounded-md bg-gradient-to-r from-[#18FFBA] to-[#1C99FF] mt-[10px]"
              type="submit"
            >
              Đăng nhập
            </button>
            <button
              className="w-full h-[60px] text-lg text-[#898989] rounded-md border-2 border-solid border-[#898989] mt-[30px]"
              onClick={() => navigate("/register")}
            >
              Đăng Ký tài khoản mới
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login