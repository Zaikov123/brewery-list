# Brewery List App

## Overview
A web app to browse and manage breweries, built with Next.js, React, and Zustand. It implements lazy scrolling and always keeps 15 breweries rendered.

## Features
- Display breweries on initial load.
- Only 5 breweries visible per screen with lazy scroll.
- Scrolling out of rendered chunk load next chunk.
- Single brewery view: click a card with the left mouse button.
- Selection and deletion: users can select multiple breweries using the right mouse button; selected breweries can be deleted while keeping 15 items rendered; clicking a selected brewery again deselects it.

## Installation
Clone the repo, install dependencies, and run the development server. Open http://localhost:3000 in your browser.

## Technologies
Next.js, React, Zustand, CSS Modules, REST API.

