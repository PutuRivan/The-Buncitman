import React, { useState } from "react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("Coffee Beans");

  return (
    <div className="flex justify-center">
      <select
        className="border px-4 py-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="Coffee Beans">Coffee Beans</option>
        <option value="Coffee Drinks">Coffee Drinks</option>
      </select>
    </div>
  );
};

export default Shop;
