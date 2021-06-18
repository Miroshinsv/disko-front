import React from "react";

function AuthForm({ title, submitTitle, submit, onChange, registerData, children }) {

    return(
        <form className="form" onSubmit={submit}>
            <h2 className="form__title">{title}</h2>

            {children}

            <input className="form__btn-submit hover-opacity" type="submit" name="submit" value={submitTitle} />
            {/*<button className="form__btn-exit hover-opacity"  type="reset" />*/}
        </form>
    )
}

export default AuthForm;