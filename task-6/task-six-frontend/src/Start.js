import React, { useState } from "react";
import { Box, List, Typography, ListItem, ListItemText, ListItemAvatar, Avatar, FormControl, TextField, Button, Divider, Card, CardHeader, CardContent, ListItemButton, Grid, } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

export default function Start({ selectedBoard, setSelectedBoard, allBoards, setJoined }) {
  const [name, setName] = useState("");
  const [board, setBoard] = useState("");

  function handleBoardChange(e) {
    setBoard(board);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSelectBoard(newBoard) {
    setSelectedBoard(newBoard);
  }

  function handleJoin() {
    if (name.length === 0) {
      window.alert("Please enter a name");
    }
  }

  function handleNewBoard() {
    if (name.length === 0) {
      window.alert("Please enter a name");
      return;
    }

    if (board.length === 0) {
      window.alert("Please enter a board name");
      return;
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card>
        <CardHeader title={<Typography variant="h2" fontWeight={700}>Drawing Board</Typography>} />
        <CardContent>
          <Box
            display={'flex'}
            flexDirection={'column'}
          >
            <Typography variant="h5" align="center">Create a Board</Typography>
              <Box display={'flex'}>
                <FormControl fullWidth>
                  <TextField label="Enter Your Name" placeholder="Enter Your Name" />
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained">Join</Button>
              </Box>
              <Typography variant="h5" align="center">OR Join existing ones</Typography>
            <Box
              sx={{
                height: '75vh',
                overflow: 'auto',
                marginBottom: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#e0e0e0',  // Light gray background
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#9e9e9e',  // Medium gray scrollbar
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#757575',  // Darker gray on hover
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#9e9e9e #e0e0e0',  // For Firefox
              }}
            >
              
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {Object.entries(allBoards).map(([key, value]) => (
                  <>
                    <ListItemButton onClick={() => console.log(key, value)}>
                      <ListItemText primary={'key'} secondary="5 Participants" />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}