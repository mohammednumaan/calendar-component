// NOTE : THIS COMPONENT ONLY TRIGGERS ON DEVICES WITH SMALLER SCREEN SIZES FOR ACCESSIBILTY
// imports
import { CalendarViewDay, CalendarViewMonth, CalendarViewWeek, Menu, ViewList } from "@mui/icons-material";
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";

// sidebar component
export default function Sidebar({calendarRef, newTitle}){

    // a state to open or close the sidebar
    const [isOpen, setIsOpen] = useState(false)

    // handles any view change upon clicking the listed options
    const handleViewChange = (view) => {
        const calApi = calendarRef.current?.getApi()

        if (calApi){
            calApi.changeView(view)
            newTitle(calApi.view.title)
        }
    }

    return (
        <>  
            <IconButton id="options" size="large" aria-label="view-options" onClick={() => setIsOpen(true)}>
                <Menu />
            </IconButton>

            
            <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                <Box sx={{width : '180px'}}>

                    <List>
                        <ListItemButton onClick={() => handleViewChange('dayGridMonth')}>
                            <ListItemIcon>
                                <CalendarViewMonth />
                            </ListItemIcon>
                            <ListItemText primary="Month" />
                        </ListItemButton>
                        
                        <ListItemButton onClick={() => handleViewChange('dayGridWeek')}>
                            <ListItemIcon>
                                <CalendarViewWeek />
                            </ListItemIcon>
                            <ListItemText primary="Week" />
                        </ListItemButton>

                        <ListItemButton onClick={() => handleViewChange('timeGridDay')}>
                            <ListItemIcon>
                                <CalendarViewDay />
                            </ListItemIcon>
                            <ListItemText primary="Day" />
                        </ListItemButton>

                        <ListItemButton onClick={() => handleViewChange('listMonth')}>
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