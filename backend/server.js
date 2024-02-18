// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (pastikan Anda telah mengganti URL dengan URL MongoDB Anda)
mongoose.connect('mongodb://localhost:27017/complaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define mongoose schema
const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String
});

// Define mongoose model
const Complaint = mongoose.model('Complaint', complaintSchema);

// API endpoint untuk menyimpan data pengaduan
app.post('/api/complaints', (req, res) => {
  const { name, email, complaint } = req.body;

  // Buat instance Complaint baru
  const newComplaint = new Complaint({
    name,
    email,
    complaint
  });

  // Simpan data pengaduan ke database
  newComplaint.save()
    .then(() => res.json({ message: 'Complaint saved successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to save complaint', details: err }));
});

// Port tempat server berjalan
const PORT = process.env.PORT || 5000;

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
