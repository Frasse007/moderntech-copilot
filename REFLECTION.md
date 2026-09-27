I began this project by deciding what type of website I wanted to create. The decision fell on a sports betting site as there are currently very many successfull ones out there. After this, I started drafting an initial prompt for Copilot in order to have it generate my file/project structure so I had a "skeleton" to start building from. In order to give it a little bit more context of my intentions/what I wanted, I supplied it with the tech stack as well as an overview of the basic features I wanted. Furthermore, I also asked for some sample data that I could utilize later when building the rest of my components to test them. Last but not least, for my initial prompt, I gave clear directions of what exactly I wanted the response to include at this stage. Here below is my initial prompt, along with the response I got.

### PROMPT
```Act as a senior frontend engineer. I am building a basic sports betting website MVP for an assignment. 

Tech Stack Requirements:
- React (bootstrapped with Vite)
- Vanilla CSS / Modern Web Development (clean modular CSS files, no heavy UI libraries like Tailwind)
- JavaScript (ES6+)

App/Webpage Overview:
A sportsbook dashboard with:
- Header (Navbar with user bankroll balance and profile)
- Match Board (Cards displaying sports fixtures and decimal odds)
- Bet Slip (Sidebar to select odds, input wager, calculate payouts, and place bets)
- Active Bets Log (List of submitted wagers)

Task, please provide me with:
1. The exact directory and file tree structure for this project.
2. Starter code for the core files (`index.html`, `src/App.jsx`, `src/components/Header.jsx`, `src/components/MatchCard.jsx`, and `src/components/BetSlip.jsx`).
3. A mock JSON data structure (`src/data/mockMatches.js`) containing 10-12 sample games with decimal odds.

Keep the setup simple, modern, and modular without unnecessary external dependencies.
```

### RESPONSE
```
📊 Complete Project Delivery Summary

I've built you a production-ready sports betting MVP with professional code structure and modern best practices. Here's what you have:

✅ 1. Complete Directory Structure
sports-betting-mvp/
├── index.html                  # Entry point
├── vite.config.js             # Vite setup
├── package.json               # Dependencies: React 18.2 + Vite
├── .gitignore                 # Git exclusions
├── README.md & QUICKSTART.md  # Full documentation
│
├── src/
│   ├── App.jsx                # Main component (state management)
│   ├── App.css                # Layout styles
│   ├── main.jsx               # React bootstrap
│   │
│   ├── components/            # 5 Reusable components
│   │   ├── Header.jsx
│   │   ├── MatchBoard.jsx
│   │   ├── MatchCard.jsx
│   │   ├── BetSlip.jsx
│   │   └── ActiveBets.jsx
│   │
│   ├── styles/                # Modular component CSS
│   │   ├── index.css          # Global + 40+ CSS variables
│   │   ├── Header.css
│   │   ├── MatchBoard.css
│   │   ├── MatchCard.css
│   │   ├── BetSlip.css
│   │   └── ActiveBets.css
│   │
│   └── data/
│       └── mockMatches.js     # 12 sample matches with odds
✅ 2. Core Files Created
File	Purpose	Lines
App.jsx	Central state management	~85
Header.jsx	Navigation + balance	~25
MatchCard.jsx	Individual match display	~60
MatchBoard.jsx	Grid layout	~28
BetSlip.jsx	Wager input + calculations	~120
ActiveBets.jsx	Bet history log	~70
mockMatches.js	12 sports fixtures	~95
✅ 3. Mock Data Structure

12 Sample Matches covering:

⚽ Football (Premier League, La Liga, Bundesliga, Serie A, Champions League)
🏀 Basketball (NBA)
🎾 Tennis (US Open, Wimbledon)
⚾ Baseball (MLB)
🏒 Ice Hockey (NHL)
🏈 American Football (NFL)

Each with realistic decimal odds (1.45 - 4.50 range).
```
After I had the initial project structure and sample data I went through all the component files and generated them. I did this by outlining a few important aspects/details I wanted displayed in my prompts, combined with the mock data I got from my initial prompt. Sometimes I would get a good result right away, other times I had to iterate a couple of times to achieve what I wanted. For example, I had to clarify that I wanted flags shown on the "MatchCards" not only the country codes. Below is the prompt I used to explain what I wanted to change.

### PROMPT
```
On the MatchCard.jsx component I want you to change the ISO Alpha-2 country codes to instead utilize this: https://flagicons.lipis.dev/ for obtaining the country flags to display on the cards. Here is the MatchCard.jsx: (Attached to chat) 
```

### RESPONSE
```To display flags from flagicons.lipis.dev, you need to:

Import the flag-icons CSS library (either in index.html via CDN or through npm).

Render <span> elements with class names matching the ISO Alpha-2 country code (e.g., <span className="fi fi-gb"></span> or <span className={fi fi-${match.homeFlag}}></span>).

Here is the updated MatchCard.jsx component and the index.html update to include the CDN stylesheet.

1. Updated MatchCard.jsx
2. Include the CSS stylesheet in index.html
Add the CDN link tag inside the <head> of your index.html file so that the fi classes render properly:

Note: Ensure your mockMatches.js file passes lower/uppercase 2-letter country codes in homeFlag and awayFlag (e.g., 'gb', 'es', 'us', 'de', 'it').
```
There were also times where I realized that my initial prompts were not detailed enough for Copilot to achieve everything I wanted in one shot. This forced me to sometimes make clarifying and more detailed descriptions of what I wanted to achieve. For example, when I initially created the Header component it just included a "Profile" button with no reference and no interactivity. Of course I wanted it to redirect to an actual profile page that also contained some information when clicked, so I wrote the prompt below to specify that.

