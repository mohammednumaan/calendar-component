// IMPORTS
import { Button } from "@mui/material";

// BUTTON COMPONENTS
function ViewButton({calendarRef, id, option}){
    return (
        <Button 
            id={id}
            size="small"
            variant="outlined"
            onClick={() => calendarRef.current?.getApi().changeView(option)}
            sx ={

                {backgroundColor : '#2c3e50', color : 'white', textTransform: 'capitalize'}
            }
        >
            {id}
        </Button>
    )
}

function DateButton({id, clickFunc, children}){
    return (
        <Button
            id={id}
            size="medium"
            variant="outlined"
            onClick={clickFunc}
            sx ={
                    {backgroundColor : '#2c3e50', color : 'white',textTransform: 'capitalize'}
            }
        
        >
            {children}
        </Button>
    )
}

export {ViewButton, DateButton}