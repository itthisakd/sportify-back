export default function calcDistance(myLocation, yourLocation) {
    const a = +myLocation.split(",")[0];
    const b = +myLocation.split(",")[1];
    const x = +yourLocation.split(",")[0];
    const y = +yourLocation.split(",")[1];

    const distance = Math.ceil(
      Math.sqrt(((x - a) * 111.139) ** 2 + ((y - b) * 111.139) ** 2)
    );

    return distance;
  }

