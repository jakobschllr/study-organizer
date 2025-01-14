import plannerIcon from '../assets/planner-icon.svg'
import examIcon from '../assets/exam-icon.svg'
import statisticsIcon from '../assets/settings-icon.svg'
import settingsIcon from '../assets/statistics-icon.svg'

const Sidebar = ({logOut}) => {
    return (
        <div>
            <div className="sidebar">
            <p className="sidebar-heading">Structura.io</p>
            <div className="sidebar-options-wrapper">
                <div className="modules">
                    <img className="sidebar-icon" src={plannerIcon} alt="" />
                    <p>Module</p>
                </div>
                <div className="exam-prep">
                    <img className="sidebar-icon" src={examIcon} alt="" />
                    <p>Klausurvorbereitung</p>
                </div>
                <div className="statistics">
                    <img className="sidebar-icon" src={statisticsIcon} alt="" />
                    <p>Statistiken</p>
                </div>
                <div className="settings">
                    <img className="sidebar-icon" src={settingsIcon} alt="" />
                    <p>Einstellungen</p>
                </div>
                <button className={'logout-button'} onClick={() => logOut()}>Abmelden</button>
            </div>
        </div>
        </div>
    )
}

export default Sidebar