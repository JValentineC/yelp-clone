import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("default");
  const { addRestaurant } = useContext(RestaurantsContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <form className="container">
        <div className="row align-items-center">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              value={location}
              onInput={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="custom-select form-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="default" disabled>
                Price Range
              </option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-primary col-auto"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;






// import React, { useContext, useState } from "react";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import { RestaurantContext } from "../context/RestaurantContext";

// const AddRestaurant = () => {
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [priceRange, setPriceRange] = useState("Price Range");
//   const { addRestaurant } = useContext(RestaurantsContext);

  
  
//   const handleSubmit = async (e) => {
//       e.preventDefault();
//           try {
//               const response = await RestaurantFinder.post("/", {
//                   name,
//                   location,
//                   price_range: priceRange,
//                 });
//                 addRestaurant(response.data.data.restaurant);
//                 console.log(response);
//               } catch (err) {
//                 console.log(err)
//               }
//             };

            
//   return (
//     <div className="mb-4">
//       <form action="">
//         <div className="form-row">
//           <div className="col">
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               type="text"
//               className="form-control"
//               placeholder="name"
//             />
//           </div>
//           <div className="col">
//             <input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="form-control"
//               type="text"
//               placeholder="location"
//             />
//           </div>
//           <div className="col">
//             <select
//               value={priceRange}
//               onChange={(e) => setpriceRange(e.target.value)}
//               className="custom-select my-1 mr-sm-2"
//             >
//               <option disabled>Price Range</option>
//               <option value="1">$</option>
//               <option value="2">$$</option>
//               <option value="3">$$$</option>
//               <option value="4">$$$$</option>
//               <option value="5">$$$$$</option>
//             </select>
//           </div>
//           <button
//             onClick={handleSubmit}
//             type="submit"
//             className="btn btn-primary"
//           >
//             add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddRestaurant;
