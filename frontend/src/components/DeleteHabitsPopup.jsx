const DeleteHabitsPopup = ({cancelEditing, allHabits, deleteHabit}) => {
    return (
        <div>
            <div className="popup-container">
                <div className="popup-body">
                    <p className="popup-heading">Habits löschen</p>
                    <ul>
                        {allHabits.map(h => {
                            return (
                               <div>
                                    <li>
                                        {h.name} <button onClick={() => deleteHabit(h.id)} className="delete-attribute-button">Löschen</button>
                                    </li>
                               </div>
                            )
                        })}
                    </ul>
                    <button onClick={cancelEditing} className="regular-button">Bearbeiten abbrechen</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteHabitsPopup