import React, { useContext } from "react";
import { DiaryDateContext, DiaryStateContext } from "../App";

import moment from "moment";
import Calendar from "react-calendar";
import { momentFormat } from "../utils/momentFormat";


const MyCalendar = ({ setActiveMonth, setTabs, setCalDate }) => {
    const diaryList = useContext(DiaryStateContext);
    const calDate = useContext(DiaryDateContext);

    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
        setActiveMonth(newActiveMonth);
    };
    const addContent = ({ date }) => {
        if(diaryList.find((elem) => momentFormat(date) === momentFormat(elem.date))){
            return(<div className="dot"></div>)
        };
    }

    return(
        <article id="calendar">
            <h4 className="blind">달력</h4>
            <div className="cal-inner">
                <Calendar
                    locale="en"
                    formatDay={(locale, calDate) => calDate.toLocaleString("en", {day: "numeric"})}   //일 빼기
                    onChange={setCalDate}
                    onClickDay={() => setTabs({tabDate: true, tabMonth: false})}
                    value={calDate}
                    next2Label={null}   //이전년, 다음년 보여주기
                    prev2Label={null}
                    showNeighboringMonth={false}    //달력안 이전/다음 달 일자 표시
                    tileContent={addContent}    //리스트와 비교하여 아이템이 있다면 표시
                    onActiveStartDateChange={({ activeStartDate }) =>
                        getActiveMonth(activeStartDate)
                    }   //월 변경시 state값 가져오기
                    minDetail={"month"}
                >
                </Calendar>
            </div>
        </article>
    )
}

export default React.memo(MyCalendar);