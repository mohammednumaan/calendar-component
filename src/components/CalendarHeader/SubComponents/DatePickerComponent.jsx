// imports
import { useState } from "react"
import PropTypes from 'prop-types';

import { IconButton } from "@mui/material"
import { CalendarMonth } from "@mui/icons-material"

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"


// custom icon button (defined only once) to only mount once
const CustomButton = ({isOpen, setIsOpen}) => {
    return (
        <>
            <IconButton id="filter-date" onClick={() => setIsOpen(!isOpen)}>
                <CalendarMonth sx={{color : '#1e2b37'}} />
            </IconButton>
        </>
    )
}

// date picker component (conditionally renders)
export default function PickDate({ref, setNewTitle, setNewDate, currDate, screenSize}){

    // state to open and close the date picker
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>  

            {screenSize < 1100 ? (
                <LocalizationProvider dateAdapter={AdapterMoment}>  
                    <DatePicker
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className='filter-date'
                        format="MMMM YYYY"
                        
                        // overriding the default textfield component to a icon button for mobile devices
                        slots={{textField : CustomButton}}
                        slotProps={{textField : {isOpen, setIsOpen}}}

                        onChange={(newValue) => {
                            ref.current?.getApi().gotoDate(newValue?.toDate())
                            setNewTitle(ref.current?.getApi().view.title)
                            setNewDate(newValue)
                        }}
                        value={currDate}
                        sx={
                            {width : '170px', border : '1px solid #2c3e50', borderRadius : '4px', color : '#1976d2', outline: 'none'}
                        }
                    />
                </LocalizationProvider>
            ) : (
                <LocalizationProvider dateAdapter={AdapterMoment}>  
                    <DatePicker
                        onClose={() => setIsOpen(false)}
                        className='filter-date'
                        format="MMMM YYYY"

                        // renders/mounts the default textfield component for devices > 1100px (width)
                        slotProps={{textField : {size : 'small'}}}

                        onChange={(newValue) => {
                            ref.current?.getApi().gotoDate(newValue?.toDate())
                            setNewTitle(ref.current?.getApi().view.title)
                            setNewDate(newValue)
                        }}
                        value={currDate}
                        sx={
                            {width : '170px', border : '1px solid #2c3e50', borderRadius : '4px', color : '#1976d2', outline: 'none'}
                        }
                    />
                </LocalizationProvider>

            )}
        </>  
    )
}


// props types validation
PickDate.propTypes = {
    screenSize : PropTypes.number,
    ref : PropTypes.object,
    currDate : PropTypes.object,
    setNewDate : PropTypes.func,
    setNewTitle : PropTypes.func,
}

CustomButton.propTypes = {
    isOpen : PropTypes.bool,
    setIsOpen : PropTypes.func,
}