import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    CardContent
} from "@mui/material";
import EmployeeForm from "./employeeForm";

type Employee = {
    user_id: string;
    username: string;
    email: string;
    role: string;
};

export default function EmployeePage() {
    const [data, setData] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Employee | null>(null);

    const fetchData = () => {
        fetch("http://localhost:3000/api/admin/employees")
            .then(res => res.json())
            .then(res => {
                console.log("API:", res);
                setData(res.data || res);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        await fetch(`http://localhost:3000/api/admin/employees/${id}`, {
            method: "DELETE"
        });
        fetchData();
    };

    return (
        <Box sx={{ p: 4, backgroundColor: "#F4F1E2", minHeight: "100vh" }}>

            <Typography
                variant="h4"
                sx={{ color: "#513229", fontWeight: 700, mb: 3 }}
            >
                Manage Employee
            </Typography>

            <Button
                variant="contained"
                onClick={() => {
                    setSelected(null);
                    setOpen(true);
                }}
                sx={{
                    backgroundColor: "#c4dab7",
                    "&:hover": { backgroundColor: "#dccdc8" },
                    mb: 3
                }}
            >
                + Add Employee
            </Button>

            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell align="right">Aksi</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((e) => (
                                <TableRow key={e.user_id}>
                                    <TableCell>{e.username}</TableCell>
                                    <TableCell>{e.email}</TableCell>
                                    <TableCell>{e.role}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                setSelected(e);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(e.user_id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </CardContent>
            </Card>

            <EmployeeForm
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={fetchData}
                data={selected}
            />
        </Box>
    );
}