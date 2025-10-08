# GPT Integration Template 🤖

A production-ready, full-stack GPT integration template built with Next.js, Supabase, and OpenAI. This template provides everything you need to build and deploy AI-powered chat applications with enterprise-grade features.

## ✨ Features

### 🎨 Modern UI/UX

-   **Aesthetic Design**: Beautiful yellow-themed gradient backgrounds and glass-morphism effects
-   **Responsive Layout**: Works perfectly on desktop and mobile devices
-   **Smooth Animations**: Micro-interactions and transitions for better user experience
-   **Clean Interface**: Minimalist design focused on conversation flow

### 🤖 AI Integration

-   **OpenAI GPT-4o-mini**: Latest OpenAI models with optimized performance
-   **Multiple AI Modes**: Friend, Mentor, and Developer personalities with distinct behaviors
-   **Fully Extensible**: Easy to add custom AI personalities (recipe creator, fitness coach, tutor, etc.)
-   **Axios HTTP Client**: Robust error handling and request management
-   **Real-time Chat**: Seamless conversation flow with proper message ordering

### 🔐 Authentication & Security

-   **Supabase Auth**: Email/password authentication with secure session management
-   **Protected Routes**: Middleware-based route protection and access control
-   **Row Level Security**: Database-level security policies for data isolation
-   **Admin System**: Comprehensive admin functionality with user management
-   **Environment-based Protection**: Debug pages hidden in production builds

### 📊 Data Management

-   **Message Persistence**: All conversations automatically saved to PostgreSQL database
-   **User Profiles**: Complete user profile management with admin status tracking
-   **Real-time Sync**: Consistent data across all user sessions
-   **Database Schema**: Optimized tables with proper indexing and relationships

### 🚀 Production Ready

-   **Error Handling**: Comprehensive error handling with user-friendly messages
-   **Type Safety**: Full TypeScript implementation with strict type checking
-   **Performance Optimized**: Built for speed and scalability
-   **Docker Support**: Ready for containerized deployment
-   **Build Optimization**: Next.js 15 with latest optimizations

## 🛠️ Tech Stack

-   **Framework**: Next.js 15 with App Router and React 19
-   **Authentication**: Supabase Auth with Row Level Security
-   **Database**: PostgreSQL (Supabase) with optimized schema
-   **AI**: OpenAI GPT-4o-mini with axios integration
-   **Styling**: Tailwind CSS 4 with custom yellow theme
-   **State Management**: Zustand for efficient state handling
-   **Language**: TypeScript with strict type checking
-   **HTTP Client**: Axios with interceptors and error handling
-   **Deployment**: Docker ready with security optimizations

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Supabase account
-   OpenAI API key

### 1. Clone & Install

```bash
git clone <gpt-integration-template>
cd gpt-integration-template
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values:
# - OPENAI_API_KEY=your_openai_key
# - NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Create a new Supabase project
2. Go to SQL Editor in Supabase Dashboard
3. Run the complete `supabase/schema.sql` file
4. Set up your first admin user:

```sql
SELECT public.promote_user_to_admin_by_email('your-email@example.com');
```

### 4. Run Development Server

```bash
npm run dev
# Visit http://localhost:3000
```

## 🐛 Debug Page Access (Development Only)

### What is the Debug Page?

The debug page (`/debug`) is a powerful developer tool that provides:

-   **Direct AI Testing**: Test OpenAI API calls without UI
-   **Admin Panel**: Manage user permissions and admin status
-   **Database Tools**: Clear messages and inspect data
-   **API Debugging**: View request/response details

### How to Access Debug Page

**During Development:**

1. Start the development server: `npm run dev`
2. Login as an admin user
3. **Option 1**: Visit `http://localhost:3000/debug` directly
4. **Option 2**: Click the 🐛 Debug link in the navbar (visible to admin users only)

**Debug Link Features:**

-   ✅ Only visible in development mode (`NODE_ENV=development`)
-   ✅ Only visible to admin users (`is_admin=true`)
-   ✅ Red styling with warning tooltip about deployment removal
-   ✅ Automatically hidden in production builds

**Setting Up Admin Access:**

