const Habits = ({dateToday, habits, handleNewHabit, editHabits, completedHabit}) => {
    return (
        <div className="habits-wrapper">
            <h2 className="habits-header">Daily Habits 🚀</h2>
            <button onClick={() => handleNewHabit()} className="regular-button">Neuer Habit</button>
            <button onClick={() => editHabits()} className="regular-button">Bearbeiten</button>
            <div className="habits">
                {habits.map(h => {
                    if (h.nextDate === dateToday) {
                        return (
                            <a onClick={() => completedHabit(h.id)}>
                                <div key={h.name} className="unfinished-habit">
                                    <p>{h.name}</p>
                                </div>
                            </a>
                        )
                        
                    } else {
                        return (
                            <div key={h.id} className="finished-habit">
                                <p>{h.name}</p>
                            </div>
                        )
                    }
                })}
            </div>
            
        </div>
    )
}

export default Habits