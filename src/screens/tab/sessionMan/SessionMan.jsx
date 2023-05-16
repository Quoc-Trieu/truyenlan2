import React, { useEffect, useState } from 'react'
import { SessionMan } from './SessionMan.styles'
import totalpeople from '../../../assets/images/totalpeople.png'
import upIcon from '../../../assets/images/upIcon.png'
import downIcon from '../../../assets/images/downIcon.png'
import io from 'socket.io-client';

function Sessionman() {
    const [data, setData] = useState([])
    const [count, setCount] = useState()
    useEffect(() => {
        const socket = io('https://test.binnancenter.com');
        socket.on('manager-session', (data) => {
            console.log(data.trade);
            if (data.trade) {
                setData(data);
            }
        });

        socket.on('message', (data) => {
            setCount(data.counter);
            if (data.counter === 0) {
                setData([])
            }
        });
    }, [])

    useEffect(() => {
        const socket = io('https://test.binnancenter.com');
        socket.emit("load", {
            load: true
        });

        return () => {
            const socket = io('https://test.binnancenter.com');
            socket.emit("load", {
                load: true
            });
        }
    }, [])
    return (
        <SessionMan>
            <SessionMan.Header>
                <span>Quản lý phiên</span>
            </SessionMan.Header>
            <SessionMan.Body>
                <SessionMan.Left>
                    <SessionMan.LeftTop>
                        <SessionMan.BoxValue>
                            <span>Tổng người chơi</span>
                            <SessionMan.BoxValueNumber className="bg-gradient-to-r from-[#12C9D6] to-[#0867A7]">
                                <SessionMan.TitileBox>{data?.count ? data?.count : 0}</SessionMan.TitileBox>
                                <SessionMan.IconValue src={totalpeople} />
                            </SessionMan.BoxValueNumber>
                        </SessionMan.BoxValue>
                        <SessionMan.BoxValue>
                            <span>Tổng đánh lên</span>
                            <SessionMan.BoxValueNumber className="bg-gradient-to-r from-[#24CF41] to-[#00D87A]">
                                <SessionMan.TitileBox>{data?.buy ? data?.buy : 0}</SessionMan.TitileBox>
                                <SessionMan.IconValue src={upIcon} />
                            </SessionMan.BoxValueNumber>
                        </SessionMan.BoxValue>
                        <SessionMan.BoxValue>
                            <span>Tổng đánh xuống</span>
                            <SessionMan.BoxValueNumber className="bg-gradient-to-r from-[#F03D46] to-[#E82D6A]">
                                <SessionMan.TitileBox>{data?.sell ? data?.sell : 0}</SessionMan.TitileBox>
                                <SessionMan.IconValue src={downIcon} />
                            </SessionMan.BoxValueNumber>
                        </SessionMan.BoxValue>
                    </SessionMan.LeftTop>
                    <SessionMan.LeftBottom >
                        <span className='font-bold text-[#FF000C]'>{count}s</span>
                        <span>Thời gian còn lại</span>
                    </SessionMan.LeftBottom>
                </SessionMan.Left>
                <SessionMan.Right>
                    <SessionMan.Table>
                        <thead>
                            <SessionMan.TrHead>
                                <SessionMan.Th className="pl-[25px]">Tên</SessionMan.Th>
                                <SessionMan.Th>Tiền cược</SessionMan.Th>
                                <SessionMan.Th className="flex gap-[10px] items-center">
                                    <div className='w-[20px] h-[20px] rounded-[50%] bg-[#ccc]'></div>
                                    <span>Lượt đánh</span>
                                </SessionMan.Th>
                            </SessionMan.TrHead>
                        </thead>
                        <tbody className=''>
                            {
                                data?.trade?.map((item, index) => (
                                    <SessionMan.Tr key={index}>
                                        <SessionMan.Td className='pl-[25px]'>{item.fullName}</SessionMan.Td>
                                        <SessionMan.Td>{item.amount} $</SessionMan.Td>
                                        <SessionMan.Td className='pr-[25px] flex gap-[10px] items-center'>
                                            <div className={`w-[20px] h-[20px] rounded-[50%] ${item.position === "BUY" ? 'bg-[#23FF49]' : 'bg-[#FF444E]'}`}></div>
                                            <span>{item.position == "BUY" ? 'Đánh lên' : 'Đánh xuống'}</span>
                                        </SessionMan.Td>
                                    </SessionMan.Tr>
                                ))
                            }
                        </tbody>
                    </SessionMan.Table>
                </SessionMan.Right>
            </SessionMan.Body>
        </SessionMan>
    )
}

export default Sessionman