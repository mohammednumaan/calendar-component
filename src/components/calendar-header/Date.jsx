import { CalendarMonth } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { useState } from "react"
import PropTypes from 'prop-types';

export default function PickDate({calendarRef, setNewTitle, setNewDate, currDate, screenSize}){

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {screenSize < 600 ? (
                <LocalizationProvider dateAdapter={AdapterMoment}>  
                    <DatePicker
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className='filter-date'
                        format="MMMM YYYY"
                        
                        // mounts custom component when the screen is a mobiile/small width
                        slots={{textField : () => (
                            <IconButton id="filter-date" onClick={() => setIsOpen(!isOpen)}>
                                <CalendarMonth sx={{color : '#1e2b37'}} />
                            </IconButton>
                        )}}
                        onChange={(newValue) => {
                            calendarRef.current?.getApi().gotoDate(newValue?.toDate())
                            setNewTitle(calendarRef.current?.getApi().view.title)
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
                        slotProps={{textField : {size : 'small'}}}
                        onChange={(newValue) => {
                            calendarRef.current?.getApi().gotoDate(newValue?.toDate())
                            setNewTitle(calendarRef.current?.getApi().view.title)
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

PickDate.propTypes = {
    screenSize : PropTypes.number,
    calendarRef : PropTypes.object,
    currDate : PropTypes.object,
    setNewDate : PropTypes.func,
    setNewTitle : PropTypes.func,
}