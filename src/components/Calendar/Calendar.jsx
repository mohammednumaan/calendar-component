// imports
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Calendar.css'

import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

import CalendarHeader from '../CalendarHeader/CalendarHeader';
import fetchEvents from './DataHandling';
import moment from 'moment';
import SwipeableEdgeDrawer from '../CalendarHeader/SubComponents/SwipeableDrawer';


// calendar component 
export default function Calendar(){

    // states and refs
    const calendarRef = useRef(null);

    const [userEvents, setUserEvents] = useState(null);
    const [todayEvents, setTodayEvents] = useState([])

    const [date, setDate] = useState(moment(calendarRef.current?.getApi().getDate()))
    const [title, setTitle] = useState('')
    const [width, setWidth] = useState(window.innerWidth);


    // get events data on initial render by fetching data from the database
    useEffect(() => {
        (async function getEvents() {
            fetchEvents(setUserEvents)
        })();

        // clean-up function code, like disconnecting from a db  to prevent memory leaks and such.
        // eg : return () => //code
        
    },[])

    // get today events for displaying in the drawer in mobile devices
    useEffect(() => {

        const calApi = calendarRef.current?.getApi();

        if (calApi){
            
           const timeoutID = setTimeout(() => {
                const filteredEvents = calApi?.getEvents().filter(evt => moment(calApi.getDate()).format('MMMM Do YYYY') === moment(evt.start).format('MMMM Do YYYY'))
                if (JSON.stringify(filteredEvents) === JSON.stringify(todayEvents)) return;
                setTodayEvents([...filteredEvents])
            },200)

            return () => clearTimeout(timeoutID)
        }

        
    },[todayEvents])

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


    // get the title from the calendar api's method and display it as soon as its recieved
    useEffect(() => {
        const calTitle = calendarRef.current.getApi().view.title
        setTitle(calTitle)
    },[title])

    // enables users to swipe in mobile devices
    const handlers = useSwipeable({
        
        onSwipedLeft : () => {
            calendarRef.current?.getApi().next()
            setTitle(calendarRef.current.getApi().view.title)
            setDate(moment(calendarRef.current?.getApi().getDate()))
        },
        onSwipedRight : () => {
            calendarRef.current?.getApi().prev()
            setTitle(calendarRef.current.getApi().view.title)
            setDate(moment(calendarRef.current.getApi().getDate()))
        },

        swipeDuration : 500,
    });

    // calendar api's methods

    // handles any kind of date change
    const handleDateChange = (direction) => {
        const calApi = calendarRef.current.getApi();
        if (calApi) {
            (direction === 'prev') ? calApi.prev() : 
            (direction === 'next') ? calApi.next() :
            (direction === 'today') ? calApi.today() : ''
        }

        setDate(moment(calApi.getDate()))
        setTitle(calApi.view.title)

    }

    // handles any kind of view change
    const handleViewChange = (view) => {
        const calApi = calendarRef.current?.getApi()
        if (calApi){
            calApi.changeView(view)
            setTitle(calApi.view.title)
        }
    }

    // handles custom date from date-picker component
    const handleCustomDate = (newDate) => {
        const calApi = calendarRef.current?.getApi()
        if (calApi){
            calApi.gotoDate(newDate?.toDate())
            setTitle(calendarRef.current?.getApi().view.title)
            setDate(newDate)
        }
    }


    return (
        <>  
            <CalendarHeader screenSize={width} currDate={date} handleDate={handleDateChange} handleView={handleViewChange} handleCustomDate={handleCustomDate}>
                <h1 className="calendar-title">{title}</h1>
            </CalendarHeader>

            <div {...handlers} >
                <FullCalendar

                    // initial calendar setup
                    ref={calendarRef}
                    plugins={[daygridPlugin, timegridPlugin, multiMonthPlugin, interactionPlugin, listPlugin]}
                    initialView={'dayGridMonth'}
                    aspectRatio={width <= 1100 ? 2.8 : 2.8}
                    contentHeight={width <= 1100 ? '78vh' :'80vh'}
                    dayHeaderFormat={{weekday : 'short'}}
                    headerToolbar={false}

                    // events
                    events={userEvents}
                            
                >
                </FullCalendar>
            </div>   
            {width <= 1100 && <SwipeableEdgeDrawer todayEvents={todayEvents}  />}
        </>
    )
}