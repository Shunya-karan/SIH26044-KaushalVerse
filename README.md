# SIH26044 - KaushalVerse

KaushalVerse is an academia–industry collaboration platform designed to bridge
the gap between academic learning and industry requirements.

The platform helps students:

- Build and manage their skill profiles
- Identify industry-relevant skill gaps
- Follow personalized learning roadmaps
- Discover matching internships and jobs
- Track applications and placement progress

Companies can:

- Create company profiles
- Post internship and job opportunities
- Define required skills
- Find matching candidates
- Manage applications

## Architecture

React Frontend
        |
        v
Express + Node.js Backend
        |
        v
Supabase PostgreSQL, Auth and Storage

## Project Structure

- `frontend/` - React frontend
- `backend/` - Express and Node.js backend
- `docs/` - Project documentation

## Main Features

- Student dashboard
- Company dashboard
- Skill gap analysis
- Smart opportunity matching
- Learning roadmap
- Resume management
- Application tracking
- Candidate ranking
- Placement analytics

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- Supabase
- PostgreSQL

## Development

Frontend and backend are maintained separately.

```text
frontend → backend API → Supabase