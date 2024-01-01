import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CalendarHeader({calendarRef}){
    
    const [date, setDate] = useState(moment(calendarRef.current?.getApi().getDate()))

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
             format="MMMM YYYY"
             className="date-picker"
             slotProps={{ textField : {size : "small"}}}
             value={date}
             onChange={(newValue) => {
                calendarRef.current?.getApi().gotoDate(newValue?.toDate())
                setDate(newValue)
             }}

             sx={
                {
                    position : "absolute",
                    left : "290px",
                }
             }
            />
        </LocalizationProvider>
    )
}