// imports'
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

// different button components that can be re-used
// view buttons, primarily used for selecting different views on click
function ViewButton({id, callback }){


    return (
        <Button 
            id={id}
            size="medium"
            variant="outlined"
            onClick={callback}
            sx ={{textTransform: 'capitalize'}}
        >
            {id}
        </Button>
    )
}

// date buttons, primarily used for naviigating different dates/months on click
function DateButton({id, callback, children}){
    return (
        <Button
            id={id}
            size="medium"
            variant="outlined"
            onClick={callback}
            sx ={{textTransform: 'capitalize'}}
        >
            {children}
        </Button>
    )
}


// props types validation
ViewButton.propTypes = {
    id : PropTypes.string,
    callback : PropTypes.func,
    
}

DateButton.propTypes = {
    id : PropTypes.string,
    callback : PropTypes.func,
    children : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

// exports
export {ViewButton, DateButton}
