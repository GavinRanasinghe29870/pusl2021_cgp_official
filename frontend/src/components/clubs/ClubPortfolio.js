import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// function App() {
//   return (
   
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<ClubInfo />} />
//           <Route path="/board-members" element={<BoardMembers />} />
//           <Route path="/coaches" element={<Coaches />} />
//           <Route path="/membership" element={<Membership />} />
//           <Route path="/enrollment" element={<Enrollment />} />
//           <Route path="/facilities" element={<Facilities />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/matches" element={<Matches />} />
//           <Route path="/media-gallery" element={<MediaGallery />} />
//         </Routes>
//       </div>
   
//   );
// }

// function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4 text-white flex justify-between">
//       <h1 className="text-xl font-bold">Club Name</h1>
//       <ul className="flex space-x-4">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/board-members">Board Members</Link></li>
//         <li><Link to="/coaches">Coaches</Link></li>
//         <li><Link to="/membership">Membership</Link></li>
//         <li><Link to="/enrollment">Enrollment</Link></li>
//         <li><Link to="/facilities">Facilities</Link></li>
//         <li><Link to="/events">Events</Link></li>
//         <li><Link to="/matches">Matches</Link></li>
//         <li><Link to="/media-gallery">Gallery</Link></li>
//       </ul>
//     </nav>
//   );
// }

const ClubPortfolio = () => {
  return (
    <div style={styles.container}>
      {/* Club Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
        alt="Club Logo"
        style={styles.logo}
      />

      {/* Club Name & Location */}
      <h1 style={styles.clubName}>FC Barcelona</h1>
      <h3 style={styles.location}>Barcelona, Spain</h3>

      {/* Club Description */}
      <p style={styles.description}>
        FC Barcelona, often referred to as Barça, is one of the most successful football clubs in the world. 
        Founded in 1899, the club is based in Barcelona, Spain, and is known for its attacking football and deep cultural roots. 
        Over the years, the club has won multiple La Liga and UEFA Champions League titles, with legendary players like Messi, Xavi, and Iniesta. 
        Their home ground, *Camp Nou*, is the largest stadium in Europe.
      </p>

      {/* Photo Gallery */}
      <h2 style={styles.sectionTitle}>Photo Gallery</h2>
      <div style={styles.gallery}>
        {galleryImages.map((src, index) => (
          <img key={index} src={src} alt="Gallery" style={styles.galleryImage} />
        ))}
      </div>

      {/* Top Board Members */}
      <h2 style={styles.sectionTitle}>Top Board Members</h2>
      <div style={styles.boardMembers}>
        {boardMembers.map((member, index) => (
          <div key={index} style={styles.memberCard}>
            <img src={member.image} alt={member.name} style={styles.memberImage} />
            <p style={styles.memberName}>{member.name}</p>
          </div>
        ))}
      </div>

      {/* Head Coach */}
      <h2 style={styles.sectionTitle}>Head Coach</h2>
      <div style={styles.coachSection}>
        <img src={headCoach.image} alt={headCoach.name} style={styles.coachImage} />
        <div>
          <h3 style={styles.coachName}>{headCoach.name} <span>(Head Coach)</span></h3>
          <p>{headCoach.description}</p>
        </div>
      </div>

      {/* Facilities */}
      <h2 style={styles.sectionTitle}>Facilities</h2>
      <p style={styles.description}>
        *Camp Nou* is the largest stadium in Europe with a capacity of over 99,000 spectators. 
        FC Barcelona also has *world-class training facilities* at Ciutat Esportiva Joan Gamper, 
        where players develop their skills from youth academy levels to professional football.
      </p>

      {/* Events */}
      <h2 style={styles.sectionTitle}>Events</h2>
      <ul style={styles.list}>
        <li>🔹 Barça vs Real Madrid – *El Clásico* (March 15, 2025)</li>
        <li>🔹 FC Barcelona Fan Meet-up – *Camp Nou* (April 5, 2025)</li>
        <li>🔹 Champions League Quarter-Finals – *TBA*</li>
      </ul>

      {/* Match History */}
      <h2 style={styles.sectionTitle}>Match History</h2>
      <ul style={styles.list}>
        <li>✅ Barcelona *3-1* Real Madrid (2024 La Liga)</li>
        <li>✅ Barcelona *2-0* PSG (2024 Champions League)</li>
        <li>❌ Barcelona *1-2* Manchester City (2023 UCL Semi-finals)</li>
      </ul>
    </div>
  );
};

// Data for Board Members
const boardMembers = [
  { name: "Joan Laporta", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Joan_Laporta_FC_Barcelona.jpg" },
  { name: "Rafael Yuste", image: "https://www.fcbarcelona.com/photo-resources/2022/05/18/36c07e2a-b191-4be1-82e5-8287e0f57a8b/Rafel_Yuste.jpg" },
  { name: "Mateu Alemany", image: "https://www.fcbarcelona.com/photo-resources/2022/04/01/f9f3032d-cd51-401e-a5ae-2ea927af9b2f/Mateu_Alemany.jpg" },
  { name: "Xavi Puig", image: "https://www.fcbarcelona.com/photo-resources/2022/05/18/1b4d2830-12a6-4d42-849d-8572d7e7e1d7/Xavi_Puig.jpg" },
  { name: "Josep Cubells", image: "https://www.fcbarcelona.com/photo-resources/2022/05/18/61dcb011-7926-4e10-8f55-92f898217d4b/Josep_Cubells.jpg" },
  { name: "Elena Fort", image: "https://www.fcbarcelona.com/photo-resources/2022/05/18/847450c6-41d8-4c6b-88ea-b01e2523a3f3/Elena_Fort.jpg" }
];

// Head Coach
const headCoach = {
  name: "Xavi Hernández",
  image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Xavi_Hernandez_2022.jpg",
  description:
    "Xavi Hernández is the current head coach of FC Barcelona. A legendary midfielder, Xavi won multiple La Liga and UEFA Champions League titles as a player and now leads the club with a vision of attacking football and tactical discipline.",
};

// Photo Gallery
const galleryImages = [
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/Barca_UCL_Celebration_2015.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/13/Messi_Celebrating_Goal_for_Barcelona.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Barcelona_Fans_Camp_Nou.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/FC_Barcelona_Champions_League_Winners_2009.jpg"
];

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto",justifyContent: "center", alignItems: "center" },
  logo: { width: "120px",display:"flex", justifyContent:"center",alignItems:"center"},
  clubName: { fontSize: "28px", fontWeight: "bold" },
  location: { fontSize: "18px", color: "#666" },
  description: { fontSize: "16px", color: "#444", marginBottom: "20px" },
  sectionTitle: { fontSize: "22px", fontWeight: "bold", marginTop: "30px", color: "#003366" },
  gallery: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "10px" },
  galleryImage: { width: "100%", borderRadius: "8px" },
  boardMembers: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" },
  memberCard: { textAlign: "center" },
  memberImage: { width: "80px", height: "80px", borderRadius: "50%" },
  memberName: { marginTop: "5px", fontSize: "14px" },
  coachSection: { display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "10px" },
  coachImage: { width: "120px", borderRadius: "10px" },
  list: { listStyleType: "none", padding: "0", fontSize: "16px", color: "#444" }
};

export default ClubPortfolio;