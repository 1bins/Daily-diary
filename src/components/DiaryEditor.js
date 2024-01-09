import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDateContext, DiaryDispatchContext } from "../App";
import moment from "moment";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import EmotionItem from "../components/EmotionItem";
import { emotionList } from "../components/emotionList";

const DiaryEditor = ({ isEdit, targetData }) => {
    const navigate = useNavigate();
    const { onCreate, onRemove, onEdit } = useContext(DiaryDispatchContext);
    const calDate = useContext(DiaryDateContext);

    const txtCheck = useRef();
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDate(calDate);
    }, [calDate]);

    const handleSubmit = () => {
        if(content.length < 1){
            txtCheck.current.focus();
            return;
        }
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date, content, emotion);
            }else{
                onEdit(targetData.id, content, emotion);
            }
            navigate("/", {replace: true})
        }
    };

    useEffect(() => {
        if(isEdit){
            setDate(new Date(parseInt(targetData.date)));
            setEmotion(targetData.emotion);
            setContent(targetData.content);
        }
    }, [targetData, isEdit]);

    return(
        <section id="editor">
            <h3 className="blind">다이어리 쓰기</h3>
            <MyHeader
                headerText={`${moment(date).format('YYYY-MM-DD')} 기록하기`}
                button={<MyButton type={"header"} text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>}
            ></MyHeader>
            <div className="edit-inner">
                <article id="q_emotion">
                    <div className="edit-co-inner">
                        <h4>Q. 오늘의 감정은 어떤가요?</h4>
                        <div className="emotion-items">
                            {emotionList.map(elem => <EmotionItem key={elem.emotion_id} {...elem} onClick={setEmotion} isClicked={emotion === elem.emotion_id}></EmotionItem>)}
                        </div>
                    </div>
                </article>
                <article id="q_content">
                    <div className="edit-co-inner">
                        <h4>Q. 오늘 있었던 일을 기록해주세요</h4>
                        <textarea
                            placeholder="여기에 작성해주세요"
                            ref={txtCheck}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        >
                        </textarea>
                    </div>
                </article>
                <div className="cf-btn-box">
                    <MyButton type={"cancel"} text={isEdit ? "수정취소" : "작성취소"} onClick={() => {if(window.confirm("작성했던 글이 모두 저장되지 않습니다.\n계속 하시겠습니까?")){navigate(-1)}}}></MyButton>
                    <MyButton text={isEdit ? "수정완료" : "작성완료"} onClick={handleSubmit}></MyButton>
                </div>
            </div>
        </section>
    )
}

export default DiaryEditor;