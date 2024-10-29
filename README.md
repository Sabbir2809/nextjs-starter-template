# Project Name

#### [Frontend Live Link]()

## Overview

## Features

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Next.js
- **State Management:** Context API
- **Component Library:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)

## Project Setup Instructions

1. Clone the repository:

   ```bash
   git clone
   cd
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
3. Setup environment variables in `.env`.

   ```bash
     NEXT_PUBLIC_JWT_TOKEN_KEY=_token
     NEXT_PUBLIC_AUTH_USER_KEY=_auth
     NEXT_PUBLIC_AUTH_USER_TYPE=USER
     NEXT_PUBLIC_REFRESH_TOKEN=_refresh_token

     NEXT_PUBLIC_AUTH_BASE_URL=
     NEXT_PUBLIC_WRITE_BASE_URL=
     NEXT_PUBLIC_READER_BASE_URL=

     NEXT_PUBLIC_CDN_MEDIA_UPLOAD_URL=
   ```

4. Run the development server:
   ```bash
   yarn dev dev
   ```
5. Open `http://localhost:3000` in your browser.
