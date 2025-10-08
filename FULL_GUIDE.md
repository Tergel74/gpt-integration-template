# GPT Integration Template - Complete Guide 📚

> **This is the comprehensive documentation.** For a quick overview, see the main [README.md](./README.md)

**Turn your AI ideas into reality in minutes, not months.**

Building AI-powered applications used to take weeks of complex setup, authentication headaches, and endless configuration. Not anymore. This production-ready template gives you everything you need to create professional AI chat applications that your users will love.

Whether you're building a recipe creator, fitness coach, learning tutor, or the next big AI assistant, this template is your starting point. I've spent countless hours perfecting the architecture, security, and user experience so you can focus on what matters most - your unique AI solution.

**This template saves you 2-4 weeks of development time** by handling all the complex infrastructure, security, and integration work that every AI application needs.

![Application Overview](./docs/screenshots/start.png)
_Complete application foundation ready for customization_

## ✨ What Makes This Special

This isn't just another chat template. It's a complete foundation built with real-world experience and attention to detail that makes the difference between a weekend project and a professional application.

### 🎨 Clean Interface Foundation

The template features a simple, customizable design with a yellow accent theme that you can easily modify to match your brand. The interface is built with modern practices - responsive design, smooth interactions, and a clean layout that works well on both desktop and mobile. It's designed as a solid starting point that you can style to fit your specific needs.

![Authentication System](./docs/screenshots/auth.png)
_Secure authentication interface ready for customization_

### 🤖 AI Integration That Just Works

Forget spending days figuring out OpenAI integration. I've built a robust system using GPT-4o-mini with proper error handling, rate limiting, and message management. The template includes three distinct AI personalities (Friend, Mentor, Developer) that you can easily customize or extend with your own creations like recipe creators, fitness coaches, or specialized tutors.

![Chat Interface](./docs/screenshots/chat.png)
_Functional chat interface with all core features implemented_

### 🔐 Security You Can Trust

Security isn't an afterthought here. Every user only sees their own data thanks to Row Level Security policies. The admin system is built with proper authorization checks, and the debug tools automatically hide in production. I've learned these lessons the hard way so you don't have to.

### 📊 Smart Data Management

Your conversations matter, so they're automatically saved and organized in a PostgreSQL database. The schema is optimized for performance with proper indexing, and real-time sync ensures users never lose their chat history. Everything is designed to scale with your success.

### 🚀 Production Ready from Day One

This template has been tested in real-world conditions. Clean TypeScript throughout, comprehensive error handling, Docker support, and deployment guides for Vercel and other platforms. You can literally deploy this today and start serving customers.

## 🛠️ What's Under the Hood

I've chosen the best modern technologies to give you a solid foundation that will grow with your ideas:

**Next.js 15** powers the frontend with the latest App Router and React 19. **Supabase** handles authentication and database with PostgreSQL that scales automatically. **OpenAI GPT-4o-mini** provides the AI brain with optimized performance and cost. **Tailwind CSS 4** makes styling a breeze with the yellow theme. **TypeScript** keeps everything type-safe and **Zustand** manages state efficiently.

Everything works together seamlessly - no more hunting for compatible versions or dealing with integration headaches.

## 🚀 Get Started in 5 Minutes

Setting up your AI application should be exciting, not frustrating. I've made it as simple as possible:

### What You'll Need

Just three things to get started:

