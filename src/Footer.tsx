
function Footer() {
  return (

    <footer>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-facebook fs-2"></i> {/* Bootstrap Facebook Icon */}
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-twitter fs-2"></i> {/* Bootstrap Twitter Icon */}
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <i className="bi bi-instagram fs-2"></i> {/* Bootstrap Instagram Icon */}
        </a>
      </div>
      <div className="legend">&copy; 2024 MyFarm. All rights reserved.</div>
      <div className="logo">
        <img src="/src/assets/logo.png" alt="Company Logo" width="100" />
      </div>
    </footer>
  )
}

export default Footer;
