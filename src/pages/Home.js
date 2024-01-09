import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDateContext, DiaryStateContext } from "../App";

import moment from "moment";
import DiaryList from "../components/DiaryList";
import Statics from "../components/Statics";
import { momentFormat } from "../utils/momentFormat";
import { getNewYear, getNewMonth } from "../utils/getNewDate";
import MyCalendar from "../components/MyCalendar";

const Home = ({ setCalDate }) => {
    // calendar
    const diaryList = useContext(DiaryStateContext);
    const calDate = useContext(DiaryDateContext);
    const navigate = useNavigate();
    
    const activeDate = momentFormat(calDate);

    const monthOfActiveDate = moment(calDate).format('YYYY-MM');
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

    
    // monthlyDiary
    const [monthlyDiary, setMonthlyDiary] = useState([]);
    useEffect(() => {
        if(diaryList.length >= 1){
            const firstDay = new Date(getNewYear(activeMonth), getNewMonth(activeMonth) - 1, 1).getTime();
            const lastDay = new Date(getNewYear(activeMonth), getNewMonth(activeMonth), 0, 23, 59, 59).getTime();

            const monthMatchedDiaryList = diaryList.filter(elem => firstDay <= elem.date && elem.date <= lastDay);
            setMonthlyDiary(monthMatchedDiaryList.sort((a, b) => parseInt(b.date) - parseInt(a.date)));
        }
    }, [diaryList, activeMonth]);

    // tabs
    const [tabs, setTabs] = useState({
        tabDate: true,
        tabMonth: false
    });

    return(
        <section id="home">
            <div className="home-inner">
                <article id="intro">
                    <div className="intro-inner">
                        <h3>당신의 오늘은 어땠나요?</h3>
                        <p>오늘 있었던 일을 감정일기장에 훌훌 털어버려요</p>
                    </div>
                </article>
                <MyCalendar setActiveMonth={setActiveMonth} setTabs={setTabs} setCalDate={setCalDate}></MyCalendar>
                <DiaryList monthlyDiary={monthlyDiary} tabs={tabs} setTabs={setTabs}></DiaryList>
                <Statics monthlyList={monthlyDiary} activeMonth={activeMonth}></Statics>
            </div>
        </section>
    )
}

export default Home;