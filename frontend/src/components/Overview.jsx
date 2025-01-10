const Overview = ({subjects, handleEdit, handleNewSubjectPopup}) => {
    console.log(subjects)
    return (
        <div>
            <table>
                <tbody>
                    {subjects.map(subj =>
                        <tr key={subj.title}>
                                <th>
                                    <div className="subject-overview">
                                        <h2>{subj.title}</h2>
                                        <h3 className="subheading">Exams</h3>
                                            {subj.exams.map(d =>
                                                <p className="paragraphs" key={d}>{d}</p>
                                            )}
                                        <h3 className="subheading">ToDo's</h3>
                                        
                                        <ul key={subj.title}>
                                            {subj.todos.map(t =>
                                                <li className="paragraphs" key={t}>{t}</li>
                                            )}
                                        </ul>
                                        <button className="regular-button" onClick={() => handleEdit(subj.id)}>Edit</button>
                                    </div>
                                </th>
                        </tr>
                    )}
                </tbody>
            </table>
            
        <button className="regular-button" onClick={() => handleNewSubjectPopup()}>Add new Subject</button>
        </div>
    )   
}

export default Overview