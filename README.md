# GitHub Profile Explorer

A simple GitHub user search application built with Vue 3 and TypeScript. Search for GitHub users, view profile information, and browse suggestions while typing.

## Features

* Search GitHub users by username
* Suggestions with debounced search
* User profile overview
* Display avatar, bio, location, and profile link
* Display followers and following counts
* Display public repositories and gists count
* Light/Dark theme switcher
* Responsive design
* Loading states for API requests

## Built With

* Vue 3
* TypeScript
* Vite
* Tailwind CSS
* GitHub REST API

## Screenshots

<img width="1440" height="783" alt="image" src="https://github.com/user-attachments/assets/48a92334-70da-42aa-928c-82c7a8f0d4f7" />

<img width="1440" height="783" alt="image" src="https://github.com/user-attachments/assets/369740d6-d2e1-4abd-b313-397db46e8422" />

## Installation

```bash
git clone https://github.com/your-username/github-profile-explorer.git

cd github-profile-explorer

npm install

npm run dev
```

## GitHub API Rate Limiting

This project uses the public GitHub API without authentication.

GitHub applies strict rate limits to unauthenticated requests. Because the application performs live searches while typing, you may occasionally receive a **403 Forbidden** response after making too many requests in a short period of time.

If this happens:

* Wait a few minutes before searching again
* Refresh the page if necessary
* Consider using a GitHub Personal Access Token if extending the project

This is an expected limitation of the public GitHub API and not an application bug.

### Theme Persistence

Users expect their selected theme to persist between sessions.

Stored theme preference in `localStorage` and restored it on application startup.

## License

MIT
