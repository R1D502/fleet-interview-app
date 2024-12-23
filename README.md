# Fleet Interview Web App

A modern web application for managing devices and employees in an organization. Built with React, TypeScript, and Tailwind CSS.

## Features

- Device Management
  - Add, edit, and delete devices
  - Filter devices by type
  - Assign devices to employees

- Employee Management
  - Add, edit, and delete employees
  - Filter employees by role
  - View assigned devices

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- React Router for navigation
- Radix UI components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/R1D502/fleet-interview-app.git
cd fleet-interview-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Project Structure

```
src/
├── components/           # React components
│   ├── devices/         # Device-related components
│   ├── employees/       # Employee-related components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API client
├── pages/               # Page components
└── types/               # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
