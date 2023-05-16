import React from 'react'
import Nav from '../../components/nav/Nav'
import { HomeWrapper } from './Home.styles'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <HomeWrapper>
      <Nav />
      <HomeWrapper.Right>
        <Outlet />
      </HomeWrapper.Right>
    </HomeWrapper>
  )
}

export default Home