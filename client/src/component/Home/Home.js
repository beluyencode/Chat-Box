import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import './style.css';
import CreateUser from "../CreateUser/CreateUser";
import ChatBox from "../ChatBox/ChatBox";


const host = "http://localhost:5000";

export default function Home() {
    const [namesake, setNamesake] = useState(true);
    const [user, setUser] = useState({});
    const [userArray, setUserArray] = useState([]);
    const [messArray,setMessArray] = useState([]);
    const socketRef = useRef();


    const handleClickNext = (name) => {
        socketRef.current.emit('create-name', name);
    }

    const handleNamesake = () => {
        setNamesake(false);
    }

    const handleClickSend = (data) => { 
        socketRef.current.emit("client-send-data",{mess:data,name:user.name});
    }

    useEffect(() => {
        socketRef.current = io(host, { transports: ['websocket'], 'sync disconnect on unload': true });

        socketRef.current.on('namesake', () => {
            handleNamesake();
        })

        socketRef.current.on('successful-name-creation', (user, userArray) => {
            setUser(user);

        });

        socketRef.current.on('server-send-data',(data) => {
            setMessArray((prev) => {
                return [...prev,data];
            })
        })

        socketRef.current.on("user-online", (data) => {
            setUserArray(data);
        })

    }, [])

    return (
        <>
            <div className="main_chatBox">
                {JSON.stringify(user) === '{}' ?
                    <CreateUser click={handleClickNext} namesake={namesake} />
                    :
                    <ChatBox userArray={userArray} user={user} send={handleClickSend} messArray={messArray}/>
                }
            </div>
        </>
    );
}