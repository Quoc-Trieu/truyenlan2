import React from 'react'
import { Head } from './Header.styles'
import menu from '../../assets/images/menu.png'
import { useDispatch } from 'react-redux'
import { changeIsOpen } from '../../store/navRes/navResSlice'

function Header({title}) {
    const dispatch = useDispatch()
    return (
        <Head>
            <Head.Text>{title}</Head.Text>
            <Head.Icon onClick={() => dispatch(changeIsOpen(true))} src={menu} />
        </Head>
    )
}

export default Header