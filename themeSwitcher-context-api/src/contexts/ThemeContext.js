import {useContext, createContext} from 'react'

export const ThemeContext = createContext({
         themeMode: "light",                   //This is a variable which is taking in a default value as input
         darkTheme: ()=>{},                    //This is a demo fn to demonstrate that we can send functions 
         lightTheme: ()=>{}                    //In the previous method we were making use of the provider to declare the state
})                                             //variable and the functions and then pass them
    export const ThemeProvider = ThemeContext.Provider    //Now we are directly exporting the ThemeContextProvider by storing it in a variable.

//People also create a custom Hook further so that you don't need to import the useContext and the themeContext in all the places but instead make use of this custom Hook to get both at a time

export default function useTheme(){
 return useContext(ThemeContext)
}