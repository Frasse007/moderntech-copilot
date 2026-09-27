# Sports Betting MVP

A modern React + Vite front-end application that simulates a sports betting dashboard. The app lets users browse available matches, filter markets by sport, select odds, place virtual wagers, track active bets, and update a profile section. It is designed as a lightweight MVP for learning state management, UI composition, and interactive front-end workflows in React.

## Project Description

This project is a sports betting interface inspired by common sportsbook dashboards. It includes:

- A match board with multiple sports and fixtures
- Odds selection for Home, Draw, and Away outcomes
- A bet slip that validates wager input and calculates potential payout
- A simulated bankroll that updates when bets are placed or canceled
- A list of active bets with status and removal logic
- Filtered sports browsing in the Markets tab
- A Help & Support section and a user profile form

The app is intentionally built as a front-end prototype rather than a production gambling platform. It demonstrates how to structure a React application, manage shared state, and create a responsive betting experience without a backend or real payment flow.

## Tech Stack

- React 18
- Vite
- JavaScript (ES modules)
- CSS for styling

## Project Structure

```text
moderntech-copilot/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── components/
│   │   ├── ActiveBets.jsx
│   │   ├── BetSlip.jsx
│   │   ├── Header.jsx
│   │   ├── MatchBoard.jsx
│   │   └── MatchCard.jsx
│   ├── data/
│   │   └── mockMatches.js
│   └── styles/
│       ├── ActiveBets.css
│       ├── BetSlip.css
│       ├── Header.css
│       ├── MatchBoard.css
│       ├── MatchCard.css
│       └── index.css
└── public/
```

## Clone the Repository

To get the project on your local machine, clone it from GitHub:

```bash
git clone https://github.com/frasse007/moderntech-copilot.git
```

Then navigate into the project folder:

```bash
cd moderntech-copilot
```

## Installation

Follow these steps to run the project locally.

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

## Production Build

To create a production-ready build:

```bash
npm run build
```

To preview the optimized build locally:

```bash
npm run preview
```

## Usage Guide / Tutorial

### 1. Explore the home dashboard

When the app loads, you are taken to a sportsbook-style home screen. The interface shows match cards and an overview of the betting environment. The left side displays the match board, while the right side is dedicated to your bet slip and active bets.

### 2. Browse available matches

Each match card contains information such as:

- Team names
- Match type or competition
- Odds for betting selections
- A quick way to choose a bet outcome

You can browse through the default match list and see multiple sports represented in the sample data.

### 3. Select an odds option

Click one of the betting options on a match card, such as:

- Home
- Draw
- Away

This action selects the outcome and adds it to the bet slip. The selected market becomes the current bet being prepared for placement.

### 4. Enter your wager

In the bet slip, type the amount you want to stake. The app validates the value and checks whether it exceeds your available bankroll.

Rules implemented in the app:

- Wager must be greater than 0
- Wager cannot exceed current bankroll
- Invalid values trigger a warning alert

The payout is calculated using the selected odds and displayed in the bet slip before you confirm.

### 5. Place a bet

Once you are satisfied with the selection and wager:

1. Enter the stake amount
2. Confirm the selection is correct
3. Click the button to place the bet

If the bet is accepted, the app will:

- subtract the wager from your bankroll
- add the bet to the active bets list
- mark the bet as pending

### 6. Manage active bets

The Active Bets panel shows all pending bets placed by the user. Each bet includes:

- Selected match
- Chosen outcome
- Odds
- Wager amount
- Estimated payout
- Time placed

If a bet is still pending, you can remove it. Removing the bet returns the original stake to your bankroll and deletes it from the active list.

### 7. Use the Markets tab

The Markets section allows you to filter matches by sport category. This helps narrow the match list to categories such as:

- All
- Football
- Basketball
- Tennis
- Baseball
- or whichever sports are included in the mock data

This tab is useful when browsing large sets of fixtures and focusing on a single category.

### 8. Open the Help & Support Center

The Help tab explains the betting flow and how bankroll management works. It provides short guidance on:

- how to place a bet
- how the bankroll is affected by wager placement and cancellation

### 9. Update your profile

The Profile tab lets users fill in:

- full name
- email address
- phone number
- address
- city
- postal code

After editing the form, click Save Changes. The app confirms the profile was updated successfully with a visual success message.

## Notes for Developers

This application is a front-end learning/demo project and does not include:

- authentication or user accounts
- real backend APIs
- database persistence
- live betting data
- payment processing

## Summary

This repository is a practical example of a sportsbook-style front-end built with React. It demonstrates key concepts such as state updates, conditional rendering, interactive forms, user flows, and UI-driven betting logic in a compact and easy-to-understand application.
