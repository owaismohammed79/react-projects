import React from "react";
import UserContext from "./UserContext";
import PropTypes from 'prop-types';

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

function UserContextProvider ({children}){ //here we take in all the components as children to whom we need to provide access to
    const [user, setUser] = React.useState(null)
    return(
        <UserContext.Provider value={{user, setUser}}> {/*Idhar value attribute me inside a object tumhe jo jo state/fn/variable pass karna he kardo aur fir chahe main ya app component me access de sakte he ye provider ko import karke*/}
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;