// NOTE : THIS COMPONENT 'TRIGGERS' ONLY ON MOBILE DEVICES/DEVICES WITH SMALL SCREEN WIDTH FOR EASIER ACCESSIBILITY

import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";



export default function MobileMenu({calendarRef}){

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
            >
                View Options
            </Button>
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
                <MenuItem onClick={() => calendarRef.current?.getApi().changeView('dayGridMonth')} disableRipple>
                    Month
                </MenuItem>
                <MenuItem onClick={() => calendarRef.current?.getApi().changeView('dayGridWeek')} disableRipple>
                    Week
                </MenuItem>
                <MenuItem onClick={() => calendarRef.current?.getApi().changeView('timeGridDay')} disableRipple>
                    Day
                </MenuItem>
                <MenuItem onClick={() => calendarRef.current?.getApi().changeView('listMonth')} disableRipple>
                    Events
                </MenuItem>

            </Menu>      
        </>
    )
}