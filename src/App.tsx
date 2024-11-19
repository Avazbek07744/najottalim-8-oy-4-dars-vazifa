import { FC, useEffect, useState } from "react";
import axios from "axios";
import Cart from "./components/Card";
import { regions } from "./data/regions";

interface DataType {
  name: string;
  temperature: number;
  description: string;
}

const App:FC = () => {
  const [dataJson, setDataJson] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "3cc68d3216261b056230d71513da1450";
      const data = await Promise.all(
        regions.map(async (region) => {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${region.lat}&lon=${region.lon}&units=metric&appid=${apiKey}`
          );
          return {
            name: region.name,
            temperature: res.data.main.temp,
            description: res.data.weather[0].description,
          };
        })
      );
      setDataJson(data);
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 via-gray-100 to-blue-50 min-h-screen">
    <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center shadow-sm">
      O'zbekiston Viloyatlari Ob-Havo
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dataJson.map((weather) => (
        <Cart
          key={weather.name}
          name={weather.name}
          temperature={weather.temperature}
          description={weather.description}
        />
      ))}
    </div>
  </div>
  
  );
};

export default App;
