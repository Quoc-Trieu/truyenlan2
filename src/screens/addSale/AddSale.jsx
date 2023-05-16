import React, {useState} from "react";
import {AddSaleStyle} from "./AddSale.styles";
import {DepositManagers} from "../tab/depositManager/DepositManager.styles";
import {useForm} from "react-hook-form";
import { addSale } from "../../services/userManServices";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";

const AddSale = () =>{

    const [username , setUsername ] = useState("");
    const [password ,setPassword ]= useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const handledAddSale = async() =>{
        setIsDisabled(true);
        console.log("username",username);
        await addSale({
            username: username,
            password: password,
          })
            .then(res => {
              Notiflix.Notify.success('Thêm sale thành công')
              navigate('/sale')
            })
            .catch(err => {
              console.log(err);
              console.log(err.response.data.code);
            
            })



    }
    return (
        <AddSaleStyle>
            <AddSaleStyle.Header>
            </AddSaleStyle.Header>

            <AddSaleStyle.Body>
                <AddSaleStyle.Left
                    onSubmit={handleSubmit(handledAddSale)}
                >
                    <div className='bg-[#B9D2FF] py-[25px] pl-[40px]'>
                        <span className='text-[#000650] font-medium uppercase'>Thêm sale</span>
                    </div>
                    <div className='p-[40px] flex flex-col gap-[20px]'>
                        <div className='flex flex-col gap-[10px]'>
                            <span className='text-[#000650] font-medium'>Username</span>
                            <input
                                className='outline-none py-[10px] rounded-md px-[15px]'
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                // {...register("username", {
                                //   required: false,
                                //   maxLength: 3,
                                // })}
                            />
                            {errors?.username?.type === "maxLength" && (<p>Tên phải trên 3 ký tự</p>)}
                            {errors?.username?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
                        </div>
                             <div className='flex flex-col gap-[10px]'>
                            <span className='text-[#000650] font-medium'>Password</span>
                            <input
                                className='outline-none py-[10px] rounded-md px-[15px]'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                // {...register("password", {
                                //   required: false,
                                //   maxLength: 3,
                                // })}
                            />
                            {errors?.password?.type === "maxLength" && (<p>Tên phải trên 3 ký tự</p>)}
                            {errors?.password?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
                        </div>


                        <button disabled={isDisabled}
                            // type='submit'
                            className='text-[#fff] rounded-lg bg-[#24CF41] py-[15px]'
                            // onClick={handlseUpdate}
                        >Cập nhật</button>
                    </div>
                </AddSaleStyle.Left>
            </AddSaleStyle.Body>
        </AddSaleStyle>
    )

}

export default AddSale