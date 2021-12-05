import React, { useState } from "react";
import './style.css';

export default function CreateUser(props) {
    const [name, setName] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);    


    const handleChange = (e) => {
        setName(e.target.value);
        if (e.target.value.length >= 2 && e.target.value.length <=20) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }

    const handleClick = () => {
        props.click(name);
    }

    return (
        <div className="create">
            <h2>Nhập tên của bạn</h2>
            <input className="input-name" value={name} onChange={handleChange}></input>
            <div disabled={!disabledBtn}>
                <span>Tên phải có từ 2 đến 20 kí tự </span>
            </div>
            <div disabled={props.namesake}>
                <span>Tên này đã có người sử dụng</span>
            </div>
            <div className='btn-div-next'>
                <button disabled={disabledBtn} className="btn-next" onClick={handleClick}>NEXT</button>
            </div>
        </div>
    );
}