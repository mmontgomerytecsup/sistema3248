import React from "react";
import './Nosotros.css';

function Nosotros() {
  // Dummy data for the cards
  const cardData = [
    {
      id: 1,
      imageSrc: "http://wildcat.games/test/wow.png", // Replace with actual image URL
      title: "World of Warcraft",
      description: "49.99$"
    },
    {
      id: 2,
      imageSrc: "http://wildcat.games/test/civ6.jpg", // Replace with actual image URL
      title: "Civilization 6",
      description: "159.99$"
    },
    {
      id: 3,
      imageSrc: "http://wildcat.games/test/ck3.png", // Replace with actual image URL
      title: "Crusader Kings 3",
      description: "59.99$"
    },
    {
      id: 4,
      imageSrc: "http://wildcat.games/test/rl.jpg", // Replace with actual image URL
      title: "Rocket League",
      description: "19.99$"
    },
  ];

  return (
    <>      
      <section id="nosotros" className="padded">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {cardData.map((card) => (
              <div className="col" key={card.id}>
                <div className="card h-100">
                  <img src={card.imageSrc} className="card-img-top" alt={card.title} />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.description}</p>
                    <button className="btn btn-primary recolor">Shop Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
