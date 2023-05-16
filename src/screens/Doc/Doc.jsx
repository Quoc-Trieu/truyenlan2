import React, { useState, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './Doc.module.scss';
import logo from '../../assets/logo512x512.jpg';
import user from '../../assets/user_icon.png';
import { useNavigate } from 'react-router-dom';
import dataListTruyen from '../../constants/dataListTruyen';
import dataTruyenNew from '../../constants/dataTruyenNew';
import Dropdown from 'react-bootstrap/Dropdown';
import iconDown from '../../assets/icon-feather-chevron-down.png';
import { Space, Table, Tag } from 'antd';
import { createCmt, getchapter, getchapterNext, getchapterPrev, getinfoStory, getList } from '../../services/listStory';
import { compareAsc, format } from 'date-fns'
import Notiflix from 'notiflix';
import { removeToken } from '../../utils/localStorage';

const Doc = () => {
    const navigate = useNavigate();
    const [defaults, setDefaults] = useState(true)
    const [openStory, setOpenStory] = useState(false)
    const [readStory, setReadStory] = useState(false)
    const [listStory, setListStory] = useState([])
    const [idStory, setIdStory] = useState(null)
    const [infoStory, setInfoStory] = useState({})
    const [data, setData] = useState([])
    const [chapter, setChapter] = useState({})
    const [cmt, setCmt] = useState('')

    const handleOpenStory = (id) => {
        setOpenStory(true)
        setDefaults(false)
        setIdStory(id)
        getinfoStory(id)
            .then(res => {
                setInfoStory(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRead = (id) => {
        setReadStory(true)
        setOpenStory(false)
        // console.log(id);
        setChapter(() => {
            return data.find((item) => {
                return item._id === id
            })
        })
    }

    const columns = [
        {
            title: 'Danh sách truyện',
            dataIndex: 'index',
            key: 'index',
            render: (index, record) => <a onClick={() => handleRead(record._id)}>Chương {index + 1}</a>,
        },
    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];

    useEffect(() => {
        if (idStory) {
            getchapter(idStory)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [idStory])

    useEffect(() => {
        getList({
            typeStory: 'ALL',
            page: 1,
            limit: 20
        })
            .then(res => {
                setListStory(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleCmt = () => {
        if (cmt.length > 0 && userRole) {
            createCmt({
                "idStory": idStory,
                "body": cmt,
                "isShow": true
            })
                .then(res => {
                    console.log(res);
                    Notiflix.Notify.success('bình luận thành công')
                    setCmt('')
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            if (cmt.length < 1) {
                Notiflix.Notify.warning('vui lòng nhập bình luận')
            } else {
                Notiflix.Notify.warning('vui lòng đăng nhập để được bình luận')
            }
        }
    }

    const userRole = useSelector((state) => state.auth.user);

    const handlePrev = () => {
        getchapterPrev(chapter._id)
            .then(res => {
                console.log(res.data);
                setChapter(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleNext = () => {
        getchapterNext(chapter._id)
            .then(res => {
                console.log(res.data);
                setChapter(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div id={styles.homePage}>
            <div className={styles.header}>
                {/* logo */}
                <div className={styles.headerLeft}>
                    <img src={logo} alt="logo" />
                    <span>Xem Truyện</span>
                </div>
                {/* lọc và tìm kiếm */}
                <div className={styles.headerCenter}>
                    <Dropdown drop="down" >
                        <Dropdown.Toggle className={styles.dropDanhSach}>
                            <span>Danh sách</span>
                            <img src={iconDown} style={{ width: '16px', height: '10px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ padding: 0 }} >
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown drop="down" >
                        <Dropdown.Toggle className={styles.dropDanhSach}>
                            <span>Thể loại</span>
                            <img src={iconDown} style={{ width: '16px', height: '10px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ padding: 0 }} >
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Tìm kiếm */}
                    <div className={styles.timKiem}>
                        <input placeholder="Tìm kiếm" />
                    </div>
                </div>
                {/* tài khoản */}
                <div className={styles.headerRight}>
                    <img src={user} alt="logo" />
                    {
                        userRole ?
                            <div
                                className={styles.buttonLogin}
                                onClick={async () => {
                                    await removeToken()
                                    await window.location.reload()
                                }}
                            >
                                <span>Đăng xuất</span>
                            </div> :
                            <div
                                className={styles.buttonLogin}
                                onClick={() => navigate('/login')}
                            >
                                <span>Đăng nhập</span>
                            </div>

                    }
                </div>
            </div>
            {
                defaults ?
                    // list truyện
                    <div>
                        {/* Truyện HOT */}
                        <div className={styles.truyenHot}>
                            <div className={styles.title}>
                                <span>TRUYỆN HOT</span>
                            </div>

                            {/* list thẻ truyện */}
                            <div className={styles.listCardTruyen}>
                                {listStory.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.cardTruyen} onClick={() => handleOpenStory(item._id)}>
                                            <img src={`http://45.76.145.5:3008${item.image}`} alt="truyen" />
                                            <span>{item.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Truyện mới cập nhập */}
                        <div className={styles.truyenNew}>
                            <div className={styles.title}>
                                <span>TRUYỆN MỚI CẬP NHẬP</span>
                            </div>

                            {/* list truyện mới*/}
                            <div className={styles.listTruyen}>
                                {listStory.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.itemTruyen} onClick={() => handleOpenStory(item._id)}>
                                            <span>{item.title}</span>
                                            <span>{item.author}</span>
                                            <span>{item.chapter}</span>
                                            <span>{format(new Date(item.updatedAt), 'dd-MM-yyyy')}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div> : ""
            }
            {
                openStory ?
                    // chi tiết truyện
                    <div className={styles.detailStory}>
                        <div className={styles.Top}>
                            <div className={styles.left}>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <img src={`http://45.76.145.5:3008${infoStory?.image}`} alt="" />
                                </div>
                                <div>
                                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                                </div>
                            </div>
                            <div className={styles.right}>
                                <spa className={styles.title}>{infoStory?.title}</spa>
                                <div className={styles.box}><span>Tac gia:</span><span>ngo huyen</span></div>
                                <div className={styles.box}><span>The loai:</span><span>{infoStory?.type}</span></div>
                                <div className={styles.box}><span>Mo ta ngan:</span><div className={styles.decreption}>{infoStory?.description}</div></div>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.top}>
                                <input type="text" value={cmt} onChange={(e) => setCmt(e.target.value)} />
                                <button onClick={handleCmt}>Bình luận</button>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div> : ""
            }
            {
                // doc truyen   
                readStory ?
                    <div className={styles.readStory}>
                        <span>{infoStory?.title}</span>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <span
                                onClick={handlePrev}
                                style={{ fontSize: '20px', cursor: 'pointer' }}>&larr;</span>
                            <span>chuong {chapter?.index + 1}</span>
                            <span
                                onClick={handleNext}
                                style={{ fontSize: '20px', cursor: 'pointer' }}>&#8594;</span>
                        </div>
                        <p>{chapter?.body}</p>
                    </div>
                    :
                    ""
            }

        </div>
    );
};

export default Doc;
