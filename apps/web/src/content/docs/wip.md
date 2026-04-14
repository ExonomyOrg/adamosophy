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
- [x] Implement drag-and-drop reordering UI (frontend)
- [x] Add accordion metadata editor UI (frontend)
- [x] Create API endpoints for updates (backend stubs)
- [x] Fix build errors in API routes (esbuild parsing issues with `import type`)
- [x] Implement resizable sidebar with drag handle (default 30% wider at 21rem)
- [x] Add Card/List toggle view on Docs landing page
- [x] Create UI architecture documentation (ui.md) inspired by Couchers.org
- [ ] Implement GitHub integration for actual file updates
- [ ] Add image upload and optimization logic
- [ ] Fix MD viewer nested list indentation (all list items appear left-aligned instead of hierarchically indented)
- [ ] Implement 3 Markdown rendering options with user preference setting
  - [ ] Option 1: marked + github-markdown-css
  - [ ] Option 2: remark / rehype ecosystem solution
  - [ ] Option 3: @tailwindcss/typography with prose class
  - [ ] Add tristate toggle in drawer for renderer selection
  - [ ] Integrate with user settings profile section

### 2026-01-14: MD Viewer Indentation Issue
**Problem**: Nested lists in markdown documents aren't showing proper hierarchical indentation. All list items (bulleted or numbered) inside documents appear completely left-aligned instead of being indented according to their nesting level.
**Root Cause**: CSS applies the same padding to all list levels rather than incrementally increasing indentation for each nesting level.
**Status**: Pending fix to CSS for nested list styling.

### 2026-01-14: Multiple Markdown Rendering Options
**Requirement**: Adamosophy will provide 3 optional ways to render Markdown content, allowing users to select their preferred method in the User Settings section of their profile.
**Implementation Plan**:
1. **marked + github-markdown-css**: Fast parsing with authentic GitHub-style appearance
2. **remark / rehype ecosystem**: Advanced processing with Astro integration and plugin extensibility
3. **@tailwindcss/typography**: Beautiful default styles with perfect Tailwind integration
**UI**: Initial implementation will use a tristate toggle in the drawer for quick switching between methods.
**Status**: Documented in settings.md, ready for implementation.

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

### 5. Resizable Sidebar
- **Default Width**: Increased from 16rem to 21rem (30% wider) for better readability
- **Resize Handle**: Appears on hover at the right edge of the sidebar with blue highlight
- **Drag-to-Resize**: Users can drag the handle to adjust sidebar width between 200px-600px
- **Persistence**: Sidebar width is saved to localStorage and restored on page load
- **Visual Feedback**: Cursor changes to `ew-resize` when hovering over the handle

## Notes

- **No CMS Yet**: These features provide a lightweight editing interface directly in the sidebar, delaying the need for a full Headless CMS until the documentation volume increases.
- **GitHub Integration**: Changes made via the UI (reordering, metadata edits) will commit directly to the `main` branch using the provided PAT, triggering automatic rebuilds.
- **UI Architecture**: Documentation system design is inspired by Couchers.org's clean, component-driven approach with emphasis on usability and accessibility.
- **Build Fixes**: Resolved esbuild parsing errors in API routes by removing frontmatter delimiters and changing `import type` to `import` statements.

---

*Last Updated: 2026-01-14 - Session including resizable sidebar, card/list toggle, UI documentation, build fixes, and MD viewer nested list indentation issue documented.*
