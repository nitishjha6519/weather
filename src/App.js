import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  let [cities, setCities] = useState([]);
  let [lastEntry, setLastEntry] = useState(false);

  function handleSearch() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a6d6686984461f8a6e4e3fd44324a424`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.cod === 200) {
          setData(data);
          setError(false);
          setCities(() => [...cities, data.name]);
        } else {
          setError(true);
          setData("");
        }
      });
  }

  useEffect(() => {
    if (city === "") {
      setError(false);
      setData("");
    }
  }, [city]);

  useEffect(() => {
    if (error === false && city === "" && cities.length >= 3) {
      console.log(cities);
      setLastEntry(true);
    }
  }, [city]);
  return (
    <div className="bg-orange-100 h-screen flex justify-center">
      <div className="w-2/3 flex flex-col items-center  border-black">
        <h1 className="text-blue-600 text-3xl font-medium m-8">Weather App</h1>

        <div className="w-2/3 h-10 text-center  outline-none mb-4">
          <input
            type="text"
            className="w-2/3 h-10 text-center border border-black outline-none"
            placeholder="Search City..."
            value={city}
            onChange={(e) => {
              // console.log(e.target.value);
              setCity(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="border border-black px-6 py-2 ml-2 bg-green-200 hover:text-green-500"
          >
            Search
          </button>
        </div>

        {data ? (
          <ul className=" text-center">
            <li>Weather Details Of City: {data?.name}</li>
            <li>Current Temperature: {data.main.temp_min} </li>
            <li>
              Temperature Range: {data.main.temp_min} to {data.main.temp_max}
            </li>
            <li>Humidity: {data?.main.humidity}</li>
          </ul>
        ) : null}

        {error ? (
          <p className="text-3xl text-red-200 bg-red-500 w-full py-2 text-center font-medium">
            Enter valid city name
          </p>
        ) : null}

        {lastEntry ? (
          <div>
            <h2 className="text-blue-600 text-3xl font-medium m-8 text-left">
              Last 3 city entries
            </h2>
            {cities.slice(cities.length - 3).map((item, i) => (
              <li key={i} className="list-none">
                {item}
              </li>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
