const EditPopup = ({subject, deleteExam, addExam, deleteTodo, addTodo, id, saveChanges, cancelEditing,
                    handleExamInput, handleTodoInput, currentExamInput, currentTodoInput, deleteSubject}) => {    

    

    return (
        <div className="popup-container">
            <div className="popup-body">
                <h2>{subject.title}</h2>

                <h3>Exams</h3>
                {subject.exams.map(e =>
                    <div className="popup-exams">
                        <p className="attribute-content">{e}</p>
                        <button className="delete-attribute-button" onClick={() => deleteExam(e)}>Delete</button>
                    </div>
                )}
                <form className="attr-input-form" onSubmit={addExam}>
                    <input className="attribute-input" value={currentExamInput} onChange={handleExamInput} />
                    <button className="add-attribute-button" type="submit">Add Exam</button>
                </form>

                <h3>ToDo's</h3>
                {subject.todos.map(t =>
                    <div className="popup-todos">
                        <p className="attribute-content">{t}</p>
                        <button className="delete-attribute-button"  onClick={() => deleteTodo(t)}>Delete</button>
                    </div>
                )}
                <form className="attr-input-form" onSubmit={addTodo}>
                    <input className="attribute-input" value={currentTodoInput} onChange={handleTodoInput} />
                    <button className="add-attribute-button" type="submit">Add Todo</button>
                </form>

                <br />
                <br />

                <button className="regular-button" onClick={() => saveChanges(subject, id)}>Save Changes</button>
                <button className="regular-button" onClick={() => cancelEditing()}>Cancel</button>
                <br />
                <br />
                <button className="regular-button"onClick={() => deleteSubject(id)}>Delete Subject</button>
            </div>
        </div>
    )
}

export default EditPopup