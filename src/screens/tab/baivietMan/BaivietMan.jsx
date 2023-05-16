import React, { useState, useEffect } from 'react'
import { User } from './BaivietMan.styles'
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
import { addCmt, getBaiviet, getComments } from '../../../services/listStory'

function BaivietMan() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('');
    const [modal, setModal] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // handle view detail
    const handleViewDetail = (email) => {
        dispatch(selecUser(email))
        navigate('/detailUser')
    }
    // get list user
    const params = useSelector(state => state.baivietMan)
    const handleGetuser = () => {
        getBaiviet(params)
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }

    return (
        <User>
            {/* header */}
            <User.Header>
                <User.HeaderTitle>Quản lý bình luận<nav></nav></User.HeaderTitle>
                <User.HeaderBoxinput >
                    thêm truyện
                </User.HeaderBoxinput>

            </User.Header>
            {/* list user */}
            <User.Body>
                <div className='h-[90%] w-full overflow-y-auto'>
                    <User.Table>
                        <thead>
                            <User.TrHead >
                                <User.Th>Tên truyện</User.Th>
                                <User.Th>Số chương</User.Th>
                                <User.Th>chỉnh sửa</User.Th>
                                <User.Th>Thêm chương</User.Th>
                            </User.TrHead>
                        </thead>
                        <tbody>
                            {
                                users.data?.map((item, index) => (
                                    <User.Tr key={index}>
                                        <User.Td>{item.idAuth.fullName}</User.Td>
                                        <User.Td>{item.comment}</User.Td>
                                        <User.Td onClick={() => { handleXoa(item._id) }}>sửa</User.Td>
                                        <User.Td onClick={() => { handleDuyet(item._id) }}>thêm</User.Td>
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

            {
                modal ?
                    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <div>
                                <span style={{width: '120px'}}>Tiêu đề truyện:</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Loại truyện:</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Mô tả:</span>
                                <input type="text" />
                            </div>
                            <div>
                                <input type="file" onChange={handleFileChange} />
                                {previewImage && <img width={100} src={previewImage} alt="Preview" />}
                            </div>
                        </div>
                    </div> :
                    <></>
            }
        </User >
    )
}

export default BaivietMan