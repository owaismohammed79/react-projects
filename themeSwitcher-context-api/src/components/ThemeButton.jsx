import useTheme from "../contexts/ThemeContext";


export default function ThemeButton() {
    const {themeMode, lightTheme, darkTheme} = useTheme()
    //As you can see from above that we are using our custom hook to import all the var/fns and then calling the corresponding functions based on the current status of the i/p box
    const onChangeBtn = (e)=>{
        const darkModeStatus = e.currentTarget.checked
        //Revision: e.target gives us the element that trigerred the event and e.currentTarget will give us the element onto which we are currently listening. Also there is a usecase of currentTarget and that is when we use e.currenttarget we can also access the properties/att
        if(darkModeStatus){
            darkTheme();
        } else {
            lightTheme();
        }
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked = {themeMode === "dark"}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
    );
}

