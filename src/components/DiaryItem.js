import React from "react";
import { useNavigate } from "react-router-dom";

import { momentFormat } from "../utils/momentFormat";

const DiaryItem = ({ id, date, emotion, content }) => {
    const navigate = useNavigate();

    return(
        <div className="item" onClick={() => navigate(`/view/${id}`)}>
            <div className={["emotion", `emotion${emotion}`].join(" ")}>
                <img src={`${process.env.PUBLIC_URL}/images/emotion${emotion}.png`}/>
            </div>
            <div className="content-box">
                <p className="date">{momentFormat(date)} 의 기록</p>
                <p className="content">{content}</p>
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);