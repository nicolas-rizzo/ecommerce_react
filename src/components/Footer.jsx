function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} - {import.meta.env.VITE_APP_NAME}</p>
    </footer>
  )
}

export default Footer