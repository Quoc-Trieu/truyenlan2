import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import user from '../../assets/images/user.png';
import account from '../../assets/images/account.png';
import chat from '../../assets/images/chat.png';
import logOut from '../../assets/images/logOut.png';
import close from '../../assets/images/close.png';
import recycle from '../../assets/images/recycle.png';
import setting from '../../assets/images/setting.png';
import { NavWapper } from './Nav.styles';
import { useLocation, useNavigate } from 'react-router-dom'
import { changeIsOpen } from '../../store/navRes/navResSlice';
import { useDispatch, useSelector } from 'react-redux'
import { isOpen } from '../../store/navRes/navResSelector';
import { getToken, removeToken } from '../../utils/localStorage'
import { AiFillBank } from 'react-icons/ai';

function Nav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isopen = useSelector(isOpen)
    const Nav = isopen ? NavWapper.Open : NavWapper;
    // handle logout
    const handleLogOut = () => {
        removeToken()
        navigate('/')
        window.location.reload();
    }

    const admin = useSelector((state) => state.auth.user);
    console.log(admin.role[0]);
    return (
        <Nav>
            <NavWapper.IconClose
                src={close}
                onClick={() => dispatch(changeIsOpen(false))}
            />
            {/* <NavWapper.Ul>
                <NavWapper.Li
                    onClick={() => {
                        navigate('/')
                        dispatch(changeIsOpen(false))
                    }}
                    className={pathname === '/' || pathname === '/detailUser' ? 'bg-[#465991]' : ''}
                >
                    <NavWapper.Img className="ml-[15px]" src={user} />
                    <NavWapper.Span>Quản lý user</NavWapper.Span>
                </NavWapper.Li>
                <NavWapper.Li
                    onClick={() => {
                        navigate('/account')
                        dispatch(changeIsOpen(false))
                    }}
                    className={pathname === '/account' ? 'bg-[#465991]' : ''}
                >
                    <NavWapper.Img className="w-[40px] h-[40px] ml-[10px]" src={account} />
                    <NavWapper.Span>Tài khoản</NavWapper.Span>
                </NavWapper.Li>
            </NavWapper.Ul> */}
            <>
                {
                    admin && admin.role[0] === 'ADMIN' ?
                        (
                            <NavWapper.Ul>
                                <li className='max-md:hidden'>
                                    <img src={logo} className='w-[200px] h-header' alt="" />
                                </li>
                                <NavWapper.Li
                                    onClick={() => {
                                        navigate('/')
                                        dispatch(changeIsOpen(false))
                                    }}
                                    className={pathname === '/' || pathname === '/detailUser' ? 'bg-[#465991]' : ''}
                                >
                                    <NavWapper.Img className="ml-[15px]" src={user} />
                                    <NavWapper.Span>Quản lý user</NavWapper.Span>
                                </NavWapper.Li>
                                <NavWapper.Li
                                    onClick={() => {
                                        navigate('/author')
                                        dispatch(changeIsOpen(false))
                                    }}
                                    className={pathname === '/author' ? 'bg-[#465991]' : ''}
                                >
                                    <NavWapper.Img className="ml-[15px]" src={user} />
                                    <NavWapper.Span>Quản lý tác giả</NavWapper.Span>
                                </NavWapper.Li>
                                <NavWapper.Li
                                    onClick={() => {
                                        navigate('/comment')
                                        dispatch(changeIsOpen(false))
                                    }}
                                    className={pathname === '/comment' ? 'bg-[#465991]' : ''}
                                >
                                    <NavWapper.Img className="w-[40px] h-[40px] ml-[10px]" src={account} />
                                    <NavWapper.Span>Bình luận</NavWapper.Span>
                                </NavWapper.Li>
                            </NavWapper.Ul>
                        ) : (<NavWapper.Ul>
                            <li className='max-md:hidden'>
                                <img src={logo} className='w-[200px] h-header' alt="" />
                            </li>

                            <NavWapper.Li
                                onClick={() => {
                                    window.open(`http://139.180.215.68:3003/app?token=${getToken()}&role=SALE`, '_blank')
                                    dispatch(changeIsOpen(false))
                                }}
                                className={pathname === '/' ? 'bg-[#465991]' : ''}
                            >
                                <NavWapper.Img className="w-[40px] h-[40px] ml-[10px]" src={chat} />
                                <NavWapper.Span>Quản lý bài viết</NavWapper.Span>
                            </NavWapper.Li>
                        </NavWapper.Ul>)
                }

            </>
            <NavWapper.Out onClick={handleLogOut}>
                <NavWapper.Img className='w-[25px] h-[25px] max-md:w-[30px] max-md:h-[30px]' src={logOut} />
                <NavWapper.Span>Đăng xuất</NavWapper.Span>
            </NavWapper.Out>
        </Nav >
    )
}

export default Nav