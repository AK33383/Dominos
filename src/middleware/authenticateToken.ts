import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  phoneNumber?: string;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const { phoneNumber } = decoded;
    const { phoneNumber: requestBodyPhoneNumber } = req.body;

    if (phoneNumber !== requestBodyPhoneNumber) {
      return res.status(401).json({ message: 'Phone number mismatch' });
    }

    // Store the decoded phone number in the request for future use
    req.phoneNumber = phoneNumber;

    next();
  });
};

export { authenticateToken };
