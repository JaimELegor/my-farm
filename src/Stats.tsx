import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { isDateInRange, DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css"
import Weather from 'weather-view';
import AnimalStats from "./AnimalStats";
import { useNavigate } from "react-router-dom";

interface Props {
  db: string;
}

function getDaysBetweenDates(startDate: Date, endDate: Date): Date[] {
  const days: Date[] = [];

  // Ensure startDate is before endDate
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate]; // Swap the dates if needed
  }

  // Loop through all the days from startDate to endDate
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate)); // Push a copy of currentDate
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return days;
}

function getAllDaysFromRanges(startDates: Date[], endDates: Date[]): Date[] {
  let allDays: Date[] = [];

  // Iterate over each pair of start and end dates
  for (let i = 0; i < startDates.length; i++) {
    const start = startDates[i];
    const end = endDates[i];

    // Get days between the current start and end date, and merge into the result array
    const daysInRange = getDaysBetweenDates(start, end);
    allDays = allDays.concat(daysInRange);
  }

  return allDays;
}

function Stats({ db }: Props) {

  const config =
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };
  const [start, setStart] = useState<Date[]>();
  const [end, setEnd] = useState<Date[]>();
  const [middle, setMiddle] = useState<Date[]>();
  const [selected, setSelected] = useState<Date[]>();
  const [vivos, setVivos] = useState<number>(0);
  const [muertos, setMuertos] = useState<number>(0);
  const [enfermos, setEnfermos] = useState<number>(0);
  const [vendidos, setVendidos] = useState<number>(0);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard/" + db + "/show");
  }
  const lookup = (array: any[], status: string) => {
    return array.filter((item: { estado: string }) => item.estado == status).length;
  }

  const fetchAnimals = async () => {
    const api = "http://localhost/my-farm-api/db/ANIMAL";
    const response = await fetch(api, config);
    const data = await response.json();

    setVivos(lookup(data.data, "VIVO"));
    setMuertos(lookup(data.data, "MUERTO"));
    setEnfermos(lookup(data.data, "ENFERMO"));
    setVendidos(lookup(data.data, "VENDIDO"));
  };

  const fetchTreatments = async () => {
    const api = "http://localhost/my-farm-api/db/TRATAMIENTO";
    const response = await fetch(api, config);
    const data = await response.json();
    const start = data.data.map((item: { fecha_tratamiento: string }) =>
      new Date(
        +item.fecha_tratamiento.split("-")[0],
        +item.fecha_tratamiento.split("-")[1] - 1,
        +item.fecha_tratamiento.split("-")[2])
    );
    const end = data.data.map((item: { fecha_final: string }) =>
      new Date(
        +item.fecha_final.split("-")[0],
        +item.fecha_final.split("-")[1] - 1,
        +item.fecha_final.split("-")[2])
    );
    const middle = getAllDaysFromRanges(start, end);
    setStart(start);
    setEnd(end);
    setMiddle(middle);
  };

  const fetchFoods = async () => {
    const api = "http://localhost/my-farm-api/db/ALIMENTO";
    const response = await fetch(api, config);
    const data = await response.json();
    setSelected(
      data.data.map((item: { porcion_diaria: number, cantidad: number }) => {
        let date = new Date(); // Get today's date
        let days: number = item.cantidad / item.porcion_diaria; // Calculate the number of days
        date.setDate(date.getDate() + days); // Add days to today
        return new Date(date); // Return the new date
      })
    );
  };

  useEffect(() => {
    fetchAnimals();
    fetchTreatments();
    fetchFoods();
  }, []);

  return (
    <>
      <Header tabs={false} />
      <div className="stats">
        <div className="show-db-bar">
          <button onClick={handleClick} className="show-db-btn">Mostrar base de datos</button>
        </div>
        <div className="main-content">
          <div className="stats-graphic">
            <div className="widgets">
              <Weather apiKey={"20313b7bf416f05ee1551a414be1c6b7"} location={"Guanajuato, Mexico"} />
            </div>
            <div className="widgets-animals">
              <AnimalStats alive={vivos} died={muertos} sick={enfermos} sold={vendidos} />
            </div>
            <div className="widgets">
              <DayPicker
                modifiers={{
                  range_start: start,
                  range_end: end,
                  range_middle: middle,
                  booked: selected
                }}
                modifiersClassNames={{
                  booked: "booked-date",
                  range_start: "range-start-date",
                  range_middle: "range-middle-date",
                  range_end: "range-end-date"
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stats;
