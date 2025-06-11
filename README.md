# The_club_triton

Club Penguins card game, UCSD style! Collect themed cards based on UCSD dining, living, and famous structures. Enter the dojo and battle the sensei to continue discovering new UCSD gems. Visit [this site](https://cse110-sp25-group13.github.io/The_club_triton/pages/home-page.html) to play!

# Set Up/Run

To set up/run our application locally, [clone this repository](https://github.com/cse110-sp25-group13/The_club_triton.git), then navigate to `index.html`. Then either use the extension `Live Server` or `npx http-server` to launch. Or, go to our [Github pages hosted site](https://cse110-sp25-group13.github.io/The_club_triton/pages/home-page.html) to view/play.

### Releases:

#### 1.0: 06/04/2025

#### 1.1: 06/08/2025

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
├── package.json           # Project manifest
├── package-lock.json      # Dependency lockfile
├── README.md              # Project overview & setup guide 
└── jest.setup.js          # Test environment setup
```
