// NOTE : THIS COMPONENT ONLY TRIGGERS ON DEVICES WITH SMALLER SCREEN SIZES FOR ACCESSIBILTY
// imports
import { useState } from "react";
import PropTypes from 'prop-types';

import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CalendarViewDay, CalendarViewMonth, CalendarViewWeek, Menu, ViewList } from "@mui/icons-material";

// handles any view change upon clicking the listed options (defined only once)
const handleViewChange = (calendarRef, view, newTitle) => {
    const calApi = calendarRef.current?.getApi()
    if (calApi){
        calApi.changeView(view)
        newTitle(calApi.view.title)
    }
}

// sidebar component
export default function Sidebar({calendarRef, newTitle}){

    // a state to open or close the sidebar
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <>  
            <IconButton id="options" size="large" aria-label="view-options" onClick={() => setIsOpen(true)}>
                <Menu />
            </IconButton>

            
            <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                <Box sx={{width : '180px'}}>

                    <List>
                        <ListItemButton onClick={() => handleViewChange(calendarRef, 'dayGridMonth', newTitle)}>
                            <ListItemIcon>
                                <CalendarViewMonth />
                            </ListItemIcon>
                            <ListItemText primary="Month" />
                        </ListItemButton>
                        
                        <ListItemButton onClick={() => handleViewChange(calendarRef, 'dayGridWeek', newTitle)}>
                            <ListItemIcon>
                                <CalendarViewWeek />
                            </ListItemIcon>
                            <ListItemText primary="Week" />
                        </ListItemButton>

                        <ListItemButton onClick={() => handleViewChange(calendarRef, 'timeGridDay', newTitle)}>
                            <ListItemIcon>
                                <CalendarViewDay />
                            </ListItemIcon>
                            <ListItemText primary="Day" />
                        </ListItemButton>

                        <ListItemButton onClick={() => handleViewChange(calendarRef, 'listMonth', newTitle)}>
                            <ListItemIcon>
                                <ViewList />
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItemButton>
                        
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

// props types validation
Sidebar.propTypes = {
    calendarRef : PropTypes.object,
    newTitle : PropTypes.func,
}