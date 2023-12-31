// import
import events from '/home/numaan/calendar-final-build/calendar-component/src/sampleEvents.json'

// fetching data from database in json format 
// the fetched data must be an array of objects

const fetchEvents = async (callback) => {

    // await and fetching data code goes here, along with error handling (to check if response is 'ok')
    const data = events;
    callback(data)


}

export default fetchEvents;