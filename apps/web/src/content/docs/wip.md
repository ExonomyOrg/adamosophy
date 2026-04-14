---
title: "Work in Progress"
description: "Current development status and upcoming features for the documentation system."
sidebarOrder: 0
draft: false
---

# Work in Progress

This document tracks the current state of development for the Adamosophy documentation system.

## Current Focus

- [x] Fix navigation routing and 404 errors
- [x] Unify sidebar styling across layouts
- [ ] Implement Card/List toggle view on landing page
- [ ] Add drag-and-drop reordering for documentation sidebar
- [ ] Integrate frontmatter editing within the drawer
- [ ] Optimize image handling and display

## Roadmap

The following features are currently being implemented to enhance the documentation experience:

### 1. Interactive Sidebar Editing (Accordion & Drag-and-Drop)
- **Drag-to-Reorder**: A "grab handle" will appear on hover next to each document title in the drawer. Users can drag documents up or down to reorder them. This automatically updates the `sidebarOrder` in the file's frontmatter.
- **Accordion Metadata Editor**: Hovering over a document reveals a dropdown icon. Clicking it expands the item to show editable frontmatter fields:
  - **Title**: The display name of the document.
  - **Description**: A brief summary shown in list views and tooltips.
  - **Image Path**: A file picker button allows selecting an image from the local device.
  
### 2. Automatic Image Handling
- **Smart Resizing**: When an image is selected via the file picker, it is automatically resized to optimal dimensions (e.g., 400x250px for cards).
- **Format Optimization**: Images are converted to WebP format for better performance.
- **Storage**: Optimized images are stored in `/public/docs/images/`, and the frontmatter is updated with the new path.

### 3. Docs Landing Page Views
- **Toggleable Layouts**: A "Display" button on the `/docs` landing page allows switching between:
  - **Card View (Default)**: A grid of cards showing title, image (if available), and description.
  - **List View (Accordion)**: A vertical list where items can be expanded to reveal full descriptions.
- **Consistent Ordering**: Both views respect the drag-and-drop order established in the sidebar.

### 4. Centralized Styling
- **Unified Components**: All cards and list items will use a single shared component (`DocCard.astro`) to ensure identical styling across the sidebar, landing page, and any other listings.
- **CSS Grid**: The document list in the drawer and the landing page will utilize CSS Grid for responsive, consistent layout.

## Notes

- **No CMS Yet**: These features provide a lightweight editing interface directly in the sidebar, delaying the need for a full Headless CMS until the documentation volume increases.
- **GitHub Integration**: Changes made via the UI (reordering, metadata edits) will commit directly to the `main` branch using the provided PAT, triggering automatic rebuilds.

---

*Last Updated: Immediately prior to implementation of interactive sidebar features.*
