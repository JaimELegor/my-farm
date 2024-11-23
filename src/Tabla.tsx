import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

interface TableData {
  [key: string]: string | number;
}

interface APIresponse {
  columns: string[];
  data: TableData[];
}

function Tabla() {
  const navigate = useNavigate();
  const api = "http://localhost/my-farm-api/db/ANIMAL";
  const [data, setData] = useState<APIresponse | null>(null);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<APIresponse>(api);
        setData(response.data);
      } catch (err) {
        setError("No se encontraron datos");
      }
    };
    fetchData();
  }, []);

  // Function to filter the rows based on the search term
  const filterData = () => {
    if (!searchTerm) return data?.data; // If no search term, return all data

    return data?.data.filter((row) => {
      return data.columns.some((column) => {
        // Check if any column in the row contains the search term (case insensitive)
        return String(row[column]).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  };

  const handleRowSelect = (row: TableData) => {
    setSelectedRow(row);
    console.log(row);
  };

  const handleEditClick = () => {
    if (selectedRow) {
      navigate("/edit");
    }
  };

  return (
    <>
      <Header tabs={false} />
      <div className='meta-tb'>
        <div className='tb-container'>
          <h1>Ganado</h1>
          <div className='tb-header-container'>
            <div className='tb-header'>
              <div className='tb-menu'>
                <button className="btn btn-success">Agregar</button>
                <button
                  className="btn btn-primary"
                  onClick={handleEditClick}
                  disabled={!selectedRow}
                >
                  Editar
                </button>
              </div>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm} // Set the value to the searchTerm state
                  onChange={(e) => setSearchTerm(e.target.value)} // Update the state on input change
                  className="search-bar"
                />
              </div>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                {data && data.columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && filterData()?.length === 0 ? (
                <tr>
                  <td colSpan={data.columns.length}>No results found</td>
                </tr>
              ) : (
                filterData()?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => handleRowSelect(row)}
                    className={selectedRow === row ? 'table-active' : ''}
                  >
                    {data?.columns.map((column) => (
                      <td key={column}>{row[column]}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tabla;

