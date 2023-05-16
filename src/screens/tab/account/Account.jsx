import React, { useEffect, useState } from 'react'
import { Accounts } from './Account.styles'
import camera from '../../../assets/images/camera.png'
import avt from '../../../assets/images/avt.png'
import { useForm } from "react-hook-form";
import { account, changePass } from '../../../services/userManServices';
import Notiflix from 'notiflix';

function Account() {
    const [name, setName] = useState('');
    const [passWord, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    // config react form
    const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        changePass(data.password)
            .then(res => {
                Notiflix.Notify.success('cập nhật thành công')
            })
            .catch(err => {
                Notiflix.Notify.failure('cập nhật thất bại')
            })
    };
    // set acount
    useEffect(() => {
        account()
            .then(res => {
                setName(res.data.username);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <Accounts>
            {/* <Header title="Tài khoản của bạn" /> */}
            <Accounts.Header>
                <span>Tài khoản</span>
            </Accounts.Header>
            <Accounts.Body onSubmit={handleSubmit(onSubmit)}>
                <Accounts.Bodybg>
                    <Accounts.Boxavt>
                        <Accounts.avt src={avt} />
                        <Accounts.Boxcam>
                            <Accounts.Cam src={camera} />
                        </Accounts.Boxcam>
                    </Accounts.Boxavt>
                </Accounts.Bodybg>
                <Accounts.Boxdetail>
                    <div className='h-fit'>
                        <Accounts.ItemInfo>
                            <Accounts.ItemSpan>Tên:</Accounts.ItemSpan>
                            <Accounts.ItemInput type="text" value={name} onChange={e => setName(e.target.value)} />
                        </Accounts.ItemInfo>
                        <Accounts.ItemInfo>
                            <Accounts.ItemSpan>Password:</Accounts.ItemSpan>
                            <Accounts.ItemInput
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                })}
                                placeholder="nhập mật khẩu mới"
                                value={passWord}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Accounts.ItemInfo>
                        {errors?.password?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập mật khẩu </p>}
                        {errors?.password?.type === "minLength" && <p className="text-[#FF0000] text-[14px]">*Mật khẩu yêu cầu ít nhất 6 ký tự </p>}
                        <Accounts.ItemInfo>
                            <Accounts.ItemSpan>Re Password:</Accounts.ItemSpan>
                            <Accounts.ItemInput
                                {...register("confirm_password", {
                                    required: true,
                                    validate: (value) => {
                                        const { password } = getValues();
                                        return password === value || "Passwords should match!";
                                    }
                                })}
                                placeholder="nhập lại mật khẩu mới"
                                value={rePassword}
                                onChange={e => setRepassword(e.target.value)}
                            />
                        </Accounts.ItemInfo>
                        {errors?.confirm_password?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập lại mật khẩu </p>}
                        {errors?.confirm_password?.type === "validate" && <p className="text-[#FF0000] text-[14px]">*Mật khẩu không trùng khớp</p>}
                    </div>
                </Accounts.Boxdetail>
                <Accounts.Button>Cập nhật tài khoản</Accounts.Button>
            </Accounts.Body>
        </Accounts>
    )
}

export default Account