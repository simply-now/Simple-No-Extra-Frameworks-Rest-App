import React from "react";
import { useReducer } from "react"

type FormState = {
    firstNumber: number
    secondNumber: number
    total: number
}
type FormNumberAction = {
    type: string
    payLoad: number
}
const initialState: FormState = {
    firstNumber: 0,
    secondNumber: 0,
    total: 0
}
type FormValidityState = {
    firstNumberError: boolean
    secondNumberError: boolean
}
const initialValidityState: FormValidityState = {
    firstNumberError: false,
    secondNumberError: false
}
type FormValidityAction = {
    type: string
    payLoad: FormState
}

const formReducer = (state: FormState, numberAction :FormNumberAction): FormState => {
    switch(numberAction.type){
        case "UPDATE_FIRST_NUMBER": return{
            ...state, firstNumber: numberAction.payLoad, 
        }
        case "UPDATE_SECOND_NUMBER": return{
            ...state,secondNumber: numberAction.payLoad, 
        }
        case "UPDATE_TOTAL": return{
            ...state,total: numberAction.payLoad, 
        }
        default:
            return state
    }
}

const formValidityReducer = (state: FormValidityState, action: FormValidityAction): FormValidityState => {
    switch(action.type){
        case "VALIDATE_FIRST_NUMBER": return{
            ...state,
            ...({firstNumberError: typeof action.payLoad.firstNumber === "number" ? false: true})
        }
        case "VALIDATE_SECOND_NUMBER": return{
            ...state,
            ...({secondNumberError: typeof action.payLoad.secondNumber === "number" ? false: true})
        }
    default:
        return state
    }
}

export const Form = () => {

    const [formData, setFormData] = useReducer(formReducer, initialState)
    const [formValidityData, setFormValidityData] = useReducer(formValidityReducer, initialValidityState)

    const onButtonPress = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Sending FormData:");
        console.log(formData.firstNumber + "+" + formData.secondNumber + "=");
        fetch("/simpleapi/", {
        method: 'POST',
        body: JSON.stringify(formData),
        redirect: 'follow'
        })
        .then(response => response.text())
        .then(result => {setFormData({type:"UPDATE_TOTAL", payLoad:parseInt(result)}); console.log(result)})
        .catch(error => console.log('error', error));
    }
    return(
        <form onSubmit={onButtonPress}>
            <div>
                <input 
                id="first_number"
                placeholder="First Number" 
                style={{backgroundColor:formValidityData.firstNumberError ?"pink" : ""}} 
                onChange={(e) =>{setFormData({type:"UPDATE_FIRST_NUMBER", payLoad:e.target.valueAsNumber}); setFormValidityData({type: "VALIDATE_FIRST_NUMBER", payLoad: formData})}}
                onBlur={(e) => setFormValidityData({type: "VALIDATE_FIRST_NUMBER", payLoad: formData})}
                type="number"/>
            </div>
            <div>
                <input id="last_name"
                placeholder="Second Number"
                style={{backgroundColor:formValidityData.secondNumberError ? "pink" : ""}} 
                onChange={(e) =>{setFormData({type:"UPDATE_SECOND_NUMBER", payLoad:e.target.valueAsNumber}); setFormValidityData({type: "VALIDATE_SECOND_NUMBER", payLoad: formData})}}
                onBlur={(e) => setFormValidityData({type: "VALIDATE_SECOND_NUMBER", payLoad: formData})}
                type="number"/>
            </div>
            <input disabled={formValidityData.firstNumberError===true || formValidityData.secondNumberError===true} type="submit" value="Add Two Numbers"/>
            <div>Total:{formData.total}</div>
        </form>
    )
}

export default Form;