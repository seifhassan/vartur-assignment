import bcrypt from 'bcrypt';
import redis from '../plugins/redis';

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export const authVerify = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    
    if (!token) {
      return reply.status(401).send({ message: 'Token is missing' });
    }
    const decoded = await request.jwtVerify();
    
    const userData:any = await redis.get(`user_token:${decoded.id}`); 

    const parsedUserData = JSON.parse(userData);
   
    if (parsedUserData.role !== 'admin') {
      return reply.status(403).send({ message: 'Forbidden: You do not have admin privileges' });
    }


    return; 

  } catch (error) {
    console.error("Token verification failed:", error);
    return reply.status(401).send({ message: 'Invalid or expired token' });
  }
};



