import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "/Users/simrat.singh/Documents/Repositories/PERSONAL/getjobportal-master/.env" });

const app = express();
app.use(cors());

const CLERK_SECRET_KEY = process.env.VITE_CLERK_SECRET_KEY; 
const CLERK_API_BASE = process.env.VITE_CLERK_API_BASE_URL; 


if (!CLERK_SECRET_KEY) {
  console.error("CLERK_SECRET_KEY is not defined. Check your .env file.");
  process.exit(1);
}

// Proxy route to fetch all users
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${CLERK_API_BASE}/users`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Proxy route to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await axios.delete(`${CLERK_API_BASE}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});