// imports
import PropTypes from 'prop-types';
import './CalendarHeader.css'

import { DateButton, ViewButton } from "./SubComponents/ButtonComponents";
import PickDate from "./SubComponents/DatePickerComponent";
import Sidebar from "./SubComponents/Sidebar";

import { ButtonGroup, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";

// calendar header components
export default function CalendarHeader({children, screenSize, currDate, handleDate, handleView, handleCustomDate}){
        
    return (

        <div className="header-container">

            {/* left side of the calendar navigation (renders conditionally) */}
            <div className="header-left">

                {screenSize < 1100 ? (
                    <>
                        <Sidebar handleView={handleView} />
                        {children}
                    </>     
                ) : (
                    <>
                        <ButtonGroup variant="solid" aria-label="outlined button group">
                            <DateButton id={'today'} callback={() => handleDate('today')}>{'today'}</DateButton>
                            <DateButton id={'prev'} callback={() => handleDate('prev')}><ChevronLeft /></DateButton>
                            <DateButton id={'next'} callback={() => handleDate('next')}><ChevronRight /></DateButton>  
                        </ButtonGroup>

                        <PickDate screenSize={screenSize} currDate={currDate} handleCustomDate={handleCustomDate} />

                    </>
                    
                )}
                
            </div>  
            
            {/* displays the current selected month/week/day */}
            {screenSize > 1100 && (
                <div className="calendar-title-container">
                    {children}
                    <hr></hr>
                </div>
            )}
            
            {/* right side of the calendar navigation (renders conditionally */}
            {screenSize < 1100 ? (
                <div className="header-right-mobile">

                    <PickDate screenSize={screenSize} currDate={currDate} handleCustomDate={handleCustomDate} />

                    <IconButton  id={'today-icon'} onClick={() => handleDate('today')}>
                        <Today sx={{color : '#1976d2'}} />
                    </IconButton>

                </div>
            ) : (
                <div className="header-right">

                    <ButtonGroup variant='solid' aria-label="outlined button group" >
                        <ViewButton id={'month'} callback={() => handleView('dayGridMonth')} />
                        <ViewButton id={'week'} callback={() => handleView('dayGridWeek')} />
                        <ViewButton id={'day'}  callback={() => handleView('timeGridDay')} />
                        <ViewButton id={'events'} callback={() => handleView('listMonth')} />
                    </ButtonGroup>
                    
                </div>
            )}  

        </div>        
    )
}


// props types validation 
CalendarHeader.propTypes = {
    children : PropTypes.element,
    screenSize : PropTypes.number,
    currDate : PropTypes.object,
    handleDate : PropTypes.func,
    handleView : PropTypes.func,
    handleCustomDate : PropTypes.func, 
}

