import React, { useState, useEffect } from 'react'
import { User } from './CommentMan.styles'
import searchicon from '../../../assets/images/searchicon.png'
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { getListUser, lockeduser } from '../../../services/userManServices'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePage, SearchUser } from '../../../store/manager/usermanagerSlice'
import { selecUser } from '../../../store/detailUser/detailUserSlice'
import Notiflix from 'notiflix'
import Dropdown from 'react-bootstrap/Dropdown';
import { addCmt, getComments } from '../../../services/listStory'

function CommentMan() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // handle view detail
    const handleViewDetail = (email) => {
        dispatch(selecUser(email))
        navigate('/detailUser')
    }
    // get list user
    const params = useSelector(state => state.commentMan)
    const handleGetuser = () => {
        getComments(params)
            .then(res => {
                setUsers(res.data);
                Notiflix.Loading.remove();
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        handleGetuser()
    }, [page, params])
    // set panage
    const handleNext = () => {
        dispatch(ChangePage(page + 1))
        setPage(page + 1)
    }
    const handlePrev = () => {
        dispatch(ChangePage(page - 1))
        setPage(page - 1)
    }
    // handle search
    const handleSearch = (e) => {
        setValue(e.target.value)
    }

    const handleBtnSearch = () => {
        Notiflix.Loading.pulse();
        dispatch(SearchUser(value))
        setPage(1)
    }
    // handle lock user
    const handleLock = ({ value, email }) => {
        lockeduser({ email: email, userStatus: value == 'INACTIVE' ? 'ACTIVE' : 'INACTIVE' })
            .then(() => {
                getListUser(params)
                    .then(res => {
                        setUsers(res.data);
                        Notiflix.Loading.remove();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }

    const handleXoa = (id) => {

    }

    const handleDuyet = (id) => {
        addCmt(id)
            .then(res => {
                console.log(res);
                Notiflix.Notify.success('duyệt thành công')
                handleGetuser()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <User>
            {/* header */}
            <User.Header>
                <User.HeaderTitle>Quản lý bình luận<nav></nav></User.HeaderTitle>
                {/* <User.HeaderBoxinput >
                    <User.HeaderInput type="text" placeholder='nhập số diện thoại' value={value} onChange={(e) => handleSearch(e)} />
                    <User.HeaderIcon onClick={handleBtnSearch} src={searchicon} className="cursor-pointer" />
                </User.HeaderBoxinput> */}
            </User.Header>
            {/* list user */}
            <User.Body>
                <div className='h-[90%] w-full overflow-y-auto'>
                    <User.Table>
                        <thead>
                            <User.TrHead >
                                <User.Th>Tên user</User.Th>
                                <User.Th>Nội dung bình luận</User.Th>
                                <User.Th></User.Th>
                                <User.Th></User.Th>
                            </User.TrHead>
                        </thead>
                        <tbody>
                            {
                                users.data?.map((item, index) => (
                                    <User.Tr key={index}>
                                        <User.Td>{item.UserInfo.fullName}</User.Td>
                                        <User.Td>{item.comment}</User.Td>
                                        <User.Td onClick={() => { handleXoa(item._id) }}>xoá</User.Td>
                                        <User.Td onClick={() => { handleDuyet(item._id) }}>duyệt</User.Td>
                                    </User.Tr>
                                ))
                            }
                        </tbody>
                    </User.Table>
                </div>
                <User.Panage>
                    <User.PanageBtn onClick={handlePrev} disabled={page <= 1 ? true : false}>
                        <AiOutlineLeft />
                    </User.PanageBtn>
                    <User.PanageNumber>
                        <span>{page}</span>
                        <span>/</span>
                        <span>{users?.totalPages}</span>
                    </User.PanageNumber>
                    <User.PanageBtn onClick={handleNext} disabled={page >= users?.totalPages ? true : false}>
                        <AiOutlineRight />
                    </User.PanageBtn>
                </User.Panage>
            </User.Body>
        </User >
    )
}

export default CommentMan