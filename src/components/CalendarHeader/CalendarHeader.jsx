// imports
import PropTypes from 'prop-types';
import './CalendarHeader.css'

import { DateButton, ViewButton } from "./SubComponents/ButtonComponents";
import PickDate from "./SubComponents/DatePickerComponent";
import Sidebar from "./SubComponents/Sidebar";

import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";
import moment from "moment";

// calendar header components
export default function CalendarHeader({screenSize, title, calendarRef, currDate, setNewDate, setNewTitle}){
    
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

                {screenSize < 1100 && (
                    <>
                        <Sidebar calendarRef={calendarRef} newTitle={setNewTitle} />
                        <h1 className="calendar-title">{calendarRef.current?.getApi().view.title}</h1>
                    </>     
                )}

                {screenSize > 1100 && <DateButton id={'today'} clickFunc={() => handleDateChange('today')}>{'today'}</DateButton>}
                {screenSize > 1100 && <DateButton id={'prev'} clickFunc={() => handleDateChange('prev')}><ChevronLeft /></DateButton>}
                {screenSize > 1100 && <DateButton id={'next'} clickFunc={() => handleDateChange('next')}><ChevronRight /></DateButton>}
                {screenSize > 1100 && <PickDate calendarRef={calendarRef} setNewTitle={setNewTitle} setNewDate={setNewDate} currDate={currDate} screenSize={screenSize} />}
            </div>  
            
            {/* displays the current selected month/week/day */}
            {screenSize > 1100 && (
                <div className="calendar-title-container">
                    <h1 className="calendar-title">{title}</h1>
                </div>
            )}
            
            {/* right side of the calendar navigation (renders conditionally */}
            {screenSize < 1100 ? (
                <div className="header-right-mobile">
                    <PickDate calendarRef={calendarRef} setNewTitle={setNewTitle} setNewDate={setNewDate} currDate={currDate} screenSize={screenSize} />
                    <IconButton  id={'today-icon'} onClick={() => handleDateChange('today')}>
                        <Today sx={{color : '#1e2b37'}} />
                    </IconButton>
                </div>
            ) : (
                <div className="header-right">
                    <ViewButton calendarRef={calendarRef} id={'month'} option={'dayGridMonth'} newTitle={setNewTitle} />
                    <ViewButton calendarRef={calendarRef} id={'week'} option={'dayGridWeek'} newTitle={setNewTitle} />
                    <ViewButton calendarRef={calendarRef} id={'day'} option={'timeGridDay'} newTitle={setNewTitle} />
                    <ViewButton calendarRef={calendarRef} id={'events'} option={'listMonth'} newTitle={setNewTitle} />
                </div>
            )}  

        </div>        
    )
}


// props types validation 
CalendarHeader.propTypes = {
    screenSize : PropTypes.number,
    title : PropTypes.string,
    calendarRef : PropTypes.object,
    currDate : PropTypes.object,
    setNewDate : PropTypes.func,
    setNewTitle : PropTypes.func,
}