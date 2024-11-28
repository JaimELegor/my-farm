
type Props = { tabs: boolean; }
function Header({ tabs }: Props) {
  return (
    <>
      <header>
        <a href="/">
          <div className="logo">
            <img src="/src/assets/logo.png" alt="Logo" width="150" />
          </div>
        </a>
      </header>
      <section className="tabs">
        {tabs &&
          <nav>
            <a href="login">Login</a>
            <a href="signup">Sign Up</a>
            <a href="about">About Us</a>
          </nav>
        }
      </section>
    </>
  );
}
export default Header;
