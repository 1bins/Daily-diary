import React, { useMemo } from "react";

const Statics = ({ monthlyList, activeMonth }) => {

    const calculateEmotion = useMemo(() => {
        const goodEmotion = monthlyList.filter(elem => elem.emotion <= 3).length;
        return parseInt((goodEmotion / monthlyList.length) * 100);
    }, [monthlyList.length, activeMonth]);
    
    return (
        <article id="statics">
            <div className="statics-inner">
                <h4>이번 달 나의 <b>긍정 감정 점수</b>는... {monthlyList.length >= 1 ? `${calculateEmotion}%` : "아직 일기가 없네요🥲"}</h4>
                <div className="graph">
                    <span style={{width: `${calculateEmotion ? calculateEmotion : "0"}%`}}></span>
                </div>
            </div>
        </article>
    )
}

export default React.memo(Statics);