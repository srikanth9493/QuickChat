import { Avatar } from '@material-ui/core'
import React from 'react'
import db from './firebase'
import './Sidebarnames.css'
function SidebarNames({name,addNewChat}) {
    

    const addRoom=()=>{
        const name=prompt("enter Room Name")
        db.collection('rooms').add({name:name})
    }
    return addNewChat==false?(
        <div className="sidebarnames">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <div className="sidebarnames__names">
                    <h3>{name}</h3>    
            </div>
               
        </div>
    )
    :(
      <div onClick={addRoom}  className="sidebarnames">
            <h3>Add New Chat</h3>
      </div>

    )
}

export default SidebarNames
