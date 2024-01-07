// imports
import './Calendar.css'
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';

import { useEffect, useRef, useState } from 'react';
import fetchEvents from './DataHandling';
import CalendarHeader from '../calendar-header/CalendarHeader';
import { useSwipeable } from 'react-swipeable';
import moment from 'moment';


// calendar component 
export default function Calendar(){

    // states 
    // eslint-disanle
    const calendarRef = useRef(null);
    const [userEvents, setUserEvents] = useState(null);
    const [date, setDate] = useState(moment(calendarRef.current?.getApi().getDate()))
    const [title, setTitle] = useState('')
    const [width, setWidth] = useState(window.innerWidth);

    // get events data on initial render by fetching data from the database
    useEffect(() => {
        (async function getEvents() {
            fetchEvents(setUserEvents)
        })();
        
    },[])

    // tracks the widow size to change view on devices
    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        // cleanup
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    useEffect(() => {
        const calTitle = calendarRef.current?.getApi().view.title
        setTitle(calTitle)
    },[title])

    // enables users to swipe in mobile devices
    const handlers = useSwipeable({
        onSwipedLeft : () => {
            calendarRef.current?.getApi().next()
            setTitle(calendarRef.current?.getApi().view.title)
            setDate(moment(calendarRef.current?.getApi().getDate()))

        },
        onSwipedRight : () => {
            calendarRef.current?.getApi().prev()
            setTitle(calendarRef.current?.getApi().view.title)
            setDate(moment(calendarRef.current?.getApi().getDate()))

        },
        swipeDuration : 250,
    });


    return (
        <>  
            <CalendarHeader screenSize={width} title={title} calendarRef={calendarRef} currDate={date} setNewDate={setDate} setNewTitle={setTitle} />
            <div {...handlers} >
                <FullCalendar
                    // initial calendar setup
                    ref={calendarRef}
                    plugins={[daygridPlugin, timegridPlugin, multiMonthPlugin, interactionPlugin, listPlugin]}
                    initialView={'dayGridMonth'}
                    aspectRatio={width <= 1100 ? 2.8 : 2.8}
                    contentHeight={width <= 1100 ? 450 :'80vh'}
                    dayHeaderFormat={{weekday : 'short'}}
                    headerToolbar={false}
               
                    // events
                    events={userEvents}
                >
                </FullCalendar>
            </div>    
        </>
    )
}