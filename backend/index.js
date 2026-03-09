const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// LIST
app.get("/api/products", async (req, res) => {
  try {
    const items = await prisma.product.findMany({ orderBy: { id: "desc" } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// GET ONE
app.get("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.product.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Not Found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// CREATE
app.post("/api/products", async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  try {
    const created = await prisma.product.create({
      data: {
        name: String(name).trim(),
        description: description ? String(description).trim() : null,
        price: Number(price),
      },
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: String(name).trim(),
        description: description ? String(description).trim() : null,
        price: Number(price),
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));