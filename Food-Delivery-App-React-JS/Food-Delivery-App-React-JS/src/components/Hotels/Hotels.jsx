import React from "react";

const Hotels = ({ hotel, setHotel }) => {
  const hotelList = [
    {
      name: "Beige bake",
      image:
        "https://images.unsplash.com/photo-1721127325919-c2be885d9992?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "KFC",
      image:
        "https://images.unsplash.com/photo-1659671505618-10b2d9e2a4a6?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Joy",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max200/591467650.jpg?k=02290d3c0500f57dc17cb29963ec5dc13622a3cedec706e029dac8eb6d94f7ea&o=&hp=1",
    },
  ];

  return (
    <>
      <h1 className="text-dark my-4" id="hotels">Hotels</h1>
      <div className="d-flex flex-wrap  gap-4 mb-5" id="hotel-container">
        {hotelList.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setHotel((prev) => (prev === item.name ? "All" : item.name));
            }}
            className={`card p-2 text-center border-2 ${
              hotel === item.name ? "border-warning" : "border-light"
            }`}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="card-img-top"
              style={{
                height: "100px",
                objectFit: "cover",
                borderBottom: "2px solid #ddd",
              }}
            />
            <p className="mt-2 mb-0 fw-bold">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hotels;
