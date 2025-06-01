import '../App.css'
import Footer from './Footer'
import Header from './Header'

function Layout({ children, cart }) {
  return (
    <div className='layout'>
      <Header cart={cart} />
      <main className='main-content'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout