# AIT Campus 360° Navigation System

A modern React frontend for exploring your campus using interactive 360° panoramic views and route planning.

## Features

- **Panorama Viewer**: Placeholder for 360° PANOLENS integration
- **Route Planning**: Find routes between campus locations
- **Interactive Minimap**: Campus map with selectable nodes and paths
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Dark theme with blue accents for a professional look

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or extract the project
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

### Running the Project

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The app will open automatically at `http://localhost:5173`

### Building for Production

Create a production build:

\`\`\`bash
npm run build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── PanoramaViewer.jsx    # 360° viewer placeholder
│   ├── RoutePanel.jsx         # Route finding interface
│   └── Minimap.jsx            # Interactive campus map
├── App.jsx                     # Main app layout
├── main.jsx                    # Entry point
├── index.css                   # Global styles
└── App.css                     # App-specific styles
\`\`\`

## Component Overview

### PanoramaViewer
Displays the 360° panoramic viewer. Currently shows a placeholder for integration with PANOLENS library.

**Integration Point**: Replace the placeholder div with actual PANOLENS canvas and panorama loading logic.

### RoutePanel
Sidebar component for route planning with:
- From/To location dropdowns
- Find Route button with loading state
- Route steps display

**Integration Point**: Connect the "Find Route" button to your backend API for actual pathfinding.

### Minimap
Interactive 2D map of the campus showing:
- Campus nodes (locations)
- Connection paths between nodes
- Clickable nodes to highlight routes
- Node legend

**Integration Point**: Add SVG rendering of actual campus map data from your backend.

## Mock Data

The components currently use mock data:

**Locations**: Reception, Canteen, Library, Main Gate, Parking, Auditorium, Computer Lab, Admin Office

**Route Response**: 
- Reception → Main Gate → Main Corridor → Destination

**Mock Nodes**: 5 campus locations with predefined coordinates

## Customization

### Adding New Locations

Edit `LOCATIONS` array in `src/components/RoutePanel.jsx`:

\`\`\`jsx
const LOCATIONS = [
  'Your Location 1',
  'Your Location 2',
  // ...
]
\`\`\`

### Changing Colors

Modify Tailwind classes in component files. Current theme uses:
- Primary: Blue (`from-blue-600 to-cyan-600`)
- Background: Slate (`slate-950`, `slate-900`)
- Accents: Cyan

### Adjusting Layout

The main layout uses CSS Grid in `src/App.jsx`. Modify the grid configuration for different arrangements:
- Desktop: 3-column layout (2 cols for viewer, 1 for panel)
- Mobile: Single column (stacked)

## Future Enhancements

- Integrate PANOLENS for 360° panorama rendering
- Connect to backend API for real route calculations
- Add user authentication
- Implement real-time location tracking
- Add campus event/place information display
- Multi-language support

## Technologies Used

- **React 18**: UI framework
- **Vite**: Fast build tool
- **Tailwind CSS v4**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript

## Notes for Backend Integration

### PANOLENS Integration
PANOLENS requires:
1. Install: `npm install panolens three`
2. Load panorama images (JPEG or similar)
3. Handle viewer initialization and events

### API Integration
Replace mock data with actual API calls in:
1. `RoutePanel.jsx`: `handleFindRoute()` function
2. `App.jsx`: Add API service for route calculations
3. `Minimap.jsx`: Load campus node coordinates from backend

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please refer to the component comments for integration points.
