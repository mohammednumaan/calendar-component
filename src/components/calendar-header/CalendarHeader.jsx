// IMPORTS
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DateButton, ViewButton } from "./SubComponents";
import moment from "moment";
import './CalendarHeader.css'

// CALENDAR HEADER COMPONENT
export default function CalendarHeader({calendarRef, title}){
    
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

    useEffect(() => {
        const calApi = calendarRef.current?.getApi();
        setDate(moment(calApi.getDate()))
        console.log('changed')

    }, [calendarRef])

    return (

        <div className="header-container">
            <div className="header-left">
                <DateButton id={'today'} clickFunc={() => handleDateChange('today')}>{'today'}</DateButton>
                <DateButton id={'prev'} clickFunc={() => handleDateChange('prev')}><ChevronLeft /></DateButton>
                <DateButton id={'next'} clickFunc={() => handleDateChange('next')}><ChevronRight /></DateButton>

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
                        {width : '190px', border : '1px solid #2c3e50', borderRadius : '4px', color : '#1976d2', outline: 'none'}
                    }
                />
                </LocalizationProvider>
            </div>  
            <h1 className="calendar-title">{title}</h1>
            <div className="header-right">
                <ViewButton calendarRef={calendarRef} id={'month'} option={'dayGridMonth'} />
                <ViewButton calendarRef={calendarRef} id={'week'} option={'dayGridWeek'} />
                <ViewButton calendarRef={calendarRef} id={'day'} option={'timeGridDay'} />
                <ViewButton calendarRef={calendarRef} id={'events'} option={'listMonth'} />
            </div>

        </div>        
    )
}

CalendarHeader.propTypes = {
    calendarRef : PropTypes.object,
}