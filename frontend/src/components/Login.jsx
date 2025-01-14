const Login = ({login, toggleLogin, handleCurrentEmailInput, currentEmail, handleCurrentUsernameInput,
                currentUsername, handleCurrentPasswordInput, currentPassword, handleCurrentMajorInput,
                currentMajor, loginUser, signupUser, loginStatus, signupStatus}) => {


    if (login) {
        return (
            <div className="login-form-wrapper">
                <div className="login-form">
                    <div className={loginStatus}>
                        <p>Login war nicht erfolgreich, überprüfe Nutzername und Passwort</p>
                    </div>
                    <h1 className='main-heading'>Structur.io</h1>
                    <button className='regular-button' onClick={() => toggleLogin()}>Stattdessen Registrieren</button>
                    <div className="login">
                        <h2 className="habits-header">Login</h2>
                            <form onSubmit={loginUser}>
                                Benutzername: <input value={currentUsername} onChange={handleCurrentUsernameInput} className="text-input-short" /><br />
                                Passwort: <input value={currentPassword} onChange={handleCurrentPasswordInput} className="text-input-short" /><br />
                                <button className='regular-button' type="submit">Einloggen</button>
                            </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="login-form-wrapper">
                <div className="login-form">
                    <div className={signupStatus}>
                        <p>Registrierung nicht erfolgreich, überprüfe die Eingaben.</p>
                    </div>
                    <h1 className='main-heading'>Structur.io</h1>
                    <button className='regular-button'  onClick={() => toggleLogin()}>Stattdessen einloggen</button>
                    <div className="signup">
                        <h2 className="habits-header">SignUp</h2>
                            <form onSubmit={signupUser}>
                                E-Mail: <input value={currentEmail} onChange={handleCurrentEmailInput} className="text-input-short" /><br />
                                Benutzername: <input value={currentUsername} onChange={handleCurrentUsernameInput} className="text-input-short" /><br />
                                Passwort: <input value={currentPassword} onChange={handleCurrentPasswordInput} className="text-input-short" /><br />
                                Studiengang: <input value={currentMajor} onChange={handleCurrentMajorInput} className="text-input-short" /><br />
                                <button className='regular-button' type="submit">Registrieren</button>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}



export default Login