Install Dependencies:
bash
Copy
npm install
Configure Environment Variables :
Create .env file:

env
Copy
DATABASE_URL="mysql://username:password@localhost:3306/vartur_db"
REDIS_URL="redis://localhost:6379"

JWT_SECRET="your_jwt_secret_key"
Prisma Setup
bash
Copy
npx prisma migrate dev --name init
npx prisma db seed
Run the Project
Development Mode
bash
Copy
npm run dev
Production Mode
bash
Copy
npm run build
npm start
Access Documentation
Visit: http://localhost:3000/docs for API documentation.

API Endpoints
POST /auth/login - Get a JWT token.

GET /categories - List categories.

GET /categories/:id - Get category by ID.

POST /categories - Create a category.

GET /products - List products.

POST /products - Create a product.

Access Documentation
API documentation is available at:

http://localhost:3000/docs

Visit this URL to explore the API's endpoints, request/response formats, and other useful information.

