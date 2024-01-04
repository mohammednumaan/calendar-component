// import
import './Calendar.css'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';

import { useEffect, useRef, useState } from 'react';
import fetchEvents from './utilities';
import CalendarHeader from '../calendar-header/CalendarHeader';
import { useSwipeable } from 'react-swipeable';
import moment from 'moment';

// calendar component 

export default function Calendar(){

    const calendarRef = useRef(null);
    const [userEvents, setUserEvents] = useState(null);
    const [title, setTitle] = useState(calendarRef.current?.getApi().view.title)

    // get events data on initial render by fetching data from the database
    useEffect(() => {
           
        (async function getEvents() {
            fetchEvents(setUserEvents)
        })();
        
    },[])

    const handlers = useSwipeable({
        onSwipedLeft : () => {
            calendarRef.current?.getApi().next()
            setTitle(calendarRef.current?.getApi().view.title)

        },
        onSwipedRight : () => {
            calendarRef.current?.getApi().prev()
            setTitle(calendarRef.current?.getApi().view.title)


        },
    });




    return (
        <>  
                <CalendarHeader calendarRef={calendarRef} title={title} />
                <div {...handlers} >
                    <FullCalendar
                        // initial calendar setup
                        ref={calendarRef}

                        plugins={[daygridPlugin, timegridPlugin, multiMonthPlugin, interactionPlugin, listPlugin]}
                        initialView={'dayGridMonth'}
                        contentHeight={window.innerWidth <= '600px' ? '100vh' : '85vh'}
                        dayHeaderFormat={{weekday : 'short'}}
                        headerToolbar={false}
                        windowResize={true}
                        expandRows={true}

                        // events
                        events={userEvents}
                    >

                    </FullCalendar>

                </div>
                
        </>
    )
}