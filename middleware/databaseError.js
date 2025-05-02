const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).json({ message: 'Role name already exists (from database constraint)' });
    }
  
    res.status(500).json({ message: 'Something went wrong' });
  };
  
  module.exports = errorHandler;