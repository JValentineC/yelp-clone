import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsList from "../components/RestaurantsList";

const HomePage = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantsList />
    </div>
  );
};

export default HomePage;



// import React from "react";
// import Header from "../components/Header";
// import AddRestaurant from "../components/AddRestaurant";
// import RestaurantsList from "../components/RestaurantsList";

// const Home = () => {
//   return (
//     <div>
//       <Header />
//       <AddRestaurant />
//       <RestaurantsList />
//     </div>
//   );
// };

// export default Home;
