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
import { useLazyQuery, useMutation } from '@apollo/client'
import { CONVO_MSGS } from './utils/queries'
import { ADD_MSG } from './utils/mutations'

const pusher = new Pusher('d0c7b930b87e03a39dd0', {
    cluster: 'us2'
});

const Chat = () => {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)

    const [input, setInput] = useState('')

    // const [messages, setMessages] = useState([])
    const [loadConvos, { called, loading, data }] = useLazyQuery(CONVO_MSGS, {
        variables: { id: channelId }
    })

    const [newMessage, { error }] = useMutation(ADD_MSG)

    const messages = data?.conversation.conversation || []

    useEffect(() => {
        loadConvos()


    }, [channelId])

    useEffect(() => {
        if (!loading) {


            const channel = pusher.subscribe('conversation');
            channel.bind('newMessage', function (adata) {
                console.log(adata, 'data')
               loadConvos()
            })
        }
    }, [called])





    const sendMessage =async  (e) => {
        e.preventDefault()
        const messageData={
            message:input,
            timestamp:Date.now().toString(),
            user:user
            
        }
      
        console.log({id:channelId,messageData:messageData})
try{
    const {data}=await newMessage({
        variables:{id:channelId,messageData:messageData}
    })
    console.log(data)
    setInput('')
}catch(err){
    console.log(err,'catch error')
    console.log(error,'mutation error')
}
      

        
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
