import { FC, useState } from "react";
import axios from "axios";
import Cart from "./components/Card";
import { regions } from "./data/regions";

interface DataType {
  name: string;
  temperature: number;
  description: string;
}

const App: FC = () => {
  const [dataJson, setDataJson] = useState<DataType[]>([]);
  const [selectedR, setSelectedR] = useState<string>("");

  const func = async (regionName: string) => {
    const apiKey = "3cc68d3216261b056230d71513da1450";
    const region = regions.find((mintaqa) => mintaqa.name === regionName);
    if (!region) return;

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${region.lat}&lon=${region.lon}&units=metric&appid=${apiKey}`
    );

    const viloyat = {
      name: region.name,
      temperature: res.data.main.temp,
      description: res.data.weather[0].description,
    };

    setDataJson([viloyat]);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionName = event.target.value;
    setSelectedR(regionName);
    func(regionName);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 via-gray-100 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center shadow-sm">
        O'zbekiston Viloyatlari Ob-Havo
      </h1>

      <div className="mb-6 text-center">
        <select
          value={selectedR}
          onChange={handleSelectChange}
          className="p-3 border-2 border-blue-500 text-blue-500 outline-none rounded-md shadow-md text-xl"
        >
          <option value="" disabled>
            Viloyatni tanlang
          </option>
          {regions.map((region) => (
            <option key={region.name} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[500px] mx-auto mt-20">
        {dataJson.map((value,index) => (
          <Cart
            key={index}
            name={value.name}
            temperature={value.temperature}
            description={value.description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
