import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/product">Product</Link>
                </li>
                <li>
                    <Link to="/category">Category</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/promotion">Promotion</Link>
                </li>
                <li>
                    <Link to="/banner">Banner Management</Link>
                </li>
                <li>
                    <Link to="/rating">Rating</Link>
                </li>
                <li>
                    <Link to="/stock">Stock</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;