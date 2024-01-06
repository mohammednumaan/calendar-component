// IMPORTS
import { Button } from "@mui/material";
import PropTypes from 'prop-types';

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


// props types validation
ViewButton.propTypes = {
    calendarRef : PropTypes.object,
    id : PropTypes.string,
    option : PropTypes.string
}

DateButton.propTypes = {
    id : PropTypes.string,
    clickFunc : PropTypes.func,
    children : PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}


export {ViewButton, DateButton}
