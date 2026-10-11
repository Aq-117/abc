// Program 4: Simplified e-commerce app with React Router (works fully offline)
// Needs: npm install react-router-dom   (one-time; afterwards no internet needed)
// Usage: save as src/App.jsx in a Vite/CRA project.
import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter, Routes, Route, Link, NavLink,
  Navigate, useParams, useNavigate, useLocation,
} from "react-router-dom";

// ---------- Local data (no API) ----------
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 55000, desc: "14-inch, 16GB RAM, 512GB SSD" },
  { id: 2, name: "Headphones", price: 2500, desc: "Wireless, noise cancelling" },
  { id: 3, name: "Smart Watch", price: 4000, desc: "Heart-rate and sleep tracking" },
  { id: 4, name: "Backpack", price: 1200, desc: "Water-resistant, 25L" },
];

// ---------- Global state (auth + cart) ----------
const AppContext = createContext();
const useApp = () => useContext(AppContext);

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));

  return (
    <AppContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}

// ---------- Protected route ----------
function ProtectedRoute({ children }) {
  const { user } = useApp();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

// ---------- Navigation ----------
function Navbar() {
  const { user, setUser, cart } = useApp();
  const navigate = useNavigate();
  const style = ({ isActive }) => ({
    marginRight: 15, textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal", color: isActive ? "#c0392b" : "#333",
  });

  return (
    <nav style={{ padding: 12, background: "#eee", display: "flex", alignItems: "center" }}>
      <NavLink to="/" style={style}>Home</NavLink>
      <NavLink to="/products" style={style}>Products</NavLink>
      <NavLink to="/contact" style={style}>Contact</NavLink>
      <NavLink to="/cart" style={style}>Cart ({cart.length})</NavLink>
      <span style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            Hi, {user}{" "}
            <button onClick={() => { setUser(null); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" style={style}>Login</NavLink>
        )}
      </span>
    </nav>
  );
}

// ---------- Pages ----------
const Home = () => (
  <div>
    <h2>Welcome to MyShop</h2>
    <p>Browse our products and add your favourites to the cart.</p>
    <Link to="/products">Shop now</Link>
  </div>
);

const Products = () => (
  <div>
    <h2>Products</h2>
    {PRODUCTS.map((p) => (
      <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
        <h3>{p.name}</h3>
        <p>₹{p.price}</p>
        <Link to={`/products/${p.id}`}>View details</Link>
      </div>
    ))}
  </div>
);

function ProductDetails() {
  const { id } = useParams(); // dynamic routing
  const { addToCart } = useApp();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <p><b>₹{product.price}</b></p>
      <button onClick={() => addToCart(product)}>Add to cart</button>{" "}
      <Link to="/products">Back</Link>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <h2>Contact Us</h2>
      {sent ? (
        <p>Thanks! We will get back to you.</p>
      ) : (
        <>
          <input placeholder="Your email" /><br /><br />
          <textarea placeholder="Message" /><br /><br />
          <button onClick={() => setSent(true)}>Send</button>
        </>
      )}
    </div>
  );
}

function Login() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Demo credentials: any name with password "1234"
    if (name && pass === "1234") {
      setUser(name);
      navigate(location.state?.from || "/", { replace: true });
    } else {
      setError("Enter a username and the password 1234");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password (1234)" value={pass}
             onChange={(e) => setPass(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart } = useApp();
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <>
          {cart.map((p, i) => (
            <p key={i}>
              {p.name} - ₹{p.price}{" "}
              <button onClick={() => removeFromCart(i)}>Remove</button>
            </p>
          ))}
          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <Link to="/">Go back home</Link>
  </div>
);

// ---------- App ----------
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
