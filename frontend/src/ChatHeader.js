import React from 'react'
import './ChatHeader.css'

const ChatHeader = ({ channelName }) => {
    return (
        <div className='chatHeader' >
            <div className="chatHeader__left">
                <h3><span className="chatHeader__hash">+</span>
                    {channelName}
                    </h3>
            </div>

            <div className="chatHeader__right">
            </div>
        </div>
    )
}

export default ChatHeader
