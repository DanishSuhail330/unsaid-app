/**
 * Supabase Database Schema for Unsaid
 * 
 * This SQL file creates the table needed for storing anonymous entries.
 * Run this in your Supabase SQL Editor.
 * 
 * Instructions:
 * 1. Go to your Supabase project dashboard
 * 2. Click on "SQL Editor" in the left sidebar
 * 3. Paste this entire file into the editor
 * 4. Click "Run" to execute
 */

-- Create the entries table
-- This table stores anonymous thoughts submitted by users
CREATE TABLE IF NOT EXISTS entries (
  -- Unique identifier for each entry (auto-increments)
  id BIGSERIAL PRIMARY KEY,
  
  -- The actual text content of the entry
  content TEXT NOT NULL,
  
  -- Timestamp of when the entry was created (automatically set)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
-- This allows anonymous reads and writes without authentication
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (write) entries anonymously
CREATE POLICY "Allow anonymous inserts"
  ON entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anyone to read all entries
CREATE POLICY "Allow anonymous reads"
  ON entries
  FOR SELECT
  TO anon
  USING (true);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at DESC);
