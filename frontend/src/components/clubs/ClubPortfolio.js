import React from "react";

const ClubPortfolio = () => {
  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Club Logo */}
        <div style={styles.logoWrapper}>
          <img
            src="FC-Barcelona-Logo-PNG-Free-Download.png"
            alt="Club Logo"
            style={styles.logo}
          />
        </div>

        {/* Club Name & Location */}
        <h1 style={styles.clubName}>FC Barcelona</h1>
        <h3 style={styles.location}>Barcelona, Spain</h3>

        {/* Club Description */}
        <p style={styles.description}>
          FC Barcelona, often referred to as Barça, is one of the most successful football clubs in the world.
          Founded in 1899, the club is based in Barcelona, Spain, and is known for its attacking football and deep cultural roots.
          Over the years, the club has won multiple La Liga and UEFA Champions League titles, with legendary players like Messi, Xavi, and Iniesta.
          Their home ground, Camp Nou, is the largest stadium in Europe.
        </p>

        {/* Photo Gallery */}
        <h2 style={styles.sectionTitle}>Photo Gallery</h2>
        <div style={styles.gallery}>
          {galleryImages.map((src, index) => (
            <img key={index} src={src} alt={`Gallery ${index + 1}`} style={styles.galleryImage} />
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
          Camp Nou is the largest stadium in Europe with a capacity of over 99,000 spectators.
          FC Barcelona also has world-class training facilities at Ciutat Esportiva Joan Gamper,
          where players develop their skills from youth academy levels to professional football.
        </p>

        {/* Events */}
        <h2 style={styles.sectionTitle}>Events</h2>
        <ul style={styles.list}>
          <li>🔹 Barça vs Real Madrid – El Clásico (March 15, 2025)</li>
          <li>🔹 FC Barcelona Fan Meet-up – Camp Nou (April 5, 2025)</li>
          <li>🔹 Champions League Quarter-Finals – TBA</li>
        </ul>

        {/* Match History */}
        <h2 style={styles.sectionTitle}>Match History</h2>
        <ul style={styles.list}>
          <li>✅ Barcelona 3-1 Real Madrid (2024 La Liga)</li>
          <li>✅ Barcelona 2-0 PSG (2024 Champions League)</li>
          <li>❌ Barcelona 1-2 Manchester City (2023 UCL Semi-finals)</li>
        </ul>
      </div>
    </div>
  );
};

// Board Members
const boardMembers = [
  { name: "Joshua Mishal", image: "WhatsApp Image 2025-04-13 at 19.02.14_175dcf09.jpg" },
  { name: "Gavin Kisara", image: "WhatsApp Image 2025-04-13 at 19.02.14_3337ddfe.jpg" },
  { name: "Dulith Rajapaksha", image: "WhatsApp Image 2025-04-13 at 19.03.45_a7f7fd92.jpg" },
  { name: "Kavishka Sulochana", image: "WhatsApp Image 2025-04-13 at 19.02.13_b14ef2f2.jpg" },
  { name: "Udula Dissanake", image: "WhatsApp Image 2025-04-13 at 19.02.14_fccda847.jpg" },
  { name: "Ishara Sandaruwan", image: "Profile.jpg" }
];

// Head Coach
const headCoach = {
  name: "Xavi Hernández",
  image: "football-trainer-teaching-his-pupils.jpg",
  description: "Xavi Hernández is FC Barcelona's head coach as of 2025. Xavi, a famed former midfielder for the team, is renowned for his profound comprehension of Barça's trademark style of play, tiki-taka, which is a fast-paced, possession-based game. Since taking over as head coach in November 2021, he has worked to reassemble the team with youthful players while upholding the club's footballing ethos. Barcelona has sought to regain its previous level of dominance in both local and European competitions under his direction.",
};

// Photo Gallery Images
const galleryImages = [
  "/european-parliament-building-strasbourg-france-with-clear-blue-sky-background.jpg",
  "/colorful-seoul-floating-island.jpg",
  "/palace-communication-night-madrid-spain.jpg",
  "/sports-center.jpg"
  
];

// Styles
const styles = {
  pageBackground: {
    backgroundColor: "#BFDBFE", // Light blue sides
    padding: "40px 0"
  },
  container: {
    backgroundColor: "#FEF08A", // Yellow center
    textAlign: "center",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
    borderRadius: "12px"
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"
  },
  logo: {
    width: "120px"
  },
  clubName: {
    fontSize: "28px",
    fontWeight: "bold"
  },
  location: {
    fontSize: "18px",
    color: "#666"
  },
  description: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "20px"
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "30px",
    color: "#003366"
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px"
  },
  galleryImage: {
    width: "100%",
    borderRadius: "8px"
  },
  boardMembers: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  memberCard: {
    textAlign: "center",
    width: "140px",
    margin: "10px"
  },
  memberImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  memberName: {
    marginTop: "5px",
    fontSize: "14px"
  },
  coachSection: {
    display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginTop: "10px",
  textAlign: "center"
  },
  coachImage: {
    width: "200px",
  borderRadius: "10px",
  margin: "0 auto"
  },
  coachName: {
    fontWeight: "bold"
  },
  list: {
    listStyleType: "none",
    padding: "0",
    fontSize: "16px",
    color: "#444"
  }
};

export default ClubPortfolio;
