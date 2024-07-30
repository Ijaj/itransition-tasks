import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import constants, { axios_config } from "../../constants";
import { Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Lock, LockOpen, LogoutOutlined } from "@mui/icons-material";

export default function Dashboard() {
  const token = sessionStorage.getItem(constants.k_token);
  const userId = sessionStorage.getItem(constants.k_id);
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
    {
      accessorKey: "name",
      header: "Name",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
    {
      accessorKey: "lastLoginTime",
      header: "Last Login Time",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
    {
      accessorKey: "registrationTime",
      header: "Registration Time",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnActions: false,
      enableColumnDragging: false,
      filterFn: "contains",
    },
  ];

  function logout() {
    sessionStorage.removeItem(constants.k_id);
    sessionStorage.removeItem(constants.k_token);
    sessionStorage.removeItem(constants.k_user);
    navigate('/logout', { replace: true });
  }

  const url = `${process.env.REACT_APP_ALL_USERS}/${userId}`;

  function fetchAllUsers() {
    axios.get(url, axios_config(token))
      .then(result => {
        if (result.status === 401) {
          // logout
          logout();
        }
        else if (result.status === 200) {
          setTableData(result.data);
        }
      })
      .catch(error => {
        window.alert(error.response.data);
        if (error.response.status === 401) {
          logout();
        }
      });
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setSelectedCount(Object.keys(rowSelection).length);
  }, [rowSelection]);

  const handleRowSelectionChange = (newRowSelection) => {
    setRowSelection(newRowSelection);
  };

  const getSelectedRows = () => {
    return Object.keys(rowSelection).map((item) => tableData[item]);
  };

  function handleStatusChange(ids = [], newStatus) {
    const payload = {
      Ids: ids,
      Status: newStatus,
    }

    const url = `${process.env.REACT_APP_UPDATE_USERS}/${userId}`;

    axios.put(url, payload, axios_config(token))
      .then(result => {
        if (result.status === 401) {
          window.alert(result.data);
          logout();
        }
        else if (result.data > 0) {
          window.alert(`${newStatus === 1 ? "Unblocked" : "Blocked"} Successfully'`);
          setTableData(old => {
            return old.map(data => {
              if (ids.includes(data.id)) {
                data.status = newStatus;
              }
              return data;
            })
          });
        }
        else {
          window.alert(`Failed to ${newStatus === 1 ? "Unblock" : "Block"}'`);
        }
      })
      .catch(error => {
        window.alert(error.response.data);
        if (error.response.status === 401) {
          logout();
        }
      });
  }

  function handleDelete(ids = []) {
    const payload = {
      Ids: ids,
      Id: userId
    }
    const url = `${process.env.REACT_APP_DELETE_USER}`;
    axios.post(url, payload, axios_config(token))
      .then(result => {
        if (result.status === 401) {
          logout();
        }
        else if (result.status === 200 && result.data > 0) {
          window.alert(`Successfully deleted`);
          setTableData(old => {
            return old.filter(data => !ids.includes(data.id));
          })
        }
        else {
          window.alert(`Failed to delete. ${result.data}`);
        }
      })
      .catch(error => {
        window.alert(error.response.data);
        if (error.response.status === 401) {
          logout();
        }
      });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ padding: 1 }}>
          <Card elevation={5}>
            <CardHeader title={
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h5" fontWeight={700}>Users List</Typography>
                <Tooltip title="Logout">
                  <IconButton
                    onClick={logout}
                  >
                    <LogoutOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            } />
            <CardContent>
              <MaterialReactTable
                columns={columns}
                data={tableData}
                enableFacetedValues={true}
                enableSorting={false}
                enableFullScreenToggle={false}
                enableHiding={false}
                enableDensityToggle={false}
                enableColumnFilters={false}
                enableColumnFilterModes
                enableColumnOrdering={false}
                enableRowSelection
                enableGrouping
                autoResetAll={false}
                enableExpandAll={false}
                onRowSelectionChange={handleRowSelectionChange}
                state={{ rowSelection }}
                initialState={{
                  showColumnFilters: false,
                  columnVisibility: { branch_id: false, status: false },
                  density: "compact",
                  showGlobalFilter: true,
                  pagination: { pageIndex: 0, pageSize: 50 },
                }}
                positionToolbarAlertBanner="bottom"
                renderTopToolbarCustomActions={({ table }) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={selectedCount === 0}
                    onClick={() => console.log('Selected rows:', getSelectedRows())}
                  >
                    Delete All
                  </Button>
                )}
                displayColumnDefOptions={{ "mrt-row-actions": { size: 150 } }}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => {
                  return (
                    <Box>
                      <Button
                        disabled={row.original.status !== 1}
                        onClick={() => handleStatusChange([row.original.id], 0)}
                        variant="contained"
                        color="error"
                      >
                        <Lock /> &nbsp;&nbsp; Block
                      </Button>
                      &nbsp;&nbsp;
                      <IconButton disabled={row.original.status === 1} onClick={() => handleStatusChange([row.original.id], 1)}>
                        <LockOpen />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton onClick={() => handleDelete([row.original.id])}>
                        <Delete />
                      </IconButton>
                    </Box>
                  )
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>

  )
}