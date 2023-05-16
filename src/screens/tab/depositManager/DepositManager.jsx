import React, { useEffect, useState } from 'react'
import { DepositManagers } from './DepositManager.styles';
import dele from '../../../assets/images/delete.png'
import { format } from 'date-fns'
import { useForm } from "react-hook-form";
import { getListDeposit, historyNap, historyNapUpdate } from '../../../services/userManServices'
import Notiflix from 'notiflix';
import searchicon from '../../../assets/images/searchicon.png'

function DepositManager() {
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [listPosit, setListPosit] = useState([]);
  // const [value, setvalue] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  useEffect(() => {
    historyNap()
      .then(res => {
        setBank(res.data.bankName);
        setAccount(res.data.bankNumber);
        setBranch(res.data.bankBranch);
        setName(res.data.accountName);
      })
      .catch(err => {
        console.log(err);
      })

    getListDeposit(search)
      .then(res => {
        setListPosit(res.data);
      })
  }, [])
  // update info bank
  const handlseUpdate = () => {
    historyNapUpdate({
      "bankName": bank,
      "bankNumber": account,
      "bankBranch": branch,
      "accountName": name
    })
      .then(res => {
        Notiflix.Notify.success('Cập nhật thành công')
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data.code);
        if (err.response.data.code === 'BAD_REQUEST') {
          Notiflix.Notify.failure('Vui lòng nhập đúng định dạng số tài khoản')
        }
      })
  }
  const handleSearch = () => {
    console.log(search);
    getListDeposit(search)
      .then(res => {
        setListPosit(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <DepositManagers>
      <DepositManagers.Header>
        <span>Quản lý nạp</span>

      </DepositManagers.Header>
      <DepositManagers.Body>
        <DepositManagers.Left
          onSubmit={handleSubmit(handlseUpdate)}
        >
          <div className='bg-[#B9D2FF] py-[25px] pl-[40px]'>
            <span className='text-[#000650] font-medium'>Cấu hình thông tin ngân hàng</span>
          </div>
          <div className='p-[40px] flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Ngân hàng</span>
              <input
                className='outline-none py-[10px] rounded-md px-[15px]'
                onChange={e => setBank(e.target.value)}
                value={bank}
              // {...register("bank", {
              //   required: false,
              //   maxLength: 3,
              // })}
              />
              {errors?.bank?.type === "maxLength" && (<p>Tên phải trên 3 ký tự</p>)}
              {errors?.bank?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Số tài khoản</span>
              <input
                className='outline-none py-[10px] rounded-md px-[15px]'
                onChange={e => setAccount(e.target.value)}
                value={account}
              // {...register("account", {
              //   required: false,
              //   pattern: /^\d+$/
              // })}
              />
              {errors?.account?.type === "pattern" && (<p>nhập sai định dạng</p>)}
              {errors?.account?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Chi nhánh</span>
              <input
                className='outline-none py-[10px] rounded-md px-[15px]'
                onChange={e => setBranch(e.target.value)}
                value={branch}
              // {...register("branch", {
              //   required: false,
              // })}
              />
              {errors?.branch?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Tên chủ tài khoản</span>
              <input
                className='outline-none py-[10px] rounded-md px-[15px]'
                onChange={e => setName(e.target.value)}
                value={name}
              // {...register("name", {
              //   required: false,
              // })}
              />
              {errors?.name?.type === "required" && (<p>Vui lòng không bỏ trống</p>)}
            </div>
            <button
              // type='submit'
              className='text-[#fff] rounded-lg bg-[#24CF41] py-[15px]'
            // onClick={handlseUpdate}
            >Cập nhật</button>
          </div>
        </DepositManagers.Left>
        {/* <DepositManagers.Right>
          <div className='w-full h-full rounded-[10px] overflow-hidden'>
            <div className='flex justify-between px-[15px] bg-[#B9D2FF] items-center py-[20px]'>
              <span className='text-[#000650] font-medium'>Lịch sử nạp</span>
              <DepositManagers.HeaderBoxinput >
                <DepositManagers.HeaderInput type="text" placeholder='nhập số diện thoại' value={search} onChange={(e) => setSearch(e.target.value)} />
                <DepositManagers.HeaderIcon onClick={handleSearch} src={searchicon} className="cursor-pointer" />
              </DepositManagers.HeaderBoxinput>
            </div>
            <div className='px-[15px] py-[20px] bg-[#F0F4FF] flex flex-col gap-[20px] h-full overflow-y-auto'>
              {
                listPosit?.map((item, index) => (
                  <div key={index} className='flex justify-between items-center bg-[#fff] p-[20px] rounded-sm shadow-sm'>
                    <span>{item.fullName}</span>
                    <span>{item.email}</span>
                    <span>{item.phone}</span>
                    <span>{formatter.format(item.amount)}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </DepositManagers.Right> */}
      </DepositManagers.Body>
    </DepositManagers>
  )
}

export default DepositManager