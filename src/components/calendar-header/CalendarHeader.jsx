import { DateButton, ViewButton } from "./SubComponents";
import moment from "moment";
import PropTypes from 'prop-types';
import './CalendarHeader.css'
import { IconButton } from "@mui/material";
import Sidebar from "../menu/Drawer";
import PickDate from "./Date";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";

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

                {screenSize < 600 && (
                    <>
                        <Sidebar calendarRef={calendarRef} newTitle={setNewTitle} />
                        <div className="calendar-title-container">
                            <h1 className="calendar-title">{calendarRef.current?.getApi().view.title}</h1>
                        </div>
                    </>     
                )}

                {screenSize > 786 && <DateButton id={'today'} clickFunc={() => handleDateChange('today')}>{'today'}</DateButton>}
                {screenSize > 786 && <DateButton id={'prev'} clickFunc={() => handleDateChange('prev')}><ChevronLeft /></DateButton>}
                {screenSize > 786 && <DateButton id={'next'} clickFunc={() => handleDateChange('next')}><ChevronRight /></DateButton>}
                {screenSize > 786 && <PickDate calendarRef={calendarRef} setNewTitle={setNewTitle} setNewDate={setNewDate} currDate={currDate} screenSize={screenSize} />}
            </div>  
            
            {/* displays the current selected month */}

            {screenSize > 600 && (
                <div className="calendar-title-container">
                    <h1 className="calendar-title">{calendarRef.current?.getApi().view.title}</h1>
                </div>
            )}
            
            {/* right side of the calendar navigation (renders conditionally */}

            {screenSize < 600 ? (
                <div className="header-right-mobile">
                    <PickDate calendarRef={calendarRef} setNewTitle={setNewTitle} setNewDate={setNewDate} currDate={currDate} screenSize={screenSize} />
                    <IconButton  id={'today-icon'} onClick={() => handleDateChange('today')}>
                        <Today sx={{color : '#1e2b37'}} />
                    </IconButton>
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