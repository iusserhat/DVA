const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// NODE_ENV ayarla (geliştirme ortamı için)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Routes
const visaApplicationRoutes = require('./routes/visaApplicationRoutes');
const visaRoutes = require('./routes/visaRoutes');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');

// Load environment variables
dotenv.config();

// Gerekli dizinler
const publicDir = path.join(__dirname, '../public');
const uploadsDir = path.join(publicDir, 'uploads');
const uploadDirs = [
  path.join(uploadsDir, 'passport'), 
  path.join(uploadsDir, 'photo'), 
  path.join(uploadsDir, 'flight_ticket'), 
  path.join(uploadsDir, 'hotel_reservation'),
  path.join(uploadsDir, 'other')
];

// Dizinlerin varlığını kontrol et ve oluştur
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS ayarları
app.use(cors({
  origin: function(origin, callback) {
    // Tüm localhost portlarına izin ver
    if (!origin || origin.match(/http:\/\/localhost:[0-9]+/) || origin.match(/http:\/\/127.0.0.1:[0-9]+/)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 saat
}));

// Logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Express error handler:', err);
  res.status(500).json({
    error: err.message || 'Bir hata oluştu',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/visa-applications', visaApplicationRoutes);
app.use('/api/visas', visaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Dubai Vize API', env: process.env.NODE_ENV });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 