1. Sign up for an account in your app
2. Run this SQL in Supabase:

```sql
SELECT public.promote_user_to_admin_by_email('your-email@example.com');
```

3. Refresh and the debug link will appear in the navbar

### ⚠️ Important Security Notes

-   **Production Safety**: Debug page automatically returns 404 in production builds
-   **Admin Only**: Only users with `is_admin = true` can access
-   **Remember to Hide**: Remove debug links from navbar before deployment
-   **Triple Protection**: Environment check → Authentication → Admin verification

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── api/chat/          # OpenAI API integration
│   ├── chat/              # Main chat interface
│   ├── debug/             # Admin debug tools (dev-only)
│   └── login/             # Authentication pages
├── components/            # Reusable React components
│   ├── AdminPanel.tsx     # Admin user management
│   ├── ChatBubble.tsx     # Message display
│   ├── ChatInput.tsx      # Message input
│   ├── Navbar.tsx         # Navigation with mode selector
│   └── Protected.tsx      # Route protection
├── lib/                   # Utility libraries
│   ├── admin.ts           # Admin management functions
│   ├── axios.ts           # HTTP client configuration
│   ├── openai.ts          # OpenAI client setup
│   └── supabase.ts        # Supabase client
├── store/                 # State management
│   └── chat.ts            # Chat state with Zustand
├── styles/                # Global styles
└── types/                 # TypeScript definitions
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your app:

1. **Connect GitHub**: Link your repository to Vercel
2. **Set Environment Variables**: Add your keys in Vercel dashboard:
    - `OPENAI_API_KEY`
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy**: Automatic deployment on every git push

```bash
# Optional: Deploy via CLI
npm install -g vercel
vercel --prod
```

### Docker (Optional)

If you need containerized deployment, I've included a simple Docker configuration:

```bash
# Build and run with Docker
docker build -t gpt-template .
docker run -p 3000:3000 --env-file .env.local gpt-template

# Or use Docker Compose
docker-compose up -d
```

See `DOCKER_DEPLOYMENT.md` for detailed Docker instructions and other deployment options.

### ⚠️ Before Deployment

**CRITICAL**: Before deploying to production:

1. **Remove Debug Link**: Comment out or remove the debug link in `src/components/Navbar.tsx`:

```tsx
{
    /* Remove this entire block before deployment */
}
{
    process.env.NODE_ENV === "development" && isAdmin && (
        <Link href="/debug" className="...">
            🐛 Debug
        </Link>
    );
}
```

2. **Verify Environment**: The debug page automatically returns 404 in production, but removing the navbar link provides a cleaner UI.

3. **Security Check**: Ensure all environment variables are properly set for production.

The debug page has triple protection (environment → authentication → admin), but removing the UI link is recommended for professional deployment.

## 🎛️ Configuration

### AI Modes

Customize the AI personalities in `src/app/api/chat/route.ts`:

```typescript
const systemPrompts: Record<string, string> = {
    friend: "You are a friendly, casual AI assistant...",
    mentor: "You are a wise mentor providing guidance...",
    developer: "You are a senior developer helping with code...",
    // Add your own custom modes:
    chef: "You are a creative chef who helps create amazing recipes...",
    coach: "You are a motivational fitness and life coach...",
    tutor: "You are a patient tutor helping with learning...",
};
```

**Easy to extend with custom modes for specific use cases:**

-   Recipe Creator & Cooking Assistant
-   Fitness Coach & Meal Planner
-   Study Tutor & Learning Guide
-   Business Advisor & Strategy Helper
-   Creative Writing Assistant

### Rate Limiting & Security

-   Built-in rate limiting to prevent abuse
-   Row Level Security (RLS) for data protection
-   Admin system with proper authorization
-   Environment-based debug page protection

## 🔐 Admin System

### Setting Up Admin Users

1. Sign up for an account in your app
2. Run this SQL in your Supabase SQL Editor:

```sql
SELECT public.promote_user_to_admin_by_email('your-email@example.com');
```

3. Admin users can:
    - Access the debug page (`/debug`)
    - Promote other users to admin
    - Use admin tools for testing and management

