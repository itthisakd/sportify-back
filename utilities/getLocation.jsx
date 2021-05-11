// export default function getLocation() {
//   if ("geolocation" in navigator) {
//     console.log("Location available");
//   } else {
//     console.log("Location unavailable");
//   }

//   return navigator.geolocation.getCurrentPosition(function (position) {
//       return [position.coords.latitude, position.coords.longitude].join(",")
//   });
// }





//––––––––––––––––––––––––––USE AS STATE

// const [myLocation, setMyLocation] = React.useState("");

//   React.useEffect(() => {
//   if ("geolocation" in navigator) {
//     console.log("Location available");
//   } else {
//     console.log("Location unavailable");
//   }

//     navigator.geolocation.getCurrentPosition(function (position) {
//       setMyLocation(
//         [position.coords.latitude, position.coords.longitude].join(",")
//       );
//     });
//   }, [myLocation]);






// window.onload = async () => {
//   const getCoords = async () => {
//     const pos = await new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });

//     return {
//       long: pos.coords.longitude,
//       lat: pos.coords.latitude,
//     };
//   };

//   const coords = await getCoords();
// };