-   **Node.js 18+** installed on your computer
-   **A Supabase account** (free tier is perfect to start)
-   **An OpenAI API key** (you'll get $5 free credit when you sign up)

### 1. Extract and Install

```bash
# Extract the zip file you downloaded
# Navigate to the folder
cd gpt-integration-template

# Install dependencies
npm install
```

### 2. Set Up Your Environment

This is the only "configuration" step, and I've made it super simple:

```bash
# Copy the environment template
cp .env.example .env.local

# Open .env.local and add your keys:
# OPENAI_API_KEY=your_openai_key_here
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Your Database

Don't worry - this is easier than it sounds! Just follow these steps:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (takes 30 seconds)
2. **Go to the SQL Editor** in your Supabase dashboard
3. **Copy and paste** the entire `supabase/schema.sql` file and run it
4. **Make yourself an admin** by running this command with your email:

```sql
SELECT public.promote_user_to_admin_by_email('your-email@example.com');
```

### 4. Launch Your App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and **boom!** Your AI application is running. Sign up with the email you made admin, and you'll see the debug tools in the navbar.

## 🐛 The Debug Page - Your Development Best Friend

![Debug Tools](./docs/screenshots/debug.png)
_Comprehensive debugging and admin tools for development_

### Why I Built This

As a developer, I know how frustrating it can be to debug AI applications. Is the API call working? Are the prompts right? Is the user management functioning? Instead of console.logging everything, I built a comprehensive debug page that gives you complete visibility into your application.

### What You Get

The debug page at `/debug` is like having a control center for your AI app:

**🔬 Direct AI Testing** - Send messages directly to OpenAI without going through your UI. Perfect for testing new prompts or troubleshooting API issues.

**👥 Admin Management** - Promote users to admin status, manage permissions, and see who has access to what.

**🗃️ Database Tools** - Clear message history, inspect data, and understand how your application is storing information.

**🔍 API Debugging** - See exactly what's being sent to OpenAI and what comes back. No more guessing games.

### How to Access It

During development, it's simple:

1. **Start your app**: `npm run dev`
2. **Login as an admin** (remember that SQL command from setup?)
3. **Click the 🐛 Debug link** in the navbar, or visit `/debug` directly

The debug link only appears for admin users and only in development mode. I've styled it with red colors and a warning tooltip so you'll never forget to remove it before going live.

### Security Built In

Here's the cool part - I've built triple protection into this system:

1. **Environment Check**: Automatically returns 404 in production
2. **Authentication**: Must be logged in
3. **Admin Verification**: Only admin users can access

So even if you forget to remove the link (we've all been there), your production app is completely safe.

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

## 🚀 Going Live - Deploy Your AI App

### Vercel - The Easy Button

I recommend Vercel for deployment because it's specifically designed for Next.js applications. The integration is seamless:

1. **Connect your repository** to Vercel (they'll walk you through it)
2. **Add your environment variables** in the Vercel dashboard:
    - `OPENAI_API_KEY`
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Hit deploy** and watch the magic happen

Every time you push to your main branch, Vercel automatically deploys your changes. It's that simple.

```bash
# Or use the CLI if you prefer
npm install -g vercel
vercel --prod
```

### Docker - For Those Who Need It

Some companies require containerized deployments. I've got you covered with a production-ready Docker setup:

```bash
# Build and run with Docker
docker build -t gpt-template .
docker run -p 3000:3000 --env-file .env.local gpt-template

# Or use Docker Compose for easier management
docker-compose up -d
```

Check out `DOCKER_DEPLOYMENT.md` for detailed instructions and other deployment options like AWS, Railway, and DigitalOcean.

### 🚨 Before You Go Live

Remove the debug link from your navbar for a clean production interface:

```tsx
// In src/components/Navbar.tsx - remove this block:
{
    process.env.NODE_ENV === "development" && isAdmin && (
        <Link href="/debug" className="...">
            🐛 Debug
        </Link>
    );
}
```

The debug page automatically returns 404 in production, but removing the navbar link provides a cleaner UI.

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

Admin functions are available in the debug page for easy management.

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
-   Examine console logs for detailed error information
-   Use the admin panel in debug mode for user management

## 🎨 Extend Your Template

This template is designed to be easily extended. Here are some popular directions:

### Recipe Creator Platform

Add ingredient databases, nutrition calculations, and meal planning features.

### Fitness Coach App

Implement workout tracking, progress monitoring, and health assessments.

### Learning Platform

Create course management, progress tracking, and interactive quizzes.

### Business Assistant

Build customer support tools, lead qualification, and automated workflows.

The modular architecture makes it easy to add new features while maintaining the core functionality.

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
