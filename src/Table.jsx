import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react"


export default function BasicTable() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);  /* default is 10 rows per page */

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        setLoading(true)
        fetch("https://fakestoreapi.com/users")
            .then(response => response.json())
            .then(json => {
                setUsers(json);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {
                loading ? (<div> Loading ... </div>)
                    : (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >First&nbsp;Name</TableCell>
                                            <TableCell >Last&nbsp;Name</TableCell>
                                            <TableCell >E-Mail</TableCell>
                                            <TableCell >Postal&nbsp;Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                                <TableRow
                                                    key={user.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {user.name.firstname}
                                                    </TableCell>
                                                    <TableCell >{user.name.lastname}</TableCell>
                                                    <TableCell >{user.email}</TableCell>
                                                    <TableCell >{user.address.zipcode}</TableCell>

                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>

                    )
            }

        </div>

    );
}
