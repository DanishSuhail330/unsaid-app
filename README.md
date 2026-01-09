# Unsaid

A minimal web application for anonymous thoughts. Write your thoughts anonymously and read what others have shared.

## Features

- **Write Page**: Share anonymous thoughts in a simple textarea
- **Read Page**: Browse all anonymous entries in a clean, calm layout
- **No Authentication**: Completely anonymous, no sign-up required
- **Simple & Minimal**: Focus on the content, nothing else

## Tech Stack

- **Next.js 14** (App Router) - React framework
- **Supabase** - Backend database
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed ([Download here](https://nodejs.org/))
- A Supabase account ([Sign up free](https://supabase.com))

## Setup Instructions

### Step 1: Clone or Download This Project

If you haven't already, make sure you have all the project files in a folder.

### Step 2: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Fill in your project details (name, database password, region)
   - Wait for the project to be created (takes a minute or two)

2. **Create the Database Table**
   - In your Supabase dashboard, click on "SQL Editor" in the left sidebar
   - Click "New Query"
   - Open the file `supabase-schema.sql` from this project
   - Copy and paste the entire contents into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)
   - You should see a success message

3. **Get Your API Credentials**
   - In Supabase dashboard, click on "Settings" (gear icon)
   - Click on "API" in the settings menu
   - You'll see two important values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public key** (a long string starting with `eyJ...`)

### Step 3: Configure Environment Variables

1. **Create `.env.local` file**
   - In the project root folder, create a new file called `.env.local`
   - Copy the contents from `env.example` into it

2. **Add Your Supabase Credentials**
   - Open `.env.local`
   - Replace `your-project-url-here` with your actual Supabase Project URL
   - Replace `your-anon-key-here` with your actual anon public key
   - Save the file

   Example:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all the required packages (Next.js, React, Supabase, Tailwind, etc.).

### Step 5: Run the Development Server

In the same terminal, run:

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

### Step 6: Open in Your Browser

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Write page! Try writing something and clicking "Leave it here", then navigate to the Read page to see your entry.

## Project Structure

```
unsaid/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Write page (home page)
│   └── read/
│       └── page.tsx         # Read page
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── supabase-schema.sql      # Database schema (run in Supabase)
├── env.example              # Environment variables template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## How It Works

1. **Write Page** (`app/page.tsx`):
   - User types in the textarea
   - On submit, the text is saved to Supabase database
   - User is redirected to the Read page

2. **Read Page** (`app/read/page.tsx`):
   - Fetches all entries from Supabase when the page loads
   - Displays them in a vertical list
   - Shows a soft time label for each entry

3. **Database** (`supabase-schema.sql`):
   - Single table called `entries` with three columns:
     - `id`: Unique identifier
     - `content`: The text content
     - `created_at`: Timestamp
   - Row Level Security (RLS) policies allow anonymous reads and writes

## Troubleshooting

**"Module not found" errors:**
- Make sure you ran `npm install` in the project folder

**"Invalid API key" or Supabase connection errors:**
- Double-check your `.env.local` file has the correct values
- Make sure there are no extra spaces or quotes around the values
- Restart your dev server after changing `.env.local`

**"relation 'entries' does not exist" error:**
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check that the table was created successfully

**Page shows blank or errors:**
- Check the browser console (F12) for error messages
- Check the terminal where `npm run dev` is running for errors

## Building for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

Or deploy to Vercel (recommended for Next.js):
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Notes

- All entries are completely anonymous - no user tracking
- Entries are stored permanently in Supabase
- The app uses Supabase's anonymous key, so no authentication is needed
- Row Level Security policies ensure anyone can read/write anonymously

## License

Free to use and modify as you like!
