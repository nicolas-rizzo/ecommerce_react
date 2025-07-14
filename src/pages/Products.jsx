import { useEffect, useState } from 'react'
import '../App.css'
import ProductCard from '../components/ProductCard'

function Products({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://68348072464b499636031da8.mockapi.io/api/v1/productos')
        if (!res.ok) throw new Error('Error al obtener productos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  return (
    <div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Productos</h1>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <input
              type='text'
              placeholder='Buscar productos...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='product-search'
            />
          </div>

          <div className='product-list'>
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>

          <div className='pagination'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Products
