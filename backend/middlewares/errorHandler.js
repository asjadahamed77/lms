export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    if (err.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'Duplicate entry' });
    }
    
    res.status(500).json({ error: 'Something went wrong!' });
  }