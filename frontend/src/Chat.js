import React from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectUser } from '../../frontend/src/features/userSlice'
import { selectChannelId, selectChannelName } from '../../frontend/src/features/appSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from './axios'
import Pusher from 'pusher-js'

const pusher = new Pusher('d0c7b930b87e03a39dd0', {
    cluster: 'us2'
});

const Chat = () => {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const getConvo = (channelId) => {
        if (channelId) {
            axios.get(`/get/conversation?id=${channelId}`)
                .then((res) => {
                    setMessages(res.data[0].conversation)
                })
        }
    }

    useEffect(() => {
        getConvo(channelId)

        const channel = pusher.subscribe('conversation');
        channel.bind('newMessage' , function(data) {
            getConvo(channelId)
        })

    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault()

        axios.post(`/new/message?id=${channelId}`, {
            message: input,
            timestamp: Date.now(),
            user: user,
        })

        setInput('')
    }

    return (
        <div className='chat' >
            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message) => {
                    console.log(message)
                })}
                {messages.map(message => (
                    <Message message={message.message} timestamp={message.timestamp} user={message.user} />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize='large' />
                <form>
                    <input type="text" disabled={!channelId} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                    <button className='chat__inputButton' onClick={sendMessage} disabled={!channelId} type='submit'></button>
                </form>
            </div>
        </div>
    )
}

export default Chat
