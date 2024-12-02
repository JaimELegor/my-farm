interface AnimalStatsProps {
  alive: number;
  died: number;
  sold: number;
  sick: number;
}

function AnimalStats({ alive, died, sold, sick }: AnimalStatsProps) {
  const total = alive + died + sold + sick;

  const getHeightPercentage = (count: number) => (total > 0 ? (count / total) * 100 : 0);
  const dead_per = getHeightPercentage(died);
  const alive_per = getHeightPercentage(alive);
  const sold_per = getHeightPercentage(sold);
  const sick_per = getHeightPercentage(sick);

  return (
    <div className="animal-stats">
      <h2>Estadisticas</h2>
      <div className="cow-container-container">
        <div className="cow-container">
          <img src="/src/assets/cow.png" alt="Cow" className="cow-image" />
          <div className="stats-overlay">
            <div className="stats-bar died" style={{ height: `${dead_per}%` }} />
            <div className="stats-bar alive" style={{ height: `${alive_per}%` }} />
            <div className="stats-bar sold" style={{ height: `${sold_per}%` }} />
            <div className="stats-bar sick" style={{ height: `${sick_per}%` }} />
          </div>
        </div>
      </div>
      <div className="footer-stats">
        <div className="footer-stats-label">
          <div className="color-sample died" />
          <p>MUERTOS</p>
        </div>
        <div className="footer-stats-label">
          <div className="color-sample alive" />
          <p>VIVOS</p>
        </div>
        <div className="footer-stats-label">
          <div className="color-sample sold" />
          <p>VENDIDOS</p>
        </div>
        <div className="footer-stats-label">
          <div className="color-sample sick" />
          <p>ENFERMOS</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalStats;
