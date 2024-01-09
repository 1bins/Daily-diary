import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import moment from "moment";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { emotionList } from "../components/emotionList";

const View = () => {
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);
    const { onRemove } = useContext(DiaryDispatchContext);
    const { id } = useParams();
    const [targetData, setTargetData] = useState();

    useEffect(() => {
        const targetDiary = diaryList.find(elem => parseInt(elem.id) === parseInt(id));
        if(targetDiary){
            setTargetData(targetDiary);
        }else{
            alert("없는 일기입니다.");
            navigate("/", {replace: true});
        }
    }, [id, diaryList]);

    const handleRemove = () => {
        if(window.confirm("정말로 일기를 삭제하시겠습니까?")){
            onRemove(targetData.id);
            navigate("/", {replace: true});
        }
    }

    if(!targetData){
        return(<div className="alert">로딩중입니다...</div>)
    }else{
        const emotionArr = emotionList.find(elem => parseInt(elem.emotion_id) === parseInt(targetData.emotion));

        return(
            <section id="view">
                <h3 className="blind">다이어리 보기</h3>
                <MyHeader
                    headerText={`${moment(targetData.date).format('YYYY-MM-DD')}의 기록`}
                    button={<MyButton type={"header"} text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>}
                    type={"view"}
                ></MyHeader>
                <div className="edit-inner view-inner">
                    <article id="a_emotion">
                        <div className="edit-co-inner">
                            <h4>오늘 나의 감정은...</h4>
                            <div className={["emotion-item emotion-active", `emotion-item${targetData.emotion}`].join(" ")}>
                                <img src={emotionArr.emotion_img} />
                                <p>{emotionArr.emotion_dsc}</p>
                            </div>
                        </div>
                    </article>
                    <article id="a_content">
                        <div className="edit-co-inner">
                            <h4>오늘 있었던 일은...</h4>
                            <div className="content-wrap">
                                <p>{targetData.content}</p>
                            </div>
                        </div>
                    </article>
                    <div className="cf-btn-box">
                        <MyButton type={"modi"} text={"수정하기"} onClick={() => navigate(`/edit/${id}`)}></MyButton>
                        <MyButton type={"remove"} text={"삭제하기"} onClick={handleRemove}></MyButton>
                    </div>
                </div>
            </section>
        )
    }
}

export default View;