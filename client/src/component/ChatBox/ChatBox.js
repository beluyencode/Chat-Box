import React, { useState, useEffect } from "react";
import './style.css';

export default function ChatBox(props) {
    const [content, setContent] = useState("");
    const [disabledBtnSend, setDisabledBtnSend] = useState(true);

    const scrollDown = () => {
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }

    useEffect(() => {
        scrollDown();
    })

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const keyDownEnter = (event) => {
        if (content.length > 0) {
            onClick();
        }
    }

    useEffect(() => {
        if (content.length > 0) {
            setDisabledBtnSend(false);
        } else {
            setDisabledBtnSend(true);
        }
    }, [content]);


    const onClick = () => {
        setContent("")
        props.send(content);
    }

    return (
        <div className="chat-box">
            <div className="user-online">
                <div className="title-user">
                    <span>Người đang online</span>
                </div>
                <div className="user">
                    {props.userArray.map((item, index) => {
                        if (props.user.name === item.name) {
                            return (<div key={index}></div>);
                        }
                        return (
                            <div className="user-info" key={index}>
                                {item.name}
                            </div>
                        );

                    })}
                </div>
            </div>
            <div className="chat-area">
                <div className="chat-title">
                    <div className="title-user">
                        <span>Room chat</span>
                    </div>
                </div>
                <div className="chat-box-area" id="scroll">
                    {props.messArray.map((item, index) => {
                        if (item.name === props.user.name) {
                            return (
                                <React.Fragment key={index} >
                                    <div className="inbox-right" >
                                        <div style={{ textAlign: "right", fontSize: 10 }}>
                                            Tôi
                                        </div>
                                        <div className="mess">
                                            {item.mess}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment key={index} >
                                <div className="inbox-left" >
                                    <div style={{ textAlign: "left", fontSize: 10 }}>
                                        {item.name}
                                    </div>
                                    <div className="mess">
                                        {item.mess}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="inbox-input">
                    <input type="text" className="input-inbox"
                        onKeyDown={(event) => (event.key === 'Enter' ? keyDownEnter(event) : null)}
                        value={content} onChange={handleChangeContent} />
                    <button className="btn-send" disabled={disabledBtnSend}
                        onClick={onClick}>send</button>
                </div>
            </div>
        </div>
    );
}