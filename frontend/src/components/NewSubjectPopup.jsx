const NewSubjectPopup = ({setSubjectInput, currentSubjectInput, createNewSubject, cancelEditing}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                    <h2>Create new Subject</h2>
                    <form onSubmit={createNewSubject}>
                        Subject Name: <input value={currentSubjectInput} onChange={setSubjectInput}/>
                        <button className="add-attribute-button" type="submit">Add Subject</button>
                    </form>
                    <button className="regular-button" onClick={() => cancelEditing()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewSubjectPopup