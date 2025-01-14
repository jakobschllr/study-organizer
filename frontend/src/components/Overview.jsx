const Overview = ({subjects, handleEdit, handleNewSubjectPopup}) => {
    console.log(subjects)
    return (
        <div className="overview-wrapper">
            <table>
                <tbody>
                    {subjects.map(subj =>
                        <tr key={subj.title}>
                                <th>
                                    <div className="subject-overview">
                                        <div className="subject-heading">
                                            <h2>{subj.title}</h2>
                                            <button className="regular-button" onClick={() => handleEdit(subj.id)}>Modul öffnen</button>
                                        </div>
                                        <h3 className="subheading">Exams</h3>
                                            <div className="exam-list">
                                                {subj.exams.map(d =>
                                                    <div className="exam-element">
                                                        <p className="paragraphs" key={d}>{d}</p>
                                                    </div>
                                                )}
                                            </div>
                                        <h3 className="subheading">ToDo's</h3>
                                        
                                        <ul key={subj.title}>
                                            {subj.todos.map(t =>
                                                <li className="paragraphs" key={t}>{t}</li>
                                            )}
                                        </ul>
                                    </div>
                                </th>
                        </tr>
                    )}
                </tbody>
            </table>   
            <button className="regular-button" onClick={() => handleNewSubjectPopup()}>Neues Modul</button>
        </div>
    )   
}

export default Overview