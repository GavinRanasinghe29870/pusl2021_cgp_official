const express = require('express');
const router = express.Router();
const multer = require('multer');
const Club = require('../../models/clubs/Club.js');

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save files to the 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) // Unique filenames
});
const upload = multer({ storage });

// POST a new club
router.post('/register', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'photos', maxCount: 4 },
  { name: 'boardMemberImages', maxCount: 10 },
  { name: 'headCoachImage', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Logs the form data
    console.log('Uploaded Files:', req.files); // Logs the uploaded files

    const {
      clubName, location, description,
      boardMembers, headCoach, facilities, events, matchHistory, registrationFee
    } = req.body;

    const logoUrl = req.files?.logo?.[0]?.filename
      ? `/public/uploads/${req.files.logo[0].filename}`
      : null;

    const photoUrls = req.files?.photos?.map(photo => `/public/uploads/${photo.filename}`) || [];

    const headCoachImageUrl = req.files?.headCoachImage?.[0]?.filename
      ? `/public/uploads/${req.files.headCoachImage[0].filename}`
      : null;

    const boardMemberImages = req.files?.boardMemberImages?.map((file, index) => ({
      name: JSON.parse(boardMembers)[index]?.name || '',
      image: `/public/uploads/${file.filename}`,
    })) || [];

    const newClub = new Club({
      clubName,
      location,
      description,
      logo: logoUrl,
      photos: photoUrls,
      boardMembers: boardMemberImages,
      headCoach: {
        information: JSON.parse(headCoach).information,
        image: headCoachImageUrl
      },
      facilities,
      events: JSON.parse(events),
      matchHistory,
      registrationFee
    });

    console.log('New Club Object:', newClub);
    await newClub.save();
    console.log('Club saved successfully:', newClub); // Debugging saved club
    res.status(201).json({ message: 'Club registered successfully', logoUrl, photoUrls, headCoachImageUrl });
  } catch (error) {
    console.error('Error saving club:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/clubs/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST: Create a new club
router.post('/create', async (req, res) => {
  try {
    const { clubName, description, boardMembers, headCoach, events } = req.body;

    const newClub = new Club({
      clubName,
      description,
      boardMembers: boardMembers || [{ name: '' }], // Default to an empty array with one member
      headCoach: headCoach || { information: '' }, // Default to an empty object
      events: events || [''], // Default to an array with one empty string
    });

    await newClub.save();
    res.status(201).json({ message: 'Club created successfully', club: newClub });
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('clubName', clubData.clubName);
  formData.append('description', clubData.description);

  if (clubData.clubLogo) {
    formData.append('logo', clubData.clubLogo);
  }

  clubData.images.forEach((image) => {
    formData.append('photos', image);
  });

  try {
    const response = await axios.post('http://localhost:5000/api/club/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Club created successfully:', response.data);
    if (response.data.photoUrls) {
      setClubData({ ...clubData, images: response.data.photoUrls });
    }
  } catch (error) {
    console.error('Error creating club:', error);
  }
};

module.exports = router;
