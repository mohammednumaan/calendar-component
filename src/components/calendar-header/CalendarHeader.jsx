// imports
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";
import { DateButton, ViewButton } from "./SubComponents";
import moment from "moment";
import PropTypes from 'prop-types';
import './CalendarHeader.css'
import MobileMenu from "../menu/Menu";
import { IconButton } from "@mui/material";

// CALENDAR HEADER COMPONENT
export default function CalendarHeader({screenSize, calendarRef, currDate, setNewDate, setNewTitle}){
    
    
    // handles any kind of date change 
    const handleDateChange = (direction) => {
        const calApi = calendarRef.current?.getApi();
        if (calApi) {
            (direction === 'prev') ? calApi.prev() : 
            (direction === 'next') ? calApi.next() :
            (direction === 'today') ? calApi.today() : ''
        }

        setNewDate(moment(calApi.getDate()))
        setNewTitle(calendarRef.current?.getApi().view.title)

    }
    
    return (

        <div className="header-container">

            {/* left side of the calendar navigation (renders conditionally) */}
            <div className="header-left">
                {screenSize > 786 ? (
                    <DateButton id={'today'} clickFunc={() => handleDateChange('today')}>{'today'}</DateButton>
                ) : (
                    <IconButton  id={'today-icon'} onClick={() => handleDateChange('today')}>
                        <Today sx={{color : '#1e2b37'}} />
                    </IconButton>
                )}
                
                {screenSize > 786 && <DateButton id={'prev'} clickFunc={() => handleDateChange('prev')}><ChevronLeft /></DateButton>}
                {screenSize > 786 && <DateButton id={'next'} clickFunc={() => handleDateChange('next')}><ChevronRight /></DateButton>}

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        className='filter-date'
                        format="MMMM YYYY"
                        slotProps={{ textField : {size : 'small'}}}
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
            </div>  
            
            {/* displays the current selected month */}

            <div className="calendar-title-container">
                <h1 className="calendar-title">{calendarRef.current?.getApi().view.title}</h1>
            </div>
            
            {/* right side of the calendar navigation (renders conditionally */}

            {screenSize < 500 ? (
                <div className="header-right-mobile">
                    <MobileMenu calendarRef={calendarRef} newTitle={setNewTitle} />   
                </div>
            ) : (
                <div className="header-right">
                    <ViewButton calendarRef={calendarRef} id={'month'} option={'dayGridMonth'} />
                    <ViewButton calendarRef={calendarRef} id={'week'} option={'dayGridWeek'} />
                    <ViewButton calendarRef={calendarRef} id={'day'} option={'timeGridDay'} />
                    <ViewButton calendarRef={calendarRef} id={'events'} option={'listMonth'} />
                </div>
            )}

        </div>        
    )
}

// props types validation 
CalendarHeader.propTypes = {
    screenSize : PropTypes.number,
    calendarRef : PropTypes.object,
    currDate : PropTypes.object,
    setNewDate : PropTypes.func,
    setNewTitle : PropTypes.func,
}