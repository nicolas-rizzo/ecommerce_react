import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const API_URL = 'https://68348072464b499636031da8.mockapi.io/api/v1/productos'

function Products ({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos')
        return res.json()
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className='product-list'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </section>
  )
}

export default Products