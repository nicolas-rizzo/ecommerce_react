function Contact() {
  return (
    <section className='contact'>
      <h2>Contáctenos</h2>
      <form className='contact-form'>
        <label>
          Nombre:
          <input type='text' name='name' required />
        </label>
        <label>
          Email:
          <input type='email' name='email' required />
        </label>
        <label>
          Mensaje:
          <textarea name='message' rows='5' required></textarea>
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </section>
  )
}

export default Contact