import React from 'react'
import "./SchoolChannelStudio.scss"
import StudioHeader from '../../components/schooltv-studio/StudioHeader'
import { Outlet } from 'react-router-dom'

function SchoolChannelStudio() {
  return (
    <>
        <StudioHeader />
        <Outlet/>
    </>
  )
}

export default SchoolChannelStudio
