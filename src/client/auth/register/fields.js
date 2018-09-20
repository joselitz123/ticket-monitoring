import React from 'react';

export const FirstName = ({input, error, onChange, validate}) => {
    
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" value={input} placeholder="First Name" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login" />
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )
}

export const LastName = ({input, error, onChange, validate}) => {
    
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="lastname">Last Name:</label>	
            <input type="text" id="lastname" name="lastname" value={input} placeholder="Last Name" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login" />
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )

}

export const EmailAd = ({input, error, onChange, validate}) => {
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="email">Email Address:</label>
            <input type="text" id="email" name="email" value={input} placeholder="Email" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login"/>
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )
}

export const PGShortname = ({input, error, onChange, validate}) => {
    
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="pg_shortname">P&G Shortname:</label>	
            <input type="text" id="pg_shortname" name="pg_shortname" value={input} placeholder="P&G Shortname" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login" />
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )

}

export const SNowId = ({input, error, onChange, validate}) => {
    
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="snow_id">Snow Id:</label>	
            <input type="text" id="snow_id" name="snow_id" value={input} placeholder="Snow Id" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login" />
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )

}

export const Username = ({input, error, onChange, validate}) => {
    return(
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={input} placeholder="Username" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login"/>
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )
}

export const Pword = ({input, error, onChange, validate}) => {
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={input} placeholder="Password" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login"/>
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )
}

export const CPword = ({input, error, onChange, validate}) => {
    return (
        <div className={error.length != 0 ? "control-group error" : "control-group"} >
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" value={input} placeholder="Confirm Password" onChange={e=>onChange(e)} onBlur={e=>validate(e)} className="login"/>
            {error.length != 0 ? <span className="help-inline">{error}</span> : ''}
        </div>
    )
}