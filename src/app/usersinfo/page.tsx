"use client"
import { Button, Pagination, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { UpdateModal } from '../components/UpdateModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const UserInfo = () => {

    const router = useRouter();

    const [userData, setUserData] = useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);

    const users = async () => {
        await axios.get(`http://localhost:3000/api/userinfo`).then((user) => {
            setUserData(user.data.user);
            setRows(user.data.user);
        }).catch(err => {
            console.log(err);
        })
    }

    const onHandleDelete = async (id: any) => {
        alert("are you sure");
        console.log("id: ", id);

        await axios.patch(`http://localhost:3000/api/userinfo`, { id }).then((user) => {
            console.log("User Deleted Successfully");
            window.location.reload()
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        users();
    }, [])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Firstname</StyledTableCell>
                            <StyledTableCell align="left">Lastname</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Maritalstatus</StyledTableCell>
                            <StyledTableCell align="left">Hobby</StyledTableCell>
                            <StyledTableCell align="left">Update</StyledTableCell>
                            <StyledTableCell align="left">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row" key={index}>
                                        {row.firstname}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row?.lastname}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.email}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.maritalStatus === "true" ? "Married" : "Unmarrid"}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.hobby.map((result: string) => {
                                        return (
                                            <div>
                                                <span>{result}</span><br />
                                            </div>
                                        )
                                    })}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" >
                                        <UpdateModal userData={row} />
                                    </StyledTableCell >
                                    <StyledTableCell align="left">
                                        <Button variant="outlined" color="error" onClick={() => onHandleDelete(row._id)}>
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default UserInfo