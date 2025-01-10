const NewLinkPopup = ({createNewLink, currentLinkName, setCurLinkName, cancelEditing, setCurLink, currentlink}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                    <h2>Add new Quick-Link</h2>
                    <form onSubmit={createNewLink}>
                        Name: <input value={currentLinkName} onChange={setCurLinkName}/><br />
                        Link: <input value={currentlink} onChange={setCurLink}/>
                        <button className="add-attribute-button" type="submit">Add Link</button>
                    </form>
                    <button className="regular-button" onClick={() => cancelEditing()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewLinkPopup

'setCurLink'