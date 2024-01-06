// NOTE : THIS COMPONENT 'TRIGGERS' ONLY ON MOBILE DEVICES/DEVICES WITH SMALL SCREEN WIDTH FOR EASIER ACCESSIBILITY
// imports
import { CalendarViewDay, CalendarViewMonth, CalendarViewWeek, KeyboardArrowDown, ViewList } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";

// mobile menu component
export default function MobileMenu({calendarRef, newTitle}){
    

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewChange = (view) => {
        const calApi = calendarRef.current?.getApi()
        if (calApi){
            calApi.changeView(view)
            newTitle(calApi.view.title)
        }
    }

    return (
        <>  
            <Button
                id="options-btn"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                size="medium"
                disableElevation
                
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
            >
                View
            </Button>

            {/* menu options */}
            <Menu
                elevation={0}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleViewChange('dayGridMonth')
                    handleClose()

                }} disableRipple>
                    <CalendarViewMonth sx={{color : '#1e2b37'}} />
                    Month
                </MenuItem>
                <MenuItem onClick={() => {
                    handleViewChange('dayGridWeek')
                    handleClose()

                }} disableRipple>
                    <CalendarViewWeek sx={{color : '#1e2b37'}} />
                    Week
                </MenuItem>
                <MenuItem onClick={() => {
                    handleViewChange('timeGridDay')
                    handleClose()

                }} disableRipple>
                    <CalendarViewDay sx={{color : '#1e2b37'}} />
                    Day
                </MenuItem>
                <MenuItem onClick={() => {
                    handleViewChange('listMonth')
                    handleClose()

                }} disableRipple>
                    <ViewList sx={{color : '#1e2b37'}} />
                    Events
                </MenuItem>

            </Menu>      
        </>
    )
}

// props types validation
MobileMenu.propTypes = {
    calendarRef : PropTypes.object,
    callback : PropTypes.func,
}