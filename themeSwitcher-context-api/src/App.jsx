import { useState } from "react"
import { ThemeProvider } from "./contexts/ThemeContext"
import { useEffect } from "react";
import ThemeButton from "./components/ThemeButton";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  
  const lightTheme = () => {
    setThemeMode("light")
  } //Idhar hitesh sir ek concept ke baare me baat karte he jo ki ye he hi jo functions hamne contextprovider se lie he usme abhi kuch functionality hamne define nahi ki he to yaha pe exact same naam se wohi function ko define karke jo bhi functionality he usko define kardenge to un functions ke lie bhi update hojaegi
  //How does this happen, according to my understanding kyunki functions ko ham jab bhi pass karte he wo as reference pass hote he so jo ham change yaha pe karenge wo automatically reflect hojaega 

  const darkTheme = () => {
    setThemeMode("dark")
  }

  //Ye functions to thik he par actual UI me change to hame karna he, jo ki ab kar rhe
  useEffect(()=>{
    document.querySelector('html').classList.remove("light", "dark") //Idhar ham basically jo bhi pre-existing theme he hamare HTML document ke class me usko ham remove kar rahe he
    document.querySelector('html').classList.add(themeMode) //Aur fir jo hamari theme hame lagana he wo laga rahe he using the state variable themeMode, But ye sirf class me add hi kardega bas Uske baad se hamare Tailwind bhaiya sambhal lete he par uske lie tailwind ko configure karna padta he tailwind.config.js wali file me jaake export default me ek comma deke darkMode: "class" karke de dena he class is liye ki wo hamare classes ke according theme change kar bhai naaki according to system configurations
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>   {/*Inki values dene ke baad ek error aayega ki ye defined hi nahi he to ham inko define karenge variable, aur functions ke form me (idhar state variable liya he hamne taki usko UI me update kar sake*/}
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                <ThemeButton />
            </div>

            <div className="w-full max-w-sm mx-auto">
                <Card />
            </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
