// import React from "react";
// import { FutsalCard } from "../futsalcard/FutsalCard";
// import { FutsalHeroSection } from "../futsalcard/FutsalHeroSection";
// import { Tagline } from "../futsalcard/Tagline";
// import f1 from "../assets/f1.jpg";
// import f2 from "../assets/f2.jpg";
// import f3 from "../assets/f3.jpg";
// import f4 from "../assets/f4.jpg";
// import f5 from "../assets/f5.jpg";
// import f6 from "../assets/f6.jpg";
// import f7 from "../assets/f7.jpg";
// import f8 from "../assets/f8.jpg";
// import f9 from "../assets/f9.jpg";
// import f10 from "../assets/f10.jpg";
// import f11 from "../assets/f11.jpg";

// // List of all futsal venues
// const futsalVenues = [
//   {
//     name: "PLANAT FUTSAL",
//     location: "Itahari",
//     imageUrl: f1,
//     price: 1200,
//   },
//   {
//     name: "ARENA FUTSAL",
//     location: "Biratchock",
//     imageUrl: f2,
//     price: 1500,
//   },
//   {
//     name: "SPORTHUB FUTSAL",
//     location: "Biratnagar",
//     imageUrl: f3,
//     price: 1100,
//   },
//   {
//     name: "SD FUTSAL",
//     location: "Itahari",
//     imageUrl: f1,
//     price: 1200,
//   },
//   {
//     name: "PREMIER FUTSAL",
//     location: "Dharan",
//     imageUrl: f4,
//     price: 1300,
//   },
//   {
//     name: "GOAL ZONE FUTSAL",
//     location: "Kathmandu",
//     imageUrl: f5,
//     price: 1200,
//   },
//   {
//     name: "PREMIER FUTSAL",
//     location: "Dharan",
//     imageUrl: f2,
//     price: 1300,
//   },
//   {
//     name: "NOEXCUSE FUTSAL",
//     location: "Biratnagar",
//     imageUrl: f10,
//     price: 1100,
//   },
//   {
//     name: "ARENA NEPAL",
//     location: "Biratnagar",
//     imageUrl: f5,
//     price: 1100,

    
//   },
//   {
//     name: "VAKUNDO KHEL",
//     location: "Biratnagar",
//     imageUrl: f7,
//     price: 1100,
//   },
//   {
//     name: "ASHIM FUTSAL",
//     location: "Biratnagar",
//     imageUrl: f8,
//     price: 1000,
//   },
//   {
//     name: "SUJAN FUTSAL",
//     location: "Biratnagar",
//     imageUrl: f9,
//     price: 1000,
//   },
// ];

// // Simulating user login location (for example, Biratnagar)
// const userLocation = "Biratnagar";

// export default function FutsalCardPage() {
//   // Filter futsal venues based on the user's location for the second section
//   const filteredVenues = futsalVenues.filter(
//     (venue) => venue.location === userLocation
//   );

//   return (
//     <main className="bg-gradient-to-b from-gray-100 to-white py-24">
//       <FutsalHeroSection />
//       <Tagline />


//       {/*  Show futsal venues based on the user's location */}
//       <section className="mx-auto max-w-7xl px-4 py-12">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
//           Explore Futsal Venues in {userLocation}
//         </h2>
//         <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
//           {filteredVenues.length > 0 ? (
//             filteredVenues.map((venue) => (
//               <FutsalCard
//                 key={venue.name}
//                 name={venue.name}
//                 location={venue.location}
//                 imageUrl={venue.imageUrl}
//                 price={venue.price}
//               />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No futsal venues found in your location.
//             </p>
//           )}
//         </div>
//       </section>

//       {/*Show all futsal venues */}
//       <section className="mx-auto max-w-7xl px-4 py-12">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
//           Explore All Futsal Venues
//         </h2>
//         <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
//           {futsalVenues.map((venue) => (
//             <FutsalCard
//               key={venue.name}
//               name={venue.name}
//               location={venue.location}
//               imageUrl={venue.imageUrl}
//               price={venue.price}

//             />
//           ))}
//         </div>
//       </section>

      
//     </main>
//   );
// }