-- Run this in Supabase → SQL Editor → New Query → paste → Run
-- Adds company + image_url columns to the testimonials table.
-- Safe to run multiple times (IF NOT EXISTS).

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image_url TEXT;
