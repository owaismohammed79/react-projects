import React from "react";

const UserContext = React.createContext()
//Every context has a provider as it provides you with variables

//This Provider is used as a wrapper for components and all the components inside it get access to the global user context and the variables
//For ex:
//<UserContextProvider> This is what is called the provider and as you can see it is a .jsx file
// <Header>
//  <Data />
// <Header />
// <UserContextprovider />

export default UserContext

//There's another way of defining the context and its provider in this js file without making use of the .jsx file 
//Which is explained in the next project which is the theme switcher

