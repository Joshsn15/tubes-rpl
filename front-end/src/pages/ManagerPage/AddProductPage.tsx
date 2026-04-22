import { useState } from "react";
import { addProduct } from "../../services/pos.api";
import { useNavigate } from "react-router";


type Category = "FOOD" | "DRINK" | "HEALTH" | "BEAUTY";

type Product = {
    products_id: string;
    products_name: string;
    category: Category;
    price: number;
    stock: number;
    manufacture_date: string;
    expiry_date: string;
}

export default function AddProduct() {
    const [form, setForm] = useState<Product>({
        products_id: crypto.randomUUID(),
        products_name: "",
        category: "FOOD",
        price: 0,
        stock: 0,
        manufacture_date: "",
        expiry_date: "",
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]:
                name === "price" || name === "stock"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.products_name || form.price <= 0 || form.stock < 0) {
            alert("Input tidak valid");
            return;
        }

        try {
            await addProduct(form);
            alert("Product added successfully");
            navigate("/manager");
            setForm({
                products_id: crypto.randomUUID(),
                products_name: "",
                category: "FOOD",
                price: 0,
                stock: 0,
                manufacture_date: "",
                expiry_date: "",
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px",justifyContent: "center", margin: "0 auto", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h2>Add New Product</h2>

            <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="products_name"
                        value={form.products_name}
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
                        name="manufacture_date"
                        value={form.manufacture_date}
                        onChange={handleChange}
                    />
                </div>

                {/* EXPIRY DATE */}
                <div>
                    <label>Expiry Date</label>
                    <input
                        type="date"
                        name="expiry_date"
                        value={form.expiry_date}
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