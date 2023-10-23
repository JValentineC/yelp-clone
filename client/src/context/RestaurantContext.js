import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};


// import React, { useState, createContext } from "react";

// export const RestaurantContext = createContext();

// export const RestaurantContextProvider = (props) => {
//   const [restaurants, setRestaurants] = useState([]);
//   // const [restaurants, setRestaurants] = useState([]);

//   const addRestaurants = (restaurant) => {
//     // const addRestaurant = (restaurant) => {
//     // setRestaurants({ ...restaurants, restaurant });
//     setRestaurants([...restaurants, restaurant]);
//   };
//   return (
//     <RestaurantContext.Provider value={{ restaurants, setRestaurants, addRestaurants }}>
//  {/* <RestaurantContext.Provider value={{ restaurants, addRestaurant }}> */}
//       {props.children}
//     </RestaurantContext.Provider>
//   // </RestaurantContext.Provider>
//   );
// };