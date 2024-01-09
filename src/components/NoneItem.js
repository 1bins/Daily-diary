import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";

const NoneItem = ({alertText, btnTruthy}) => {
    const navigate = useNavigate();

    return(
        <div className="none-item">
            <img src={`${process.env.PUBLIC_URL}/images/face-sad-tear-regular.svg`} />
            <p className="alert">OOOOPS...!<span>아직 {alertText}의 일기를 작성하지 않았어요</span></p>
            {btnTruthy && <MyButton
                text={"일기 작성하기"}
                type={"home"}
                onClick={() => navigate("/write")}
            ></MyButton>}
            
        </div>
    )
}

export default React.memo(NoneItem);