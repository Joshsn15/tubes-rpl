import { useState } from "react";

type Product = {
    name: string;
    category: string;
    price: number;
    stock: number;
    manufactureDate: string;
    expiryDate: string;
};

export default function AddProduct() {
    const [form, setForm] = useState<Product>({
        name: "",
        category: "FOOD",
        price: 0,
        stock: 0,
        manufactureDate: "",
        expiryDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "price" || name === "stock"
                    ? Number(value)
                    : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || form.price <= 0 || form.stock < 0) {
            alert("Input tidak valid");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/add-products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            console.log(data);
            alert("Product berhasil ditambahkan");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px" }}>
            <h2>Add New Product</h2>

            <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="FOOD">Food</option>
                        <option value="DRINK">Drink</option>
                        <option value="HEALTH">Health</option>
                        <option value="BEAUTY">Beauty</option>
                    </select>
                </div>

                {/* PRICE */}
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />
                </div>

                {/* STOCK */}
                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                    />
                </div>

                {/* MANUFACTURE DATE */}
                <div>
                    <label>Manufacture Date</label>
                    <input
                        type="date"
                        name="manufactureDate"
                        value={form.manufactureDate}
                        onChange={handleChange}
                    />
                </div>

                {/* EXPIRY DATE */}
                <div>
                    <label>Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" style={{ marginTop: "10px" }}>
                    Add Product
                </button>
            </form>
        </div>
    );
}