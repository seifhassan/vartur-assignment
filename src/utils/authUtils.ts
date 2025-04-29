import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest,FastifyInstance } from 'fastify';


export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
export const authVerify = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (request.url.startsWith('/auth')) {
      return;
    }
    const authHeader = request.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      console.log("Authorization header missing");
      return reply.status(401).send({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
      console.log("Token is missing");
      return reply.status(401).send({ message: 'Token is missing' });
    }

    // Verify the JWT token
    await request.jwtVerify(); 

    console.log("Token verified successfully");

  } catch (error) {
    console.error("Token verification failed:", error);
    return reply.status(401).send({ message: 'Invalid or expired token' });
  }
};


