import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://68348072464b499636031da8.mockapi.io/api/v1/productos'
const adminEmails = ['nicolasrizzo@gmail.com']

function Admin() {
  const { user } = useAuth()

  if (!user || !adminEmails.includes(user.email)) {
    return <p>Debes iniciar sesión como administrador</p>
  }

  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(API_URL)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Error al obtener los productos', err)
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      Swal.fire('Error', 'El nombre es obligatorio', 'error')
      return false
    }
    if (Number(formData.price) <= 0) {
      Swal.fire('Error', 'El precio debe ser mayor a 0', 'error')
      return false
    }
    if (formData.description.length < 10) {
      Swal.fire('Error', 'La descripción debe tener al menos 10 caracteres', 'error')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const method = isEditing ? 'PUT' : 'POST'
      const url = isEditing ? `${API_URL}/${editId}` : API_URL

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error()

      Swal.fire('Éxito', `Producto ${isEditing ? 'actualizado' : 'creado'} correctamente`, 'success')
      setFormData({ name: '', price: '', description: '', category: '', image: '' })
      setIsEditing(false)
      setEditId(null)
      fetchProducts()
    } catch (err) {
      console.error('Error al guardar el producto', err)
      Swal.fire('Error', 'Ocurrió un problema al guardar el producto', 'error')
    }
  }

  const handleEdit = (product) => {
    setFormData(product)
    setIsEditing(true)
    setEditId(product.id)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
          if (!res.ok) throw new Error()
          Swal.fire('Eliminado', 'Producto eliminado con éxito', 'success')
          fetchProducts()
        } catch {
          Swal.fire('Error', 'No se pudo eliminar el producto', 'error')
        }
      }
    })
  }

  return (
    <div className='admin'>
      <h2>Administrar Productos</h2>

      <form onSubmit={handleSubmit} className='admin-form'>
        <input type='text' name='name' placeholder='Nombre' value={formData.name} onChange={handleChange} />
        <input type='number' name='price' placeholder='Precio' value={formData.price} onChange={handleChange} />
        <textarea name='description' placeholder='Descripción' value={formData.description} onChange={handleChange} />
        <input type='text' name='category' placeholder='Categoría' value={formData.category} onChange={handleChange} />
        <input type='text' name='image' placeholder='URL de imagen' value={formData.image} onChange={handleChange} />
        <button type='submit'>{isEditing ? 'Actualizar' : 'Agregar'} producto</button>
      </form>

      {isLoading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td><img src={product.image} alt={product.name} width={50} /></td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Admin
