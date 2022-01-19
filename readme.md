# ThreeJS Project

## Setup

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Usage

1. Add a `Component` page directory to the `pages/` directory.
2. Add a `Component.js` file to the page directory. `Component.js` file renders UI and will be imported in the `index.js` file.
3. Add a `Component.canvas.js` file to the page directory. `Component.canvas.js` file defines what `<canvas>` renders and will be imported in the `Component.js` file. And do not forget to push cleanup functions for event listeners to `eventCleanStore`.
4. Add a `Component.scss` file to the page directory. `Component.scss` file defines styles and will be imported in the `Component.js` file.
5. Add your page `Component` to the `router/routes.js` file. Then, it will automatically create a nav UI item and handle the route to the page.
