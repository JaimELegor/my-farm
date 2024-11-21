import Footer from "./Footer";
import Header from "./Header";
function About() {
  return (
    <>
      <Header tabs={true} />
      <div className="about">
        <div className="about-content">
          <h2>Nosotros</h2>
          <p>Sobre Nosotros
            En MyFarm, nos dedicamos con pasión a la ganadería responsable y al manejo sostenible de tu inventario animal. Con años de experiencia en el sector, nuestro equipo trabaja diariamente para asegurar el bienestar de cada uno de nuestros animales, manteniendo prácticas que priorizan su salud, comodidad y desarrollo adecuado.
            Nos especializamos en el cuidado y manejo de vacas, cerdos, caballos, etc., supervisando cada etapa de su vida y monitoreando su estado de salud. Nuestro inventario actualizado nos permite llevar un control detallado de cada uno de nuestros animales, desde su alimentación y peso hasta su historial médico. Esto garantiza que siempre estén en condiciones óptimas, cumpliendo con los estándares más altos de bienestar animal.
            Creemos en una ganadería ética y sustentable, y trabajamos para mantener un equilibrio entre la productividad y el respeto por la naturaleza. Nuestro compromiso es ofrecer productos de alta calidad, logrados con esfuerzo y transparencia en cada proceso.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

