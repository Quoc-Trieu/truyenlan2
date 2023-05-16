import React, { useState } from 'react'
import { SettingW } from './setting.styles';
import dele from '../../../assets/images/delete.png'
import checkTrue from '../../../assets/images/checkTrue.png'
import checkFalse from '../../../assets/images/checkFalse.png'
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { getTradingConfig, updateTradingConfig } from '../../../services/configBySell';
import Notiflix from 'notiflix';
import { createTimeConfig, deleteTimeConfig, getTimeConfig } from '../../../services/configTime';
import { format } from 'date-fns'
// import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
// import moment from 'moment';

function Setting() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(format(new Date(), 'yyyy-MM-dd'));
  // const [time, setTime] = useState('');
  const [check, setCheck] = useState(true);
  const [configBuy, setConfigBuy] = useState('');
  const [configSell, setConfigSell] = useState('');
  const [listTime, setListTime] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [endTime, setEndTime] = useState();
  // config modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.4)'
    }
  }
  // get info trading config
  useEffect(() => {
    getTradingConfig()
      .then(res => {
        setConfigBuy(res.data.winRate);
        setConfigSell(res.data.lossRate);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  // get time config
  useEffect(() => {
    getTimeConfig()
      .then(res => {
        setListTime(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function openModal() {
    setStartTime(dayjs(new Date()))
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // use form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = () => {
    // const checkTime = (time) => {
    //   console.log(time);
    //   if (time > 9) {
    //     return time
    //   } else if (time == 0) {
    //     return 12
    //   } else if (time <= 9) {
    //     return `0${time}`
    //   }
    // }
    // console.log(value);
    // console.log(time);
    // console.log(check);
    // console.log(`${checkTime(time.$H)}:${time.$m > 9 ? time.$m : '0' + time.$m}:00`);
    if (!value) {
      Notiflix.Notify.failure('không bỏ trống ngày')
    } else if (!startTime) {
      Notiflix.Notify.failure('không bỏ trống thời gian bắt đầu')
    } else if (!endTime) {
      Notiflix.Notify.failure('không bỏ trống thời gian kết thúc')
    } else {
      createTimeConfig({
        "startDate": value,
        "startTime": `${startTime.$H}:${startTime.$m}:00`,
        "endTime": `${endTime.$H}:${endTime.$m}:00`,
        "status": check ? "BUY" : "SELL"
      })
        .then(res => {
          Notiflix.Notify.success('Thêm mới thành công')
          getTimeConfig()
            .then(res => {
              setListTime(res.data);
            })
            .catch(err => {
              console.log(err);
            })
          closeModal()
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.code == "TIME_CONFIG_EXIST") {
            Notiflix.Notify.failure('Thời gian đã được tạo')
          } else {
            switch (err.response.data.code) {
              case 'TIME_CONFIG_EXIST':
                Notiflix.Notify.failure('Thời gian tồn tại')
                break;
              case 'TIME_INVALID':
                Notiflix.Notify.failure('Thời gian không hợp lệ')
                break;
              default:
                Notiflix.Notify.failure('cấu hình thời gian thất bại')
                break;
            }
          }
        })
    }
  }
  const percents = (data => {
    updateTradingConfig({
      winRate: configBuy,
      lossRate: configSell
    })
      .then(res => {
        Notiflix.Notify.success('cập nhật thành công')
      })
      .catch(er => {
        Notiflix.Notify.failure('vui lòng không bỏ trống')
      })
  })
  // delete time config
  const handleDele = (id) => {
    deleteTimeConfig(id)
      .then(res => {
        Notiflix.Notify.success('Xoá thành công')
        getTimeConfig()
          .then(res => {
            setListTime(res.data);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        Notiflix.Notify.failure('Xoá không thành công')
      })
  }

  return (
    <SettingW>
      {/* modal statr */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='flex flex-col gap-[15px]'>
          <span className='w-full text-center font-medium text-[18px]'>Cấu hình thời gian thắng thua</span>
          <div className='flex flex-col gap-[10px]'>
            {/* date picker */}
            <div className='flex flex-col gap-[5px] w-fit'>
              <span className='text-[#000650] font-medium text-[17px]'>Chọn ngày</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Hôm nay"
                  value={value}
                  onChange={(newValue) => {
                    // console.log(newValue.$M + 1);
                    setValue(`${newValue?.$y ? newValue.$y : ''}-${newValue?.$M + 1}-${newValue?.$D ? newValue.$D : ''}`);
                  }}
                  renderInput={(params) => <TextField {...params} />}

                />
              </LocalizationProvider>
            </div>
            {/* time picker */}
            <div className='flex flex-col gap-[5px] w-fit'>
              <span className='text-[#000650] font-medium text-[17px]'>Thời gian bắt đầu</span>
              {/* <TextField
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
                clearable
                ampm={false}
                id="time"
                label="time"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <TimePicker
                    renderInput={(params) => <TextField {...params} />}
                    value={startTime}
                    label="min/max time"
                    onChange={(newValue) => {
                      setStartTime(newValue);
                    }}
                    ampm={false}
                    clearable
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className='flex flex-col gap-[5px] w-fit'>
              <span className='text-[#000650] font-medium text-[17px]'>Thời gian kết thúc</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <TimePicker
                    renderInput={(params) => <TextField {...params} />}
                    value={endTime}
                    label="min/max time"
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                    ampm={false}
                    clearable
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            {/* trạng thái */}
            <div className='flex flex-col gap-[5px] w-fit'>
              <span className='text-[#000650] font-medium text-[17px]'>Trạng thái </span>
              <div className='flex gap-[20px] items-center'>
                <div
                  className='flex gap-[5px] items-center cursor-pointer'
                  onClick={() => setCheck(true)}
                >
                  <img src={check ? checkTrue : checkFalse} className="w-[23px]" />
                  <span>Buy</span>
                </div>
                <div
                  className='flex gap-[5px] items-center cursor-pointer'
                  onClick={() => setCheck(false)}
                >
                  <img src={check ? checkFalse : checkTrue} className="w-[23px]" />
                  <span>Sell</span>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className='w-full flex justify-center gap-[15px]'>
            <button
              onClick={closeModal}
              className='font-bold text-[#fff] text-center w-full py-[12px] rounded bg-[#A1A1A1] cursor-pointer'
            >Hủy</button>
            <button
              onClick={onSubmit}
              className='font-bold text-[#fff] text-center w-full py-[12px] rounded bg-[#0082D9] cursor-pointer'
            >Xác nhận</button>
          </div>
        </div>
      </Modal>
      {/* modal end */}
      <SettingW.Header>
        <span>Cài đặt hệ thống</span>
      </SettingW.Header>
      <SettingW.Body>
        <SettingW.Left onSubmit={handleSubmit(percents)}>
          <div className='bg-[#B9D2FF] py-[25px] pl-[20px]'>
            <span className='text-[#000650] font-medium'>Cấu hình % tiền thắng thua</span>
          </div>
          <div className='px-[20px] py-[20px] flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Thắng</span>
              <input
                {...register("winRate", {
                  required: false,
                  pattern: /^\d+$/
                })}
                className='outline-none py-[10px] rounded-md px-[15px]'
                onChange={e => setConfigBuy(e.target.value)}
                value={configBuy}
                placeholder='%'
              />
            </div>
            {errors?.isBuy?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng không bỏ trống</p>}
            {errors?.isBuy?.type === "pattern" && <p className="text-[#FF0000] text-[14px]">*Nhập sai định dạng số</p>}
            <div className='flex flex-col gap-[10px]'>
              <span className='text-[#000650] font-medium'>Thua</span>
              <input
                {...register("lossRate", {
                  required: false,
                  pattern: /^\d+$/
                })}
                className='outline-none py-[10px] rounded-md px-[15px]'
                placeholder='%'
                onChange={e => setConfigSell(e.target.value)}
                value={configSell}
              />
            </div>
            {errors?.isSell?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng không bỏ trống</p>}
            {errors?.isSell?.type === "pattern" && <p className="text-[#FF0000] text-[14px]">*Nhập sai định dạng số</p>}
            <button type='submit' className='text-[#fff] rounded-lg bg-[#24CF41] py-[15px]'>Cập nhật</button>
          </div>
        </SettingW.Left>
        <SettingW.Right>
          <div className='w-full h-full rounded-[10px] overflow-hidden'>
            <div className='flex justify-between px-[15px] bg-[#B9D2FF] items-center py-[20px]'>
              <span className='text-[#000650] font-medium'>Cấu hình thời gian thắng thua</span>
              <div
                className='text-[#fff] font-medium py-[10px] px-[20px] rounded-md border-[1px] border-solid border-[#fff] bg-gradient-to-t from-[#2050A6] to-[#1AA0B5] cursor-pointer'
                onClick={openModal}
              >
                Thêm mới
              </div>
            </div>
            <div className='px-[15px] py-[20px] bg-[#F0F4FF] flex flex-col gap-[20px] h-full overflow-y-auto'>
              {
                listTime.map((item, index) => (
                  <div key={index} className='flex justify-between items-center bg-[#fff] p-[20px] rounded-sm shadow-sm'>
                    <span>{format(new Date(item.startDate), 'dd/MM/yyyy')}</span>
                    <span>{item.startTime} - {item.endTime}</span>
                    <span className={item.status == "BUY" ? 'text-[#00C923]' : 'text-[#EC4951]'}>{item.status == "BUY" ? 'Buy' : 'Sell'}</span>
                    <span className='cursor-pointer' onClick={() => handleDele(item.id)}><img src={dele} className="w-[20px]" /></span>
                  </div>
                ))
              }
            </div>
          </div>
        </SettingW.Right>
      </SettingW.Body>
    </SettingW>
  )
}

export default Setting