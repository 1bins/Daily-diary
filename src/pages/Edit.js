import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const diaryList = useContext(DiaryStateContext);
    const { id } = useParams();
    const [targetData, setTargetData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(elem => parseInt(elem.id) === parseInt(id));
            if(targetDiary){
                setTargetData(targetDiary);
            }else{
                alert("없는 일기입니다.");
                navigate("/", {replace: true})
            }
        }
    }, [id, diaryList]);

    return(
        <>
            {targetData && <DiaryEditor isEdit={true} targetData={targetData}></DiaryEditor>}
        </>
    )
}

export default Edit;