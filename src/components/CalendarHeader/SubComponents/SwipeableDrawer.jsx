import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import { useEffect, useState } from "react";
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from "moment/moment";
import { EventSharp, } from "@mui/icons-material";


  
  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

const drawerBleeding = 56;
  
export default function SwipeableEdgeDrawer({window, calendarRef}) {

    const [events, setEvents] = useState([{'title' : 'Test Event', 'start' : 'Jan 08 2024'}]);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    // useEffect(() => {
    //     const calApi = calendarRef.current?.getApi();
    //     const todayEvents = calApi.getEvents().filter(evt => moment(calApi.getDate()).format('MMMM Do YYYY') === moment(evt.start).format('MMMM Do YYYY'))
    //     if (JSON.stringify(todayEvents) !== JSON.stringify(events)) setEvents(todayEvents)
    // },[calendarRef, events])
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <>
        <CssBaseline />

        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(${1000} - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />

        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: 'text.secondary' }}>{`Your Events For Today (${events.length})`}</Typography>

          </StyledBox>

          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <List>
              {events.length > 0 ? events.map((event) => (
                  <>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <EventSharp />
                        </ListItemIcon>
                        <ListItemText primary={event.title} secondary={event.start} />
                      </ListItemButton>
                      
                    </ListItem>   
                  </>
                )) :
                (
                  <h4 id="no-events-msg">You Have No Events Today : (</h4>
                )
              }
              </List>
          </StyledBox>
        </SwipeableDrawer>
      </>
    );
}