### Admin Functions

-   `isCurrentUserAdmin()` - Check admin status
-   `promoteUserToAdmin(email)` - Promote users
-   `setUserAdminStatus(userId, boolean)` - Manage admin rights

See `ADMIN_SETUP.md` for complete admin documentation.

## 🐛 Troubleshooting

### Common Issues

**OpenAI API Errors:**

-   Verify your API key is valid and has credits
-   Check the model name in your configuration
-   Monitor rate limits on your OpenAI dashboard

**Supabase Connection:**

-   Confirm your project URL and keys are correct
-   Ensure RLS policies are properly set up
-   Verify the database schema is installed

**Authentication Issues:**

-   Check Supabase Auth configuration
-   Verify redirect URLs in Supabase dashboard
-   Ensure middleware is properly configured

### Getting Help

-   Check the debug page (`/debug`) for API testing
-   Review the admin setup guide (`ADMIN_SETUP.md`)
-   Examine console logs for detailed error information

## 🎨 Build Your Own AI Solutions

This template is designed to be your foundation for creating unique AI-powered applications. You can extend it in countless ways to build specialized solutions:

### 🍳 Recipe Creator & Cooking Assistant

Transform this into a culinary AI platform:

-   **Recipe Generation**: AI creates recipes based on ingredients, dietary restrictions, or cuisine preferences
-   **Meal Planning**: Weekly meal plans with shopping lists
-   **Cooking Instructions**: Step-by-step guidance with tips and techniques
-   **Nutritional Analysis**: Calorie counting and macro breakdowns
-   **Wine Pairing**: Suggest beverages that complement dishes

```typescript
// Example: Recipe Creator Mode
chef: `You are a world-class chef and recipe creator. Help users:
- Create recipes from available ingredients
- Suggest meal plans for dietary needs
- Provide detailed cooking instructions
- Recommend ingredient substitutions
- Calculate nutritional information`;
```

### 💡 Other AI Solution Ideas

**📚 Educational Platforms:**

-   Language Learning Tutor
-   Code Learning Assistant
-   Study Guide Generator
-   Homework Helper

**💼 Business Applications:**

-   Customer Support Chatbot
-   Sales Lead Qualifier
-   Meeting Notes Summarizer
-   Content Strategy Advisor

**🏋️ Health & Wellness:**

-   Fitness Coach & Workout Planner
-   Mental Health Support Bot
-   Meditation Guide
-   Sleep Improvement Assistant

**✍️ Creative Tools:**

-   Story Writing Assistant
-   Poetry Generator
-   Social Media Content Creator
-   Blog Post Outliner

**🏠 Specialized Assistants:**

-   Home Improvement Advisor
-   Garden Planning Assistant
-   Travel Itinerary Creator
-   Financial Planning Helper

### 🛠️ How to Extend the Template

1. **Add Custom AI Modes**: Create specialized personalities in the API route
2. **Enhance Database Schema**: Add tables for your specific data needs
3. **Build Custom Components**: Create UI elements for your unique features
4. **Integrate APIs**: Connect to external services (weather, maps, payment, etc.)
5. **Add File Uploads**: Enable image, document, or voice input
6. **Create Workflows**: Multi-step AI interactions for complex tasks

### 🚀 From Template to Product

This template provides:

-   ✅ **Solid Foundation**: Authentication, database, AI integration
-   ✅ **Scalable Architecture**: Built for growth and customization
-   ✅ **Modern Tech Stack**: Latest frameworks and best practices
-   ✅ **Production Ready**: Security, error handling, deployment

**Your role**: Add domain-specific logic, custom UI, and unique value propositions to create something amazing!

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Supabase Documentation](https://supabase.com/docs)
-   [OpenAI API Documentation](https://platform.openai.com/docs)
-   [Tailwind CSS](https://tailwindcss.com/docs)

---

🚀 **Ready for production!** This template saves weeks of development time and provides enterprise-grade features out of the box.

🎯 **Your canvas for AI innovation** - Build recipe creators, fitness coaches, learning tutors, business advisors, or any AI-powered solution you can imagine. The foundation is ready, your creativity sets the limits!
