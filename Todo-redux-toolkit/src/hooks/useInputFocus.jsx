import  { useCallback } from 'react'
import { useRef } from 'react';

function useInputFocus() {
    const inputRef = useRef(null);

    const setInputRef = useCallback((node) =>{ //Use case of useCallback, kyunki ye functions as props pass kie jaenge to child to tumhe pata he ki unnecessary re-render of child when parent re-renders and will return the same function reference unless it's dependencies change
    //Node idhar ek DOM element hota he when the DOM element is mounted and will be null when unmounted
        if(node)
            inputRef.current = node
    },[])

    const inputFocus = useCallback(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[])

    return { setInputRef, inputFocus };
}

export default useInputFocus