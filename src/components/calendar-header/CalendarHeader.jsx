import { useState } from "react";
import PropTypes from 'prop-types';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import moment from "moment";
import './CalendarHeader.css'


export default function CalendarHeader({calendarRef}){
    
    const [date, setDate] = useState(moment(calendarRef.current?.getApi().getDate()))

    const handleDateChange = (direction) => {
        const calApi = calendarRef.current?.getApi();
        if (calApi) {
            (direction === 'prev') ? calApi.prev() : 
            (direction === 'next') ? calApi.next() :
            (direction === 'today') ? calApi.today() : ''
        }

        setDate(moment(calApi.getDate()))
    }

    return (

        <div className="header-container">
            <Button 
                type="Button" 
                id="today"
                size="small"
                variant="outlined"
                onClick={() => handleDateChange('today')}
                sx={{backgroundColor : '#2c3e50', color : 'white', textTransform : 'capitalize', fontSize : '1em'}}

            >
                Today
            </Button>

            <Button 
                type="Button" 
                id="prevMonth"
                size="small"
                variant="outlined"
                onClick={() => handleDateChange('prev')}
                sx={{backgroundColor : '#2c3e50', color : 'white'}}

            >
                <ChevronLeft />
            </Button>

            <Button 
                type="Button" 
                id="nextMonth"
                size="small"
                variant="outlined"
                onClick={() => handleDateChange('next')}
                sx={{backgroundColor : '#2c3e50', color : 'white'}}
                
            >
                <ChevronRight />
            </Button>

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                className='filter-date'
                format="MMMM YYYY"
                slotProps={{ textField : {size : "small"}}}
                onChange={(newValue) => {
                    calendarRef.current?.getApi().gotoDate(newValue?.toDate())
                    setDate(newValue)
                }}
                value={date}
                sx={
                    {width : '200px', border : '1px solid #2c3e50', borderRadius : '4px', color : '#1976d2', outline: 'none'}
                }
            />
            </LocalizationProvider>
        </div>        
    )
}

CalendarHeader.propTypes = {
    calendarRef : PropTypes.object,
}