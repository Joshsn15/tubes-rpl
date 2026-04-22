/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    Dialog,
    Box,
    TextField,
    Button,
    MenuItem,
    Typography
} from "@mui/material";

export default function EmployeeForm({ open, onClose, onSuccess, data }: any) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    });

    try{
        useEffect(() => {
        if (data) {
            setForm({
                username: data.username || "",
                email: data.email || "",
                password: "",
                role: data.role || "EMPLOYEE"
            });
        } else {
            setForm({
                username: "",
                email: "",
                password: "",
                role: "EMPLOYEE"
            });
        }
    }, [data]);
    } catch (err) {
        console.error(err);
    }

    const handleSave = async () => {
        if (!form.username || !form.email || (!data && !form.password)) {
            alert("Semua field wajib diisi!");
            return;
        }

        const method = data ? "PUT" : "POST";
        const url = data
            ? `http://localhost:3000/api/admin/employees/${data.user_id}`
            : `http://localhost:3000/api/admin/employees`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message || "Error");
                return;
            }

            onSuccess();
            onClose();

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 320
                }}
            >

                <Typography sx={{ fontWeight: "bold" }}>
                    {data ? "Edit Employee" : "Add Employee"}
                </Typography>

                <TextField
                    label="Username"
                    value={form.username}
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                {!data && (
                    <TextField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                )}

                <TextField
                    select
                    label="Role"
                    value={form.role}
                    onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                    }
                >
                    <MenuItem value="MANAGER">Manager</MenuItem>
                    <MenuItem value="STOCKER">Stocker</MenuItem>
                    <MenuItem value="EMPLOYEE">Employee</MenuItem>
                </TextField>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        backgroundColor: "#513229",
                        "&:hover": { backgroundColor: "#3b231c" }
                    }}
                >
                    Save
                </Button>

            </Box>
        </Dialog>
    );
}