import Footer from "./Footer";
import Header from "./Header";

function Ganado() {
  return (
    <>
      <Header tabs={false} />
      <div className="sidebar">
        <a href="/dashboard/ganado/show">
          <button className="show-db-btn">Show Database</button>
        </a>
        <div className="calendar">
          <div>September 2025</div>
        </div>
        <div className="weather-widget">
          <h4>Weather</h4>
          <p>25°C, Clear Sky</p>
          <p>Sunny with a light breeze</p>
        </div>
      </div>

      <div className="main-content">
        <div className="stats-graphic">
          <img src="https://via.placeholder.com/800x300.png?text=Stats+Graph" alt="Statistics Graph" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Ganado;
