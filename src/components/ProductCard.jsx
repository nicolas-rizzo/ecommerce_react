import { Link } from 'react-router-dom'
import '../App.css'

function ProductCard ({ product, addToCart }) {
  return (
    <div className='product-card'>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      
      <img src={product.image} alt={product.name} />

      <p><strong>${product.price}</strong></p>
      <div className='actions'>
        <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        <Link to={`/product/${product.id}`}>Ver detalles del producto</Link>
      </div>
    </div>
  )
}

export default ProductCard