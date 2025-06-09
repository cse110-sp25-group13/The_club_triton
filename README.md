# The_club_triton

Club Penguins card game, UCSD style! Collect themed cards based on UCSD dining, living, and famous structures. Enter the dojo and battle the sensei to continue discovering new UCSD gems.

# Set Up/Run

Host it in any website and then open src/pages/home.html

or simply go



### Releases:

#### 1.0: 06/04/2025

## file structure

```
The_club_triton/
├── .github/                # GitHub actions & issue templates
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── __tests__/             # Unit, e2e, and browser tests
│   ├── browser/
│   ├── e2e/
│   ├── setup/
│   └── unit/
├── configs/               # ESLint, Jest, Prettier, Playwright configs
├── docs/                  # JSDoc output and markdown documentation
│   ├── scripts/
│   ├── styles/
│   └── fonts/
├── src/                   # Main source code
│   ├── assets/            # Fonts, images, icons, character art
│   ├── card/              # Card data and TritonCard component
│   ├── imgs/              # Character images (404, etc.)
│   ├── pages/             # HTML views (home, game, collection)
│   ├── scripts/           # JS logic for game and UI
│   └── styles/            # CSS for each page/component
├── .gitignore
├── package.json
├── README.md
└── jest.setup.js
```
