import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../../frontend/src/features/userSlice'
import { auth } from './firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from './axios'
import Pusher from 'pusher-js'
import { QUERY_CHANNEL } from './utils/queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ADD_CHANNEL } from './utils/mutations'

const pusher = new Pusher('d0c7b930b87e03a39dd0', {
    cluster: 'us2'
});

const Sidebar = () => {
    const user = useSelector(selectUser)

    const [load, { called, loading, data }] = useLazyQuery(QUERY_CHANNEL)
    const [addChatroom, { error }] = useMutation(ADD_CHANNEL)
    const channels = data?.channels || []

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (!loading) {
            const channel = pusher.subscribe('channels');
            channel.bind('newChannel', function (adata) {
                console.log(adata, 'data')
                load()
            })
        }
    }, [called])

    const handleAddChannel =async  (e) => {
        e.preventDefault()

        const channelName =await prompt('Enter a new channel name')

        try{
            const {data}= await addChatroom({
                variables:{channelName:channelName}
            })

            console.log(data)

        }catch(err){
            console.log(err)
            console.log(error)
        }
        
        // if (channelName) {
        //     axios.post('new/channel', {
        //         channelName: channelName
        //     })
        // }
    }

    if (called & loading) return <p>Loading</p>

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
                            <SidebarChannel key={channels._id} id={channels._id} channelName={channels.channelName} />
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
