# Calendar Component

This is the calendar component for the **Competitions Identifier Project**.

# Navigation 

**Navigation On PC's/Laptops**

Different Buttons have been added to navigate the calendar smoothly for PC's/Laptops along with a 'Date-Picker' to select a specific date.

**Navigation On Mobile/Tabs**

1. Swiping has been implemented, which allows for easy navigation on mobile's/tabs along with a sidebar component to allow users to change calendar views 

2. A 'Date-Picker' to select a specific date.

# Events

**Event Sources**

The events are basically objects containing different key-value pairs like id, title, etc,.

Events can be fetched/generated from any of these sources :
1. Array of Objects
2. JSON
3. Functions
4. Google Calendar
5. iCalendar

**Event Interaction**

- On clicking a particular event, it will re-direct the user to that event's page. ('react.dev' is set as a sample link for now).
- On hovering over the event, a small tooltip/popovers gets shown to display basic info like description of the event. (currently working on this)

**Today's Events**

On Mobile/Tab Devices, a swipeable drawer opens to display the user's events schedule for today.

**Event Object Format (Basic)**

{   

    id : <uniqueId>
    title : <eventTitle>,
    description : <eventDescription>,
    start : 'YYYY-MM-DD',
    end : 'YYYY-MM-DD',
    
}




