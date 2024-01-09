const MyHeader = ({ type, button, headerText }) => {
    return(
        <header className={type}>
            <div className="left-btn">
                {button}
            </div>
            <p className="header-text">{headerText}</p>
        </header>
    )
}

export default MyHeader;