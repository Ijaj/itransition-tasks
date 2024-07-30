import React, { useEffect, useRef, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import { Box } from '@mui/material';

function DrawingBoard() {
  const canvasRef = useRef(null);
  const connectionRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [id, setId] = useState((Math.random() * 100).toString());

  useEffect(() => {
    const startConnection = async () => {
      try {
        connectionRef.current = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7012/drawinghub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
          .withAutomaticReconnect()
          .build();

        await connectionRef.current.start();
        console.log("SignalR Connected");
        setIsConnected(true);

        await connectionRef.current.send("JoinBoard", "board1");

        connectionRef.current.on("ReceiveDrawing", (drawingData) => {
          // console.log("Received drawing data:");
          handleDataReceive(drawingData);
        });
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
      }
    };

    startConnection();

    return () => {
      if (connectionRef.current && isConnected) {
        connectionRef.current.stop();
      }
    };
  }, []);

  function handleDataReceive(drawingData){
    const split = drawingData.split('|');
    if(split[0] === id){
      // own data, no need to redraw
      return;
    }

    const newData = JSON.parse(split[2]);
    // setLines(old => {
    //   console.log(old);
    //   console.log(newData);
    //   return old;
    // });

    setLines(old => [...old, newData]);
  }

  function getPreProcessedData(){
    return `${id}|${'board1'}|${JSON.stringify(currentLine)}`;
  }

  async function send(){
    if(connectionRef.current.state === signalR.HubConnectionState.Connected){
      await connectionRef.current.send('SendMessage', getPreProcessedData());
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set the pencil style
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.fillStyle = color;
    context.strokeStyle = color;

    // Draw all lines from the lines state
    if (lines.length > 0) {
      // console.log(lines);
      lines.forEach(line => {
        if(line.length === 0) return;
        context.beginPath();
        context.moveTo(line[0].x, line[0].y);
        for (let i = 1; i < line.length; i++) {
          context.lineTo(line[i].x, line[i].y);
        }
        context.stroke();
      });
    }

    // Draw the current line being drawn
    if (currentLine.length > 0) {
      context.beginPath();
      context.moveTo(currentLine[0].x, currentLine[0].y);
      for (let i = 1; i < currentLine.length; i++) {
        context.lineTo(currentLine[i].x, currentLine[i].y);
      }
      context.stroke();
    }
    send();
  }, [lines, currentLine]);

  function handleMouseDown(e) {
    const xOffset = e.nativeEvent.offsetX;
    const yOffset = e.nativeEvent.offsetY;
    setCurrentLine([{ x: xOffset, y: yOffset }]);

    setIsDrawing(true);
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    const xOffset = e.nativeEvent.offsetX;
    const yOffset = e.nativeEvent.offsetY;
    setCurrentLine(prevLine => [...prevLine, { x: xOffset, y: yOffset }]);
  };

  function handleMouseUp() {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLines(prevLines => [...prevLines, currentLine]);
    setCurrentLine([]);
  };

  function handleMouseOut() {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLines(prevLines => [...prevLines, currentLine]);
    setCurrentLine([]);
  }

  return (
    <Box sx={{ border: '2px solid black' }} >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </Box>
  );
}

export default DrawingBoard;