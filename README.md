# LA Dental Care Klampok — Website Klinik Gigi Premium

Website resmi untuk **LA Dental Care Klampok**, sebuah klinik gigi premium berbasis di Klampok, Banjarnegara. Dibangun sebagai aplikasi full-stack React + Vite frontend dengan Laravel + MySQL backend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4 |
| **Backend** | Laravel, MySQL |
| **API** | Laravel API routes, axios fetches |
| **Routing** | Anchor scroll + React state (public) |
| **SEO** | react-helmet-async |
| **Icons** | @phosphor-icons/react |
| **Notifications** | react-hot-toast |
| **Deployment** | Laravel-backed frontend with Vite built assets |

## Features

- **Landing Page** — Hero, About, Doctor Profile, Services, Schedule, Gallery, Testimonials, FAQ, Contact & Booking
- **Online Booking** — WhatsApp-based booking flow from the website
- **Admin Dashboard** — Full CRUD management for all content sections
- **SEO Management** — Custom meta titles, descriptions, Open Graph, canonical URLs, structured data per page
- **Media Manager** — Upload, manage, and reuse images across content
- **Role-based Access** — Super admin, admin, staff, editor roles
- **Activity Logs** — Track all admin actions
- **Multi-language Ready** — Indonesian-focused content with easy localization
- **Responsive Design** — Mobile-first layout with premium UI

## Folder Structure

```
├── app/                       # Laravel backend application
├── bootstrap/                 # Laravel bootstrap files
├── config/                    # Laravel configuration
├── database/                  # Laravel migrations and seeders
├── public/                    # Laravel public webroot
│   ├── index.php
│   ├── robots.txt
│   └── sitemap.xml
├── resources/                 # Laravel views and assets
├── routes/                    # Laravel route definitions
├── src/                       # React frontend source
│   ├── assets/                # Images & static assets
│   ├── components/            # Public-facing UI components
│   ├── hooks/                 # React hooks
│   ├── lib/                   # Validation and utility helpers
│   ├── pages/                 # Page components
│   └── services/              # Frontend API service functions
├── .env.example               # Laravel environment template
├── package.json               # Frontend package manifest
├── vite.config.js             # Vite configuration (dev proxy to Laravel)
└── artisan                    # Laravel CLI entrypoint
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the Laravel values:

```bash
APP_NAME="LA Dental Care Klampok"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=klinikgigi
DB_USERNAME=root
DB_PASSWORD=
```

For frontend-only Vite config, use `.env.local` if needed:

```bash
VITE_GOOGLE_ANALYTICS_ID=
```

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_URL` | Yes | Local Laravel app URL |
| `DB_CONNECTION` | Yes | Database driver, usually `mysql` |
| `DB_HOST` | Yes | Database host |
| `DB_PORT` | Yes | Database port |
| `DB_DATABASE` | Yes | Database name |
| `DB_USERNAME` | Yes | Database user |
| `VITE_GOOGLE_ANALYTICS_ID` | No | Google Analytics 4 measurement ID |

## Local Development

### 1. Backend Setup

1. Install PHP dependencies:

```bash
composer install
```

2. Copy the Laravel environment file and generate an app key:

```bash
cp .env.example .env
php artisan key:generate
```

3. Configure your database credentials in `.env`.

4. Run migrations and seeders:

```bash
php artisan migrate --seed
```

5. Start the Laravel backend:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Frontend Setup

1. Install JavaScript dependencies:

```bash
npm install
```

2. Start the Vite development server:

```bash
npm run dev
```

The React app proxies `/api` requests to `http://127.0.0.1:8000` by default.

## Build

```bash
npm run build
```

## Admin Panel

The Laravel backend includes the admin interface through Filament and the API endpoints for content, bookings, and contact messages. Access the admin panel via the Laravel routes after setting up the database and admin user.

## Admin Login Setup

Use Laravel Filament to create the first admin user after installing the backend.

1. Run database migrations and seed the admin user if needed:

```bash
php artisan migrate --seed
```

2. Create a Filament admin user:

```bash
php artisan make:filament-user
```

3. Follow the interactive prompts to provide email, name, and password.

4. Access the admin panel at `http://127.0.0.1:8000/admin`.

## Local Development

```bash
# 1. Install PHP dependencies
composer install

# 2. Copy Laravel environment file and generate app key
cp .env.example .env
php artisan key:generate

# 3. Configure database credentials in .env
#    DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 4. Run migrations
php artisan migrate --seed

# 5. Start Laravel backend
php artisan serve --host=127.0.0.1 --port=8000

# 6. Install frontend dependencies
npm install

# 7. Start Vite development server
npm run dev
```

The React app proxies `/api` requests to `http://127.0.0.1:8000` by default.

## Build

```bash
npm run build
```

## Deployment

This repository is designed for a Laravel backend with a separate React/Vite frontend. Build the frontend locally with `npm run build`, and serve the generated assets through the Laravel application or a compatible static asset host.

## Common Troubleshooting

**"Failed to fetch" errors**
→ Ensure the Laravel backend is running and the frontend proxy is configured for `/api` requests.

**"relation does not exist" errors**
→ Run all migration files in order. Missing a migration will cause table errors.

**Blank white page on deployment**
→ Vite build succeeded but environment variables may be missing. Check Vercel environment variables.

**Admin login redirects to login page**
→ Auth session not persisting. Ensure redirect URLs include `/**` wildcard pattern.

**Images not loading**
→ Check storage bucket policies. The `clinic-images` bucket must be public.

**SEO changes not appearing**
→ Changes to `seo_settings` table may need a page refresh. Use Incognito mode to verify.

## Future Improvement Recommendations

1. **Blog/Articles Section** — Add a blog for dental health articles to improve SEO
2. **Multi-language Support** — Implement i18n for English/Indonesian
3. **Online Payment** — Integrate payment gateway for deposit/prepayment
4. **Email Notifications** — Send email confirmations for bookings
5. **Patient Portal** — Allow patients to view their treatment history
6. **Analytics Dashboard** — Enhanced admin analytics with charts
7. **PWA Support** — Add service worker for offline access and app-like experience
8. **Automated Sitemap** — Generate sitemap.xml dynamically based on content
9. **SEO Pagination** — Handle canonical/next/prev for paginated views
10. **Performance Monitoring** — Add Core Web Vitals tracking