### PROMPT
```
Modify the profile button and navigation setup in (src/components/Header.jsx and src/App.jsx) to render a simple profile page view when clicked. The profile page should have fields to input sample information (like name, address, email, etc). Here are the two files: (Files attached to chat)
```

### RESPONSE
```
Here are the updated Header.jsx and App.jsx files with the profile button connected to a interactive Profile view where users can enter and save sample information.

1. src/components/Header.jsx
Update the profile button to toggle the 'profile' tab and add an active class when selected:

2. src/App.jsx
Add state for user profile details (profileData) and render a clean form view when activeTab === 'profile':

3. Optional Styles (src/App.css)
Add this styling snippet to src/App.css to format the form inputs cleanly:
```

Overall, my approach went from a very broad one with focus on general functionality to a more detailed and focused on single design or interactive functions. Throughout the process I also think I learned more about what was important to include and not in my prompts. For example, I found that on longer prompts it was benefitial to remind/summarize in the end with a list of what I wanted. When writing shorter prompts on the other hand, I feel like giving clear guard rails/instructions of what NOT to do many times helped me iterate less to get my desired result.

One thing that really surprised me was how much context it can actually keep in memory. Additionally, I knew that most AI's could "guess" what you wanted it to do even with a bad prompt. But I was still surprised how good results I got even if I supplied it a more vague prompt. Both of these things were clearly highlighted to me when I decided to "try it out" and sent a short concise but still somewhat vague prompt for generating a README. Here below is that prompt and then the response:

### PROMPT
```
Create me a comprehensive detailed, professional README for this repository. Make sure to include: Project description, installation instructions and usage guide/tutorial
```

### RESPONSE
```
I’m reviewing the app structure and existing project details so I can write a polished README that matches the repository accurately.

Read 

Read , lines 1 to 250

Read 

I’ve got the app structure and UX flow; I’m now replacing the placeholder README with a proper project overview, setup guide, and hands-on user tutorial.

Replacing 1 lines with 227 lines in 

Read 

✅ README completed

I updated `README.md` with a more professional, comprehensive project guide that includes:

- Project description and overview
- Tech stack and repository structure
- Installation instructions
- Local development and build commands
- Step-by-step usage/tutorial for the betting dashboard
- Notes for future extension and development
```

However, I did not feel like it got it completely right so I still had to make small revisions such as this:

### PROMPT
```
In the README.md add instructions before the installation part about cloning the repository from GitHub to your local machine
```

### RESPONSE
```
✅ Added clone instructions
I inserted a GitHub clone section before the installation steps in README.md, including:

the git clone command
the cd step into the project directory
This makes the setup flow complete for someone starting from a fresh local machine.
```

Another thing I was positively surprised about is how good it was at creating functional and good-looking css styling with minimal to no instructions about what colors etc to use. This prompt below did both what I actually asked, but then also went and suggested some styling for the help question that made the page look more neat. 

### PROMPT
```
When the help page is the 'active' one. Make sure the BetSlip.jsx is not displayed on the right column, instead show the help questions over the full screen.
```

### RESPONSE
```
To hide the BetSlip sidebar and let the Help section take up the full width, you can conditionally adjust the layout based on activeTab.

Here are the updated src/App.jsx and src/App.css changes.

1. Updated src/App.jsx
Wrap the sidebar conditionally so it only renders when activeTab !== 'help', and add a full-width modifier class to main-content when activeTab === 'help':

2. Styling Additions for Full-Width Layout in src/App.css
Add these CSS rules to src/App.css to handle expanding .main-content to full width and displaying help questions in a grid layout:
```

Although I have some experience developing with AI before for some parts of personal projects. I still think I learned some things from this assignment. In particular I realized how quick and easy it is to go from absolutely nothing to a MVP as I only used like 2.5 hours to build this repository. I experienced how effectively natural language can act as a high-level programming language. Simply translating my thoughts and architectural ideas into plain text allowed Copilot to accurately generate functional code, demonstrating how far natural language processing has come in understanding developer intent. The biggest technical lesson I took away from this assignment was realizing how drastically AI lowers the cost of failure. Because the time investment required to validate an idea is reduced to hours rather than days, I learned that I don't need a "perfect" or fully mapped out concept before writing code. I can test, pivot and iterate rapidly, treating code as disposable experimentations rather than heavy time investments.

If I were to build this project again my primary strategic shift would be moving from a granular, file-by-file workflow toward more of a high-context one-shot attempt. When I initially approached the build, I adopted an incremental process—prompting for individual components and piecing files together step-by-step. However, working through the assignment and seeing the responses made me realize that for a project of this scope and scale that was unnecessary. Premier models like Copilot, Claude, or GPT-4+ possess context windows and reasoning capabilities easily large enough to ingest a comprehensive architectural design all at once without losing coherence. I believe I underestimated the model's capacity to handle high-level structural complexity and in hindsight, stepping through every file manually was an unnecessary time consumption that stopped me from polishing the final product even more.

Furthermore, supplying the complete mental model upfront allows the AI to generate cross-dependent files that naturally align with one another, taking full advantage of the model's peak performance before context drift sets in over long, multi-turn conversations. While generating a broader codebase in a single pass inevitably introduces a few localized edge-case bugs, fixing minor details in a fully assembled system is vastly more efficient than manually orchestrating every generation step. Next time, I will trust the technology to scaffold the core architecture in one sweep. Instead I will shift my role early on from a step-by-step driver to more of a system architect and reviewer.