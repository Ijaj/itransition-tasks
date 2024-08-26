import React, { useState, useCallback } from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import Controls from './components/Controls.js';
import UserTable from './components/UserTable.js';
import { generateUsers } from './utils/dataGenerator.js';

const App = () => {
  const [region, setRegion] = useState('en_US');
  const [errorRate, setErrorRate] = useState(0);
  const [seed, setSeed] = useState(Date.now());
  const [users, setUsers] = useState([]);

  const generateData = useCallback(() => {
    const newUsers = generateUsers(region, errorRate, seed, 20);
    setUsers(newUsers);
  }, [region, errorRate, seed]);

  React.useEffect(() => {
    generateData();
  }, [generateData]);

  const handleLoadMore = () => {
    const newUsers = generateUsers(region, errorRate, seed, 10, users.length);
    setUsers([...users, ...newUsers]);
  };

  return (
    <Box
      sx={{
        padding: 2,
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Card elevation={12}>
        <CardHeader title="Data Entry Error Emulation" />
        <CardContent>
          <Controls
            region={region}
            setRegion={setRegion}
            errorRate={errorRate}
            setErrorRate={setErrorRate}
            seed={seed}
            setSeed={setSeed}
          />
          <UserTable users={users} onLoadMore={handleLoadMore} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;