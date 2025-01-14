const NewHabitPopup = ({curHabitInput, cancelEditing, handleHabitNameChange, createNewHabit}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                <p className="popup-heading">Neue tägliche Gewohnheit</p>
                <p className="popup-subheading">Welcher täglichen Gewohnheit möchtest du von heute an nachgehen?</p>
                <form className="attr-input-form"  onSubmit={createNewHabit}>
                    Name der Gewohnheit: <input className="text-input-short" value={curHabitInput} onChange={handleHabitNameChange}/>
                    <button type="submit" className="add-attribute-button">Gewohnheit hinzufügen</button>
                    
                </form>
                <button className="regular-button" onClick={() => cancelEditing()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewHabitPopup