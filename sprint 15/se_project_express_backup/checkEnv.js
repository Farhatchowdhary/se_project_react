import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env from the current folder
dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log("ENV file path:", path.join(process.cwd(), '.env'));
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);
