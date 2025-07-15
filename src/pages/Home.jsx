import { FaCheckCircle, FaLock, FaPhone, FaTruck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <section className='home landing'>
      <h1>Bienvenido a nuestra tienda online</h1>
      <p>
        Descubrí productos únicos, de calidad y al mejor precio. Somos una plataforma moderna,
        simple y segura para realizar tus compras desde casa.
      </p>

      <section className='features'>
        <h2>¿Por qué elegirnos?</h2>
        <ul className="features-list">
          <li><FaCheckCircle /> Gran variedad de productos</li>
          <li><FaTruck /> Envíos rápidos a todo el país</li>
          <li><FaLock /> Pagos seguros</li>
          <li><FaPhone /> Atención personalizada</li>
        </ul>
      </section>

      <section className='categories'>
        <h2>Categorías destacadas</h2>
        <div className='category-grid'>
          <div className='category'>
            <h3>Hombre</h3>
            <p>Indumentaria moderna y cómoda para el día a día y ocasiones especiales.</p>
          </div>
          <div className='category'>
            <h3>Mujer</h3>
            <p>Prendas versátiles y con estilo para cada momento de tu vida.</p>
          </div>
          <div className='category'>
            <h3>Accesorios</h3>
            <p>Complementá tu look con bolsos, cinturones, bijouterie y más.</p>
          </div>
        </div>
      </section>

      <section className='cta'>
        <h2>¡Comenzá a comprar hoy mismo!</h2>
        <p>Visitá la sección de productos y agregá tus favoritos al carrito.</p>
        <Link className='btn-primary' to='/products'>Ver productos</Link>
      </section>
    </section>
  )
}

export default Home