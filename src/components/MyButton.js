const MyButton = ({ type, text, onClick }) => {
    return(
        <button
            type="button"
            className={["common_btn", type].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default MyButton;