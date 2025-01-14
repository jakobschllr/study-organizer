const NewLinkPopup = ({createNewLink, currentLinkName, setCurLinkName, cancelEditing, setCurLink, currentlink}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                    <p className="popup-heading">Add new Quick-Link</p>
                    <form onSubmit={createNewLink}>
                        Name: <input className="text-input-short" value={currentLinkName} onChange={setCurLinkName}/><br />
                        Link: <input className="text-input-short" value={currentlink} onChange={setCurLink}/>
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