// import
import './Calendar.module.css'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';

import { useEffect, useRef, useState } from 'react';
import fetchEvents from './utilities';

// calendar component 

export default function Calendar(){

    const [userEvents, setUserEvents] = useState(null);
    const calendarRef = useRef(null);

    // get events data on initial render by fetching data from the database
    useEffect(() => {
           
        (async function getEvents() {
            fetchEvents(setUserEvents)
        })();
        
    },[])


    return (

        <FullCalendar

            // initial calendar setup
            ref={calendarRef}
            plugins={[daygridPlugin, timegridPlugin, multiMonthPlugin, interactionPlugin, listPlugin]}
            initialView={'dayGridMonth'}
            contentHeight={window.innerWidth <= '600px' ? '100vh' : '85vh'}
            dayHeaderFormat={{weekday : 'short'}}

            // navigation and buttons            
            headerToolbar={{start : 'today prevYear,prev,next,nextYear', center : 'title', end : 'dayGridMonth,dayGridWeek,timeGridDay,listEvents'}}
            customButtons={
                {listEvents : {text : 'events', click : () => calendarRef.current.calendar.changeView('listMonth')}}
            }


            // events
            events={userEvents}
        >

        </FullCalendar>

    )
}