# FredonBytes Tech Support

A modern tech support system for FredonBytes projects, built with Next.js, TailwindCSS, and Resend API.

## Features

- Modern, responsive design
- Multi-language support (CZ/ENG)
- Form validation
- Email notifications
- MongoDB data persistence
- SEO optimized

## Tech Stack

- Next.js 15.x
- TypeScript
- TailwindCSS 3.0.11
- Resend API
- MongoDB

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/patrik-fredon/tech-support-fredonbytes.git
cd tech-support-fredonbytes
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Fill in your environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `RESEND_API_KEY`: Your Resend API key
- `NEXT_PUBLIC_SITE_URL`: Your site URL

5. Run the development server:

```bash
npm run dev
```

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
