import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import { Avatar } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import db, { auth } from './firebase'
import { useState } from 'react'
import { useEffect } from 'react'

import axios from './axios'

import Pusher from 'pusher-js'

const pusher = new Pusher('d0c7b930b87e03a39dd0', {
    cluster: 'us2'
  });

const Sidebar = () => {
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])

    const getChannels = () => {
        axios.get('/get/channelList')
        .then((res) => {
            setChannels(res.data)
        })
    }

    useEffect(() => {
        getChannels();
        
        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function (data) {
            getChannels();
        })
    }, [])

    const handleAddChannel = (e) => {
        e.preventDefault()

        const channelName = prompt('Enter a new channel name')

        if (channelName) {
            axios.post('new/channel', {
                channelName: channelName
            })
        }
    }

    return (
        <div className='sidebar' >
            <div className="sidebar__top">
                <h3 className="sidebar__title">Dev Space</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Categories</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
                </div>
                <div className="sidebar__channelsList">
                    {
                        channels.map(channels => (
                            <SidebarChannel key={channels.id} id={channels.id} channelName={channels.name} />
                        ))
                    }
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar src={user.photo} onClick={() => auth.signOut()} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
