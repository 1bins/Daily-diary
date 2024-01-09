import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDateContext, DiaryStateContext } from "../App";

import DiaryItem from "./DiaryItem";
import { momentFormat } from "../utils/momentFormat";
import NoneItem from "./NoneItem";

const DiaryList = ({ monthlyDiary, tabs, setTabs }) => {
    const diaryList = useContext(DiaryStateContext);
    const calDate = useContext(DiaryDateContext);
    const navigate = useNavigate();
    const [dailyDiary, setDailyDiary] = useState();

    useEffect(() => {
        if(diaryList.length >= 1){
            const dailyDiaryItem = diaryList.find(elem => momentFormat(elem.date) === momentFormat(calDate));
            setDailyDiary(dailyDiaryItem);
        }
    }, [diaryList, calDate])
    
    // tab
    const handleTabChange = (e) => {
        setTabs({
            tabDate: false,
            tabMonth: false,
            [e.target.name]: true
        })
    }

    return(
        <article id="items">
            <div className="items-inner">
                <div className="btn-box">
                    <button
                        type="button"
                        className={tabs.tabDate ? "active" : undefined}
                        name="tabDate"
                        onClick={e => handleTabChange(e)}
                    >일별</button>
                    <button
                        type="button"
                        className={tabs.tabMonth ? "active" : undefined}
                        name="tabMonth"
                        onClick={e => handleTabChange(e)}
                    >월별</button>
                </div>
                <div className="items-box">
                    {tabs.tabDate ? 
                            dailyDiary ?
                            <DiaryItem {...dailyDiary}></DiaryItem>
                            :
                            <NoneItem alertText={"오늘"} btnTruthy={true}></NoneItem>
                        :
                            monthlyDiary.length >= 1 ?
                            monthlyDiary.map(elem => <DiaryItem key={elem.id} {...elem}></DiaryItem>)
                            :
                            <NoneItem alertText={"이달"}></NoneItem>
                    }
                </div>
            </div>
        </article>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}
export default React.memo(DiaryList);