import React from "react";

interface cartType {
    name: string;
    temperature: number;
    description: string;
}



const Cart: React.FC<cartType> = ({ name, temperature, description }) => (
    <div className="cursor-pointer border border-blue-300 bg-gradient-to-b from-white to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-2">{name}</h2>
        <p className="text-xl text-gray-700 font-medium">
            Temperature: <span className="text-blue-500">{temperature}°C</span>
        </p>
        <p className="text-sm text-gray-600 italic capitalize mt-2">{description}</p>
    </div>
);

export default Cart;
