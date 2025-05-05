const express = require('express');
const router = express.Router();
const multer = require('multer');
const Clubuser = require('../../models/clubs/Clubuser.js'); // Use Clubuser model

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save files to the 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) // Unique filenames
});
const upload = multer({ storage });

// POST a new club user
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
      _id,ClubName, location, description, boardMembers, headCoach, facilities, events, matchHistory, registrationFee
    } = req.body;

    const logoUrl = req.files?.logo?.[0]?.filename
      ? `/public/uploads/${req.files.logo[0].filename}`
      : null;

    const photoUrls = req.files?.photos?.map(photo => `/public/uploads/${photo.filename}`) || [];

    const headCoachImageUrl = req.files?.headCoachImage?.[0]?.filename
      ? `/public/uploads/${req.files.headCoachImage[0].filename}`
      : null;

    const boardMemberImages = req.files?.boardMemberImages?.map((file, index) => ({
      name: JSON.parse(boardMembers || '[]')[index]?.name || '',
      image: `/public/uploads/${file.filename}`,
    })) || [];

    const newClubUser = new Clubuser({
      ClubName,
      location: location || '', // Default to empty string if not provided
      description: description || '', // Default to empty string if not provided
      logo: logoUrl,
      photos: photoUrls,
      boardMembers: boardMemberImages,
      headCoach: {
        information: JSON.parse(headCoach || '{}').information || '', // Default to empty string
        image: headCoachImageUrl || '' // Default to empty string
      },
      facilities: JSON.parse(facilities || '[]'), // Default to empty array
      events: JSON.parse(events || '[]'), // Default to empty array
      matchHistory: matchHistory || '', // Default to empty string
      registrationFee: registrationFee || '' // Default to empty string
    });

    console.log('New Club User Object:', newClubUser); // Debugging saved object
    //await newClubUser.save({_id:_id});
    Clubuser.findById(_id).then((existingUser) => {
      existingUser.location = location;
      existingUser.description = description;
      existingUser.logo = logoUrl;
      existingUser.photos = photoUrls;
      existingUser.boardMembers = boardMemberImages;
      existingUser.headCoach.information = JSON.parse(headCoach || '{}').information || '';
      existingUser.headCoach.image = headCoachImageUrl || '';
      existingUser.facilities = JSON.parse(facilities || '[]');
      existingUser.events = JSON.parse(events || '[]');
      existingUser.matchHistory = matchHistory || '';
      existingUser.registrationFee = registrationFee || '';
      existingUser.save();
    })
    console.log('Club user saved successfully:', newClubUser);
    res.status(201).json({ message: 'Club user registered successfully', id: newClubUser._id });
  } catch (error) {
    console.error('Error saving club user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a club user by ID
router.get('/clubs/:id', async (req, res) => {
  try {
    const clubUser = await Clubuser.findById(req.params.id);
    res.json(clubUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
