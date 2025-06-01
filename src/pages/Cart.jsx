import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Cart({ cart, setCart }) {
  const handleAdd = (id) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const handleSubtract = (id) => {
    setCart(prev => prev.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  const handleRemove = (id, name) => {
    setCart(prev => prev.filter(item => item.id !== id))
    Swal.fire({
      toast: true,
      icon: 'info',
      title: `Se eliminó "${name}" del carrito`,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleClearCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([])
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Carrito vaciado',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  
  if (cart.length === 0) {
    return (
      <div className='cta'>
        <p>Tu carrito está vacío.</p>
        <h2>¡Comenzá a comprar hoy mismo!</h2>
        <p>Visitá la sección de productos y agregá tus favoritos al carrito.</p>
        <Link className='btn-primary' to='/products'>Ver productos</Link>
      </div>
    )
  }

  return (
    <section className='cart'>
      <h2>Carrito de compras</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1rem 0',
              borderBottom: '1px solid #ccc',
              flexWrap: 'wrap'
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem' }}
            />
            <span style={{ flex: 1, fontWeight: 'bold' }}>{item.name}</span>
            <span style={{ width: '120px' }}>Precio: ${item.price}</span>
            <span style={{ width: '120px' }}>Cantidad: {item.quantity}</span>
            <span style={{ width: '140px' }}>Total: ${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleAdd(item.id)}>+</button>
              <button onClick={() => handleSubtract(item.id)} disabled={item.quantity === 1}>-</button>
              <button onClick={() => handleRemove(item.id, item.name)} title='Eliminar'>
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total del carrito: ${total.toFixed(2)}</h3>
      <button
        onClick={handleClearCart}
        style={{
          marginTop: '1rem',
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

export default Cart