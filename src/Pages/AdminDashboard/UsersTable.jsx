import React, { useState, useEffect } from "react"
import { db } from "../../Firebase/firebaseConfig"
import { collection, query, onSnapshot } from "firebase/firestore";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import UsersTableInfo from "./UsersTableInfo"

import Chip from '@mui/material/Chip';
import { Grid, Typography, Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';


const UsersTable = ({ currUser, myinfo, notify }) => {
    const [allUsers, setAllUsers] = useState([]) // allUsers is the array of all the users
    const [filteredUsers, setFilteredUsers] = useState([]) // filteredUsers is the array of users after filtering
    const [tabPage, setTabPage] = useState('1'); // tabPage is the tab that is selected


    const [pageSize, setPageSize] = useState(5); // pageSize is the number of rows per page

    const handleChangeTabPage = (event, newValue) => {
        setTabPage(newValue); // set the tabPage state to the new value
    };

    useEffect(() => {
        const q = query(collection(db, "empowerkids_users")); // query to get all the users from the database
        const unsubscribe = onSnapshot(q, (querySnapshot) => { // onSnapshot is a listener that listens for any changes in the database
            const appointments = [] // temporary array to store the users
            querySnapshot.forEach((doc) => { // loop through all the users
                const data = { ...doc.data(), key: doc.id } // store the user info in data
                appointments.push(data) // push the user info in the appointments array
            }); // this loop will run for each user
            setAllUsers(appointments) // set the allUsers state to the appointments array
        }); // this listener will run whenever there is a change in the database

        return (() => {
            unsubscribe() // unsubscribe from the listener
        }) // this will run when the component unmounts
    }, [])

    useEffect(() => {
        let index = 1 // index is the serial number of the user
        const tempArr = allUsers.reduce((result, data) => { // reduce function to filter the users
            switch (tabPage) { // switch case to filter the users based on the tab selected
                case "2":
                    if (data.accountType !== "Student")
                        return result // if the account type is not student, return the result
                    break
                case "3":
                    if (data.accountType !== "Empowerkids Team")
                        return result // if the account type is not Empowerkids Team, return the result
                    break
                    case "4":
                        if (data.accountType !== "Legal Expert")
                            return result // if the account type is not Legal Expert, return the result
                        break
                    case "5":
                        if (data.accountType !== "Government Official")
                            return result // if the account type is not Government Official, return the result
                        break 
                case "6":
                    if (data.accountType !== "Admin")
                        return result // if the account type is not Admin, return the result
                    break
                default:
                    break
            }
            result.push({ ...data, id: index }) // push the user info in the result array
            index = index + 1 // increment the index
            return result // return the result
        }, []) // this reduce function will run for each user

        setFilteredUsers(tempArr) // set the filteredUsers state to the tempArr
    }, [allUsers, tabPage]) // this useEffect will run when allUsers or tabPage changes



    const columns = [
        { field: 'id', headerName: 'Sr No.', type: "number", width: 60 },
        { field: 'name', headerName: 'User Name', width: 200, renderCell: renderCellExpand },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, renderCell: renderCellExpand },
        { field: 'phoneNo', headerName: 'Phone No', width: 200, renderCell: renderCellExpand },
        {
            field: 'accountType', headerName: 'Type', sortable: false, width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.accountType === "Student" ? // if the account type is student, display a green chip
                                <Chip label="Student" color="success" /> : // if the account type is Empowerkids Team, display a yellow chip
                                params.row.accountType === "Admin" ? // if the account type is Admin, display a red chip
                                    <Chip label="Admin" color="error" /> : // if the account type is Legal Expert, display a yellow chip
                                    <Chip label={params.row.accountType} color="warning" /> // if the account type is Government Official, display a yellow chip
                        }
                    </>
                )
            },

        },
        {
            field: 'Edit', 
            headerName: 'Edit',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <UsersTableInfo currUser={params.row} notify={notify} />
                    </>
                )

            },
        },


    ];


    return (

        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                        All Users
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabPage}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                                <TabList
                                    onChange={handleChangeTabPage} // this function will run when the tab is changed
                                    variant="scrollable" // scrollable tabs
                                    aria-label="lab API tabs example"> 
                                    <Tab label="All" value="1" /> 
                                    <Tab label="Student" value="2" />
                                    <Tab label="Empowerkids Team" value="3" />
                                    <Tab label="Legal Expert" value="4" />
                                    <Tab label="Government Officials" value="5" />
                                    <Tab label="Admin" value="6" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>

                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        disableSelectionOnClick
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        autoHeight
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: { showQuickFilter: true },
                        }} // this will show the quick filter
                    />

                </Grid>
            </Grid>


        </>
    )
} // this component will render the table of all the users

export default UsersTable





// For overflown visibility
function isOverflown(element) { // function to check if the text is overflown
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null); 
    const cellDiv = React.useRef(null); 
    const cellValue = React.useRef(null); 
    const [anchorEl, setAnchorEl] = React.useState(null); 
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false); 

    const handleMouseEnter = () => { // this function will run when the mouse enters the cell
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    }; // this function will run when the mouse enters the cell

    const handleMouseLeave = () => {
        setShowFullCell(false); // this function will run when the mouse leaves the cell
    };

    React.useEffect(() => { // this useEffect will run when the showFullCell state changes
        if (!showFullCell) {
            return undefined; // if the showFullCell state is false, return undefined
        }

        function handleKeyDown(nativeEvent) {  
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            } // if the escape key is pressed, set the showFullCell state to false
        }

        document.addEventListener('keydown', handleKeyDown); // add the event listener to listen for the escape key

        return () => {
            document.removeEventListener('keydown', handleKeyDown); // remove the event listener
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter} // this function will run when the mouse enters the cell
            onMouseLeave={handleMouseLeave} // this function will run when the mouse leaves the cell
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width: "auto", maxWidth: "80vw", marginLeft: -17 }}
                >
                    <Paper
                        elevation={5}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = { // prop types for the GridCellExpand component
    value: PropTypes.string.isRequired, 
    width: PropTypes.number.isRequired,
};  // prop types for the GridCellExpand component

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} /> // this will render the GridCellExpand component
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
};