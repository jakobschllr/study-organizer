const NewSubjectPopup = ({setSubjectInput, currentSubjectInput, setCreditInput, currentCreditInput, createNewSubject, cancelEditing}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                    <p className="popup-heading">Create new Subject</p>
                    <form onSubmit={createNewSubject}>
                        Subject Name: <input className="text-input-short" value={currentSubjectInput} onChange={setSubjectInput}/>
                        <br />
                        ECTS / Credits: <input className="text-input-short" value={currentCreditInput} onChange={setCreditInput}/>
                        <br />
                        <button className="regular-button" onClick={() => cancelEditing()}>Cancel</button>
                        <button className="add-attribute-button" type="submit">Add Subject</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewSubjectPopup