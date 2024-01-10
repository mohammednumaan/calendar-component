// NOTE : THIS COMPONENT ONLY TRIGGERS ON DEVICES WITH SMALLER SCREEN SIZES FOR ACCESSIBILTY
// imports
import { useState } from "react";
import PropTypes from 'prop-types';

import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { CalendarViewDay, CalendarViewMonth, CalendarViewWeek, Menu, ViewList } from "@mui/icons-material";

// sidebar component
export default function Sidebar({handleView}){

    // a state to open or close the sidebar
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <>  
            <IconButton sx={{color : '#1976d2', mt : '3px'}} id="options" size="large" aria-label="view-options" onClick={() => setIsOpen(true)}>
                <Menu />
            </IconButton>

            
            <Drawer  anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                <Box sx={{width : '200px'}}>

                    <div className="sidebar-header">
                        <Typography sx={{fontSize : '20px'}} >Calendar</Typography>
                    </div>
                    
                    <Typography color={'text.secondary'} sx={{ml : '10px', mt : '20px', fontSize : '14px'}} >View Options</Typography>



                    <List>
                        <ListItemButton onClick={() => handleView('dayGridMonth')}>
                            <ListItemIcon>
                                <CalendarViewMonth />
                            </ListItemIcon>
                            <ListItemText primary="Month" />
                        </ListItemButton>
                        <Divider />
                        
                        <ListItemButton onClick={() => handleView('dayGridWeek')}>
                            <ListItemIcon>
                                <CalendarViewWeek />
                            </ListItemIcon>
                            <ListItemText primary="Week" />
                        </ListItemButton>
                        <Divider />

                        <ListItemButton onClick={() => handleView('timeGridDay')}>
                            <ListItemIcon>
                                <CalendarViewDay />
                            </ListItemIcon>
                            <ListItemText primary="Day" />
                        </ListItemButton>
                        <Divider />

                        <ListItemButton onClick={() => handleView('listMonth')}>
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
    handleView : PropTypes.func,
}