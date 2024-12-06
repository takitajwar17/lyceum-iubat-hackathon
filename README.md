# Lyceum - Your Interactive Learning Platform

Lyceum is a modern educational platform built with Next.js, designed to provide an immersive and structured learning experience for aspiring developers. Named after Aristotle's ancient school, Lyceum combines traditional learning principles with modern technology to create an engaging educational journey.

## 🚀 Features

### Dashboard
- Your personal Lyceum learning hub
- Track progress across different learning paths
- View completed quests and achievements
- Monitor learning statistics and performance metrics
- Access quick links to ongoing courses and roadmaps

### Learning Platform
- Interactive coding lessons and tutorials
- Step-by-step learning paths for different technologies
- Progress tracking and skill assessment
- Hands-on coding exercises and examples
- Rich multimedia content with code snippets and explanations

### Roadmaps
- Structured learning paths for different technologies
- Visual progression tracking
- Milestone-based learning objectives
- Prerequisites and skill dependencies mapped
- Customized learning recommendations

### Quest System
- Gamified learning challenges
- Practical coding exercises
- Real-world project implementations
- Achievement badges and rewards
- Skill-based progression system

### AI Assistant
- Intelligent learning support
- Code explanation and debugging help
- Personalized learning recommendations
- Interactive problem-solving guidance
- Quick answers to programming questions

### Authentication
- Secure user authentication powered by Clerk
- User profile management
- Role-based access control
- Secure session handling
- Social login integration

## 📁 Project Structure

```
├── app/
│   ├── admin/         # Admin panel components
│   ├── api/          # API routes
│   ├── components/   # Reusable UI components
│   ├── dashboard/    # User dashboard
│   ├── learn/        # Learning platform
│   ├── quests/       # Quest system
│   ├── roadmaps/     # Learning roadmaps
│   └── layout.jsx    # Root layout component
├── lib/             # Utility functions and actions
├── public/          # Static assets
└── components/      # Shared components
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Chakra UI
  - Framer Motion
- **Database**: MongoDB with Mongoose
- **Code Editor**: Monaco Editor
- **Markdown**: React Markdown with GFM
- **Analytics**: Vercel Analytics & Speed Insights

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with necessary credentials:
- Clerk authentication keys
- MongoDB connection string
- Other API keys

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🔑 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGODB_URI`
- Other service-specific keys

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📜 License

This project is licensed under the MIT License.
