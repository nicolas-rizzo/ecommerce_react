import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = 'https://68348072464b499636031da8.mockapi.io/api/v1/productos'

function ProductDetail ({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar producto')
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando producto...</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return null

  return (
    <div className='product-detail'>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Precio: ${product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
  )
}

export default ProductDetail
