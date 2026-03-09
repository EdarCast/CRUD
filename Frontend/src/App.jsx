import { useState } from "react";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = () => {

    if(product === "" || description === "" || price === "") return;

    const newProduct = {
      product,
      description,
      price
    };

    if(editIndex !== null){
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    }else{
      setProducts([...products, newProduct]);
    }

    clearForm();
  };

  const clearForm = () => {
    setProduct("");
    setDescription("");
    setPrice("");
    setEditIndex(null);
  };

  const editProduct = (index) => {
    setProduct(products[index].product);
    setDescription(products[index].description);
    setPrice(products[index].price);
    setEditIndex(index);
  };

  const deleteProduct = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  return (
    <div className="container">

      <h1>📦 Gestión de Productos</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Nombre del producto"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editIndex !== null ? "Actualizar" : "Agregar"}
        </button>

      </div>

      {products.length === 0 ? (
        <p style={{textAlign:"center", color:"#777"}}>
          No hay productos registrados
        </p>
      ) : (

      <div className="table">

        <div className="header">
          <span>Producto</span>
          <span>Descripción</span>
          <span>Precio</span>
          <span>Acciones</span>
        </div>

        {products.map((p, index) => (
          <div className="row" key={index}>

            <span>{p.product}</span>
            <span>{p.description}</span>
            <span>${Number(p.price).toFixed(2)}</span>

            <div className="actions">

              <button
                className="edit"
                onClick={() => editProduct(index)}
              >
                ✏️ Editar
              </button>

              <button
                className="delete"
                onClick={() => deleteProduct(index)}
              >
                🗑 Eliminar
              </button>

            </div>

          </div>
        ))}

      </div>

      )}

    </div>
  );
}

export default App;