import express from 'express';
import { createYoga } from 'graphql-yoga';
import mongoose from 'mongoose';
import { config } from './config';
import { schema } from './graphql/schema';
import { Recipe } from './models/Recipe';

const app = express();

// Create GraphQL server
const yoga = createYoga({ schema });
app.use('/graphql', yoga);

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

app.listen(config.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${config.PORT}/graphql`);
});