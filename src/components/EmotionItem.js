import React from "react";

const EmotionItem = ({ emotion_id, emotion_img, emotion_dsc, onClick, isClicked }) => {
    return(
        <div className={["emotion-item", isClicked ? `emotion-item${emotion_id} emotion-active` : undefined].join(" ")} onClick={() => onClick(emotion_id)}>
            <img src={emotion_img} />
            <p>{emotion_dsc}</p>
        </div>
    );
}

export default React.memo(EmotionItem);