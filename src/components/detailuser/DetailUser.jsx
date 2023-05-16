import React, { useEffect } from 'react'
import { Detail, Form } from './DetailUser.styles'
import arrowleft from '../../assets/images/arrow-left.png'
import avt from '../../assets/images/avt.png'
import cmnd from '../../assets/images/cmnd.png'
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { format } from 'date-fns'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './detailuser.css';
import Dropdown from 'react-bootstrap/Dropdown';
import coinIcon from '../../assets/images/coinIcon.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePassWord, deposit, getDetailUser, historyTrading, historyTran, imgCard, lockeduser, withdraw } from '../../services/userManServices'
import { getToken } from '../../utils/localStorage'
import { useForm } from "react-hook-form";
import Notiflix from 'notiflix'
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';



function DetailUser() {
    const [value, setValue] = React.useState(format(new Date(), 'yyyy-MM-dd'))
    const [user, setUser] = React.useState();
    const [history, setHistory] = React.useState();
    const [history2, setHistory2] = React.useState();
    const [cardback, setCardback] = React.useState();
    const [cardfront, setCardfront] = React.useState();
    const [cardavt, setCardavt] = React.useState();
    const [page, setPage] = React.useState(1);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenpass, setIsOpenpass] = React.useState(false);
    const [money, setMoney] = React.useState('');
    const [typeModal, setTypeModal] = React.useState('');

    const [newpass, setNewpass] = React.useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // get detail user
    const mailUser = useSelector(state => state.detailUser.email);
    const mailUserLocal = localStorage.getItem('emailUser')
    const getUser = () => {
        getDetailUser(mailUser ? mailUser : mailUserLocal)
            .then(res => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getUser()
    }, [])
    // get img card
    if (user) {
        // back img
        imgCard({ filename: user?.cardBackImage, token: getToken() })
            .then(res => {
                setCardback(res.request.responseURL);
            })
            .catch(err => {
                console.log(err);
            })
        // front img
        imgCard({ filename: user?.cardFrontImage, token: getToken() })
            .then(res => {
                setCardfront(res.request.responseURL);
            })
            .catch(err => {
                console.log(err);
            })
        // avt img
        imgCard({ filename: user?.cardImage, token: getToken() })
            .then(res => {
                setCardavt(res.request.responseURL);
            })
            .catch(err => {
                console.log(err);
            })
    }
    // get lịch trading của user
    useEffect(() => {
        historyTrading({ page: page, email: mailUser ? mailUser : mailUserLocal, date: value })
            .then(res => {
                setHistory(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [page, value])
    // set panage
    const handleNext = () => {
        // dispatch(ChangePage(page + 1))
        setPage(page + 1)
    }
    const handlePrev = () => {
        // dispatch(ChangePage(page - 1))
        setPage(page - 1)
    }
    // get lịch sử nạp rút của user
    useEffect(() => {
        historyTran({ page: page, email: mailUser ? mailUser : mailUserLocal })
            .then(res => {
                setHistory2(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    // console.log(user);
    // config modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%'
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.4)'
        }
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    function openModalpass() {
        setIsOpenpass(true);
    }
    function closeModalpass() {
        setIsOpenpass(false);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        if (typeModal == 'rut') {
            withdraw({ amount: money, email: mailUser ? mailUser : mailUserLocal })
                .then(res => {
                    Notiflix.Notify.success('tạo lệnh rút tiền thành công')
                    getUser()
                    historyTran({ page: page, email: mailUser ? mailUser : mailUserLocal })
                        .then(res => {
                            setHistory2(res.data.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    closeModal()
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.data.code = "NOT_ENOUGH_MONEY") {
                        Notiflix.Notify.failure('không đủ tiền')
                    } else {
                        Notiflix.Notify.failure('không đủ tiền')
                    }
                })
        } else {
            deposit({ amount: money, email: mailUser ? mailUser : mailUserLocal })
                .then(res => {
                    Notiflix.Notify.success('tạo lệnh nạp tiền thành công')
                    getUser()
                    historyTran({ page: page, email: mailUser ? mailUser : mailUserLocal })
                        .then(res => {
                            setHistory2(res.data.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    closeModal()
                })
                .catch(err => {
                    console.log(err);
                    Notiflix.Notify.failure('nạp tiền không thành công')
                    // if (err.response.data.code = "NOT_ENOUGH_MONEY") {
                    //     Notiflix.Notify.failure('không đủ tiền')
                    // } else {

                    // }
                })
        }

    }
    // handle lock user
    const handleLock = (value) => {
        lockeduser({ email: user.email, isLocked: value })
            .then(() => {
                getUser()
            })
    }

    // check type mua ban huy
    const checkType = (type) => {
        switch (type) {
            case 'BUY':
                return 'Mua'
            case 'SELL':
                return 'Bán'

            default:
                return 'Hủy'
        }
    }
    // form change pass user
    const changePass = data => {
        // console.log(newpass);
        ChangePassWord({
            "email": user?.email,
            // "password": data.pass
            "password": newpass
        })
            .then(res => {
                console.log(res);
                Notiflix.Notify.success('đổi mật khẩu thành công')
                setNewpass('')
                closeModalpass()
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message[0] == "password must be longer than or equal to 3 characters") {
                    Notiflix.Notify.failure('mật khẩu tối thiểu 3 ký tự')
                } else if (err.response.data.message[0] == "password must be shorter than or equal to 20 characters") {
                    Notiflix.Notify.failure('mật khẩu tối đa 20 ký tự')
                }
                else {
                    Notiflix.Notify.failure('đổi mật khẩu không thành công')
                }
            })
    };
    return (
        <Detail>
            {/* modal start */}
            <Modal
                isOpen={modalIsOpenpass}
                onRequestClose={closeModalpass}
                style={customStyles}
            >
                <div
                    // onSubmit={handleSubmit(changePass)}
                    className='flex flex-col gap-[15px] items-center w-full'
                >
                    <span className='text-[20px] font-semibold text-center'>Đổi mật khẩu user</span>
                    <div>
                        <input
                            value={newpass}
                            onChange={(e) => setNewpass(e.target.value)}
                            className='w-fit border-[1px] border-[#707070] outline-none border-solid rounded-sm px-[10px] py-[5px]'
                        // {...register("pass", {
                        //     required: true,
                        //     minLength: 6,
                        // })}
                        />
                        {/* {errors?.pass?.type === "required" && <p className='text-[14px] text-[#FF444E]'>không bỏ trống</p>}
                        {errors?.pass?.type === "minLength" && <p className='text-[14px] text-[#FF444E]'>mật khẩu phải nhiều hơn hoặc bằng 6 ký tự</p>} */}
                    </div>
                    <button type="submit" className='px-[10px] py-[5px] rounded-sm text-[#fff] bg-[#0CDA59]' onClick={changePass}>Xác nhận</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Form.Title>{typeModal == 'Rút' ? 'rút' : 'Nạp'} Tiền</Form.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Item>
                        <Form.Span>Số tiền cần {typeModal == 'rut' ? 'rút' : 'nạp'}</Form.Span>
                        <CurrencyInput
                            className='outline-[#000]
                            outline-[1px]
                            w-full
                            border-[1px]
                            border-solid
                            border-[#B7B7B7]
                            rounded-[3px]
                            py-[10px]
                            px-[20px]'
                            {...register("amount", {
                                required: true,
                            })}
                            placeholder="Please enter a money"
                            onValueChange={value => setMoney(value)}
                        />
                        {errors?.amount?.type === "required" && <p className="text-[#FF0000] text-[14px]">*Vui lòng nhập số tiền </p>}
                    </Form.Item>
                    <Form.BoxBtn>
                        <Form.CancleBtn onClick={closeModal}>Hủy</Form.CancleBtn>
                        <Form.SubmitBtn>{typeModal == 'rut' ? 'rút' : 'nạp'} tiền</Form.SubmitBtn>
                    </Form.BoxBtn>
                </Form>
            </Modal>
            {/* modal end */}
            <Detail.Header>
                <Detail.btnLeft onClick={() => navigate(-1)}>
                    <img src={arrowleft} />
                </Detail.btnLeft>
                <span>Tài khoản</span>
            </Detail.Header>
            <Detail.body>
                <Detail.leftPage>
                    <Detail.detailImg>
                        <Detail.boximg>
                            <Detail.boximgTitle>Ảnh mặt trước CMND/CCCD</Detail.boximgTitle>
                            <Detail.wrapperImg>
                                <Detail.Img src={cardfront} alt="" />
                            </Detail.wrapperImg>
                        </Detail.boximg>
                        <Detail.boximg>
                            <Detail.boximgTitle>Ảnh mặt sau CMND/CCCD</Detail.boximgTitle>
                            <Detail.wrapperImg>
                                <Detail.Img src={cardback} alt="" />
                            </Detail.wrapperImg>
                        </Detail.boximg>
                        <Detail.boximg>
                            <Detail.boximgTitle>Ảnh chân dung</Detail.boximgTitle>
                            <Detail.wrapperImg>
                                <Detail.Img src={cardavt} alt="" />
                            </Detail.wrapperImg>
                        </Detail.boximg>
                    </Detail.detailImg>
                    <Detail.historyTran>
                        <Detail.historyhead className="historyFilter">
                            <Detail.historyheadTitle >Lịch sử giao dịch</Detail.historyheadTitle>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    // label="lọc ngày"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(`${newValue?.$y ? newValue.$y : ''}-${newValue?.$M + 1}-${newValue?.$D ? newValue.$D : ''}`)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </LocalizationProvider>
                        </Detail.historyhead>
                        <div className='h-[230px] w-full overflow-y-auto'>
                            <Detail.Table>
                                <thead>
                                    <Detail.TrHead>
                                        <Detail.Th>STT</Detail.Th>
                                        <Detail.Th>Ngày</Detail.Th>
                                        <Detail.Th>Giao dịch</Detail.Th>
                                        <Detail.Th>Lợi nhuận</Detail.Th>
                                        <Detail.Th>Đầu tư</Detail.Th>
                                    </Detail.TrHead>
                                </thead>
                                <tbody>
                                    {
                                        history?.data.map((item, index) => (
                                            <Detail.Tr key={index}>
                                                <Detail.Td>{(5 * page + index + 1) - 5}</Detail.Td>
                                                <Detail.Td>{format(new Date(item.createdAt), 'HH:mm - dd.MM.yyy')}</Detail.Td>
                                                <Detail.Td>{item.status == 'CANCEL' ? 'Huy' : checkType(item.position)}</Detail.Td>
                                                <Detail.Td className={item.status == 'LOSE' ? 'text-[#EC4951]' : 'text-[#00C923]'}>{item.status == 'LOSE' ? '-' : '+'}${item.profit}</Detail.Td>
                                                <Detail.Td>${item.amount}</Detail.Td>
                                            </Detail.Tr>
                                        ))
                                    }
                                </tbody>
                            </Detail.Table>
                        </div>
                        <Detail.paging>
                            <Detail.Boxai onClick={handlePrev} disabled={page <= 1 ? true : false}>
                                <AiOutlineLeft />
                            </Detail.Boxai>
                            <Detail.Number>
                                <span>{page}</span>
                                <span>/</span>
                                <span>{history?.meta?.pageCount}</span>
                            </Detail.Number>
                            <Detail.Boxai onClick={handleNext} disabled={page >= history?.meta?.pageCount ? true : false}>
                                <AiOutlineRight />
                            </Detail.Boxai>
                        </Detail.paging>
                    </Detail.historyTran>
                </Detail.leftPage>
                <Detail.rightPage>
                    <Detail.rightPageTopTitle>Thông tin cá nhân</Detail.rightPageTopTitle>
                    <Detail.rightPageTop>
                        <div className='flex gap-[15px]'>
                            <Detail.spanInfo >User ID:</Detail.spanInfo>
                            <Detail.spanInfoValue>{user?.accountId}</Detail.spanInfoValue>
                        </div>
                        <div className='flex gap-[15px]'>
                            <Detail.spanInfo >Email:</Detail.spanInfo>
                            <Detail.spanInfoValue>{user?.email}</Detail.spanInfoValue>
                        </div>
                        <div className='flex gap-[15px]'>
                            <Detail.spanInfo >Tên:</Detail.spanInfo>
                            <Detail.spanInfoValue>{user?.fullName}</Detail.spanInfoValue>
                        </div>
                        <div className='flex gap-[15px]'>
                            <Detail.spanInfo >Số điện thoại:</Detail.spanInfo>
                            <Detail.spanInfoValue>{user?.phone}</Detail.spanInfoValue>
                        </div>
                        <div className='flex gap-5'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={user?.isLocked ? { background: '#FD4A4A', color: '#fff' } : { background: '#fff', color: '#07BC5B' }}>
                                    {user?.isLocked ? 'Đang khoá' : 'Đang mở'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleLock(user?.isLocked ? false : true)}
                                        style={user?.isLocked ? { background: '#fff', color: '#07BC5B' } : { background: '#FD4A4A', color: '#fff' }}
                                    >{user?.isLocked ? 'Mở' : 'Khoá'}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button
                                className='border-[1px] border-solid border-[#707070] rounded-md px-[12px] font-medium'
                                onClick={openModalpass}
                            >Đổi mật khẩu</button>
                        </div>
                    </Detail.rightPageTop>
                    <Detail.rightPageBtom>
                        <Detail.boxMoney >
                            <Detail.boxMoneyLeft>
                                <Detail.boxMoneyLeftImg src={coinIcon} alt="" />
                                <Detail.boxMoneyLeftValue>
                                    <span>Số dư:</span>
                                    <span className='font-bold text-[19px]'>${user?.money}</span>
                                </Detail.boxMoneyLeftValue>
                            </Detail.boxMoneyLeft>
                            <Detail.boxMoneyRight>
                                <Detail.boxMoneyRightBtn
                                    className="bg-gradient-to-r from-[#28D2C1] to-[#0CDA59]"
                                    onClick={() => {
                                        setTypeModal('nap')
                                        openModal()
                                    }}
                                >Nạp tiền</Detail.boxMoneyRightBtn>
                                <Detail.boxMoneyRightBtn
                                    className="bg-gradient-to-r from-[#FF5E92] to-[#FF444E]"
                                    onClick={() => {
                                        setTypeModal('rut')
                                        openModal()
                                    }}
                                >Rút tiền</Detail.boxMoneyRightBtn>
                            </Detail.boxMoneyRight>
                        </Detail.boxMoney>
                        <Detail.history>
                            <Detail.historyTitle>
                                <span>Lịch sử nạp rút</span>
                            </Detail.historyTitle>
                            <Detail.historyList>
                                {
                                    history2?.map((item, index) => (
                                        <Detail.historyItem key={index}>
                                            <span>{format(new Date(item.createdAt), 'HH:mm - dd.MM.yyy')}</span>
                                            <span className={item.type == 'DEPOSIT' ? 'text-[#00C923]' : 'text-[#EC4951]'}>{item.type == "DEPOSIT" ? '+' : '-'}{item.amount}</span>
                                        </Detail.historyItem>
                                    ))

                                }
                            </Detail.historyList>
                        </Detail.history>
                    </Detail.rightPageBtom>
                </Detail.rightPage>
            </Detail.body>
        </Detail>
    )
}

export default DetailUser