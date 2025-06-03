function Contact() {
  return (
    <section className='contact'>
      <h2>Contáctenos</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Contact