import React, { useState, useRef, useEffect } from "react";
import bgLogin from "../../assets/images/bgLogin.png";
import loadImg from "../../assets/images/loadImg.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Axiosregister } from "../../services/authServices";
import Notiflix from "notiflix";

function Register() {
  let navigate = useNavigate();
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const formData = new FormData();

  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [avt, setAvt] = useState(null);
  const [isGetRole, setIsGetRole] = useState(false);
  const [role, setRole] = useState({});

  formData.append('cardFrontImage', front);
  formData.append('cardBackImage', back);
  formData.append('cardImage', avt);


  const onSubmit = (data) => {
    formData.append('fullName', data.name);
    formData.append('email', data.email.toLowerCase());
    formData.append('password', data.password);
    formData.append('phone', data.phone);
    formData.append('code', data.code);
    Notiflix.Loading.pulse();

    Axiosregister(formData)
      .then(() => {
        console.log('Đăng ký thành công');
        Notiflix.Notify.success('Đăng ký thành công')
        Notiflix.Loading.remove();
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        switch (err.response.data.code) {
          case "USER_ALREADY_EXIST":
            Notiflix.Notify.failure('Tài khoản đã tồn tại')
            break;

          default:
            Notiflix.Notify.failure('Đăng ký không thành công')
            break;
        }
        Notiflix.Loading.remove();
      })
  }

  const listRole = [
    {
      id: 'VIEWER',
      title: 'Người xem'
    },
    {
      id: 'VIEWER',
      title: 'Tác giả'
    },
  ]

  return (
    <div className="container flex h-screen max-md:flex-col max-md:overflow-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:overflow-y-auto w-7/12 h-screen flex flex-col justify-center items-center p-[30px] max-md:w-full max-md:p-[15px] max-md:relative max-md:top-[-450px] max-md:z-[10] max-md:bg-[#fff] max-md:rounded-xl max-md:h-fit max-md:items-center "
      >
        <div className="w-8/12 flex flex-col max-md:w-full">
          <span className="text-3xl font-bold text-[#000000]">
            {" "}
            Tạo tài khoản
          </span>
          <span className="text-[#6C6C6C] text-md mt-[12px]">
            {" "}
            Bạn đã có sẵn tài khoản?{" "}
            <a className="text-md font-bold text-[#0084E7] ml-[5px]" href="#" onClick={() => navigate("/login")}>
              Đăng Nhập
            </a>
          </span>

          <div className="flex flex-col">
            <label>
              <div className="flex items-center mt-[10px] gap-[15px]">
                <span className="flex font-semibold">
                  Tên người dùng
                </span>
                {errors?.name?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập tên</p>}
              </div>
              <input
                name="name"
                className="w-full h-[50px] border-2 border-solid rounded-md border-[#BCBCBC] outline-0 px-[20px] mt-[6px]"
                {...register('name', {
                  required: true,
                })}
              />
            </label>
            <label>
              <div className="flex items-center mt-[15px] gap-[15px]">
                <span className="flex font-semibold ">
                  Địa chỉ Gmail
                </span>
                {errors?.email?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập tài khoản</p>}
                {errors?.email?.type === "pattern" && <p className="text-[#FF0000] text-[14px]">*Nhập sai email</p>}
              </div>
              <input
                type='email'
                name="email"
                className="w-full h-[50px] border-2 border-solid rounded-md border-[#BCBCBC] outline-0 px-[20px] mt-[6px]"
                placeholder="@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
                })}
              />
            </label>
            <label>
              <div className="flex items-center mt-[10px] gap-[15px]">
                <span className="flex font-semibold">
                  Mật khẩu
                </span>
                {errors?.password?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập mật khẩu</p>}
              </div>
              <input
                name="password"
                className="w-full h-[50px] border-2 border-solid rounded-md border-[#BCBCBC] outline-0 px-[20px] mt-[6px]"
                {...register('password', {
                  required: true,
                })}
              />
            </label>
            <label className="relative">
              <div className="flex items-center mt-[10px] gap-[15px]">
                <span className="flex font-semibold">
                  Quyền
                </span>
                {errors?.role?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng chọn role</p>}
              </div>
              <input
                name="role"
                className="w-full h-[50px] border-2 border-solid rounded-md border-[#BCBCBC] outline-0 px-[20px] mt-[6px]"
                {...register('role', {
                  required: true,
                })}
                onClick={() => setIsGetRole(!isGetRole)}
                value={role?.title}
              />
              {
                isGetRole ?
                  <ul className="w-full bg-[#fff] absolute top-25 z-10 border-[2px] border-solid border-[#ccc] rounded-md p-0">
                    {
                      listRole.map((item,i) => (
                        <li
                          className="w-full text-[17px] font-[500] cursor-pointer hover:bg-[#ccc] p-2"
                          key={i}
                          onClick={() => {
                            setRole(item)
                          }}
                        >
                          {item.title}
                        </li>
                      ))
                    }
                  </ul> :
                  ""
              }
            </label>
          </div>
        </div>
        <div className="w-8/12">
          <button
            className="w-full h-[60px] text-lg font-medium text-[#FFFFFF] rounded-md bg-gradient-to-r from-[#18FFBA] to-[#1C99FF] mt-[15px] max-md:py-[13px] max-md:mb-[20px]"
            type="submit"
          >
            Đăng kí
          </button>
        </div>

      </form>
    </div>
  );
}

export default Register;
