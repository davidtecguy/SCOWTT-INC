# Movie Facts App

A Next.js web application that allows users to sign in with Google Auth, save their favorite movie, and discover interesting facts about it using OpenAI's API.

## Features

- 🔐 **Google Authentication** - Secure sign-in using Google OAuth
- 👤 **User Profile** - Display user's name, email, and profile photo
- 🎬 **Favorite Movie Storage** - Save and manage your favorite movie
- 🤖 **AI-Powered Facts** - Generate interesting facts about your favorite movie using OpenAI
- 🔄 **Dynamic Content** - Get new facts every time you refresh or request
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🗄️ **Database Integration** - PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Ready for Vercel/Netlify

## Prerequisites

Before running this application, you need:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **Google OAuth** credentials
4. **OpenAI API** key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd movie-facts-app
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/movie_facts_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

### 3. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database: `createdb movie_facts_db`
3. Update the DATABASE_URL in your `.env.local`

#### Option B: Cloud Database (Recommended)
Use a service like:
- [Supabase](https://supabase.com) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)
- [Railway](https://railway.app) (Free tier available)

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local`

### 5. OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the API key to your `.env.local`

### 6. Database Migration

Generate and push the database schema:

```bash
npx prisma generate
npx prisma db push
```

### 7. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Sign In**: Click "Sign in with Google" to authenticate
2. **Set Favorite Movie**: First-time users will be prompted to enter their favorite movie
3. **View Facts**: Once logged in, you'll see interesting facts about your favorite movie
4. **Refresh Facts**: Click "New Fact" to get a different interesting fact
5. **Logout**: Use the logout button to sign out

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── movie-fact/    # OpenAI integration
│   │   └── user/          # User data management
│   ├── dashboard/         # Main dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers/         # Context providers
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/                # Database schema
├── types/                 # TypeScript declarations
└── public/                # Static assets
```

## API Endpoints

- `GET /api/user/favorite-movie` - Get user's favorite movie
- `POST /api/user/favorite-movie` - Save user's favorite movie
- `POST /api/movie-fact` - Generate movie fact using OpenAI

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your DATABASE_URL is correct and the database is accessible
2. **Google OAuth**: Verify redirect URIs match your deployment URL
3. **OpenAI API**: Check your API key and billing status
4. **Environment Variables**: Ensure all required variables are set in production

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure the database is running and accessible
4. Check that all API keys are valid

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
