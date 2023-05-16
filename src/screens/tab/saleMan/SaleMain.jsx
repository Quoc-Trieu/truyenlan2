import {Sale} from "./SaleMain.styles";
import searchIcon from '../../../assets/images/searchicon.png'
import React, {useEffect, useState} from "react";
import {User} from "../userMan/UserMan.styles";
import Dropdown from "react-bootstrap/Dropdown";
import {getListUser, getSales, lockedSale, lockeduser} from "../../../services/userManServices";
import Notiflix from "notiflix";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ChangePage} from "../../../store/manager/usermanagerSlice";
import {changePageSale, searchSale} from "../../../store/manager/saleSlice";
const SaleMain = () => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('')
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useSelector(state => state.sale)
    useEffect(() => {
        handleGetSale(params)
    }, [page, params ])


    const handleGetSale = (params) => {
        getSales(params)
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
                Notiflix.Loading.remove();
            })
            .catch(err => {
                console.log(err);
            })
    }
   const  handleSearch = (e) => {
       setValue(e.target.value)
    }

    const handleLock = ({value, idSale}) => {
        lockedSale({ idSale: idSale, isLocked: value })
            .then(() => {
                getSales(params)
                    .then(res => {
                        setUsers(res.data);
                        Notiflix.Loading.remove();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }

    const handleBtnSearch = () => {
        dispatch(searchSale(value))
            setPage(1)

    }

    const handleViewAddSale = () => {
        navigate('/addSale')
    }

    const handleNext = () => {
        dispatch(changePageSale(page + 1))
        setPage(page + 1)
    }

    const handlePrev = () => {
        dispatch(changePageSale(page - 1))
        setPage(page - 1)
    }
    return (
       <Sale>
           <Sale.Header>
           <Sale.HeaderTitle>Quản lý Sale</Sale.HeaderTitle>
               <Sale.ButtonSale  onClick={handleViewAddSale}>
                     Thêm Sale
               </Sale.ButtonSale>
               <Sale.HeaderBoxinput >
                   <Sale.HeaderInput type="text" placeholder='nhập số tên sale' value={value} onChange={(e) => handleSearch(e)} />
                   <Sale.HeaderIcon onClick={handleBtnSearch} src={searchIcon} className="cursor-pointer" />
               </Sale.HeaderBoxinput>
       </Sale.Header>
           <Sale.Body>
               <div className='h-[90%] w-full overflow-y-auto'>
                   <User.Table>
                       <thead>
                       <User.TrHead >
                           <User.Th>ID</User.Th>
                           <User.Th>Tên</User.Th>
                           <User.Th>Mã giới thiệu</User.Th>
                           <User.Th></User.Th>
                       </User.TrHead>
                       </thead>
                       <tbody>
                       {
                           users.data?.map((item, index) => (
                               <User.Tr key={index}>
                                      <User.Td>{item.id}</User.Td>
                                   <User.Td>{item.username}</User.Td>
                                   <User.Td>{item.code}</User.Td>
                                   {/*<User.Td onClick={() => handleViewDetail(item.email)} className="cursor-pointer">Xem chi tiết</User.Td>*/}
                                   <User.Td>
                                      <Dropdown>
                                       <Dropdown.Toggle variant="success" id="dropdown-basic" style={item.isLocked ? { background: '#FD4A4A', color: '#fff' } : { background: '#fff', color: '#07BC5B' }}>
                                           {item?.isLocked ? 'Đang khoá' : 'Đang mở'}
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu style={{
                                           padding: '0',
                                           marginTop: '5px',

                                       }}>
                                           <Dropdown.Item
                                               onClick={() => handleLock({ value: !item.isLocked, idSale: item.id })}
                                               style={item.isLocked ? { background: '#fff', color: '#07BC5B' } : {
                                                   background: '#FD4A4A',
                                                   padding: '5px 10px',
                                                   border : "1px solid #ffff",
                                                   display: 'flex',
                                                   color: '#fff' ,
                                                   borderRadius: '5px',
                                               }}
                                           >{item?.isLocked ? 'Mở' : 'Khoá'}</Dropdown.Item>
                                       </Dropdown.Menu>
                                   </Dropdown>
                                   </User.Td>
                               </User.Tr>
                           ))
                       }
                       </tbody>
                   </User.Table>
               </div>

               <Sale.Panage>
                   <Sale.PanageBtn onClick={handlePrev} disabled={page <= 1}>
                       <AiOutlineLeft />
                   </Sale.PanageBtn>
                   <Sale.PanageNumber>
                       <span>{page}</span>
                       <span>/</span>
                       <span>{users?.meta?.pageCount}</span>
                   </Sale.PanageNumber>
                   <Sale.PanageBtn onClick={handleNext} disabled={page >= users?.meta?.pageCount}>
                       <AiOutlineRight />
                   </Sale.PanageBtn>
               </Sale.Panage>
           </Sale.Body>
       </Sale>

    );
}




export default SaleMain;