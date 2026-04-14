# Adamosophy Settings Documentation

## Overview
This document outlines the configuration options available in the Adamosophy user settings page. Users can customize their experience by selecting preferred rendering methods, display options, and interaction preferences.

---

## Markdown Rendering Options

Adamosophy provides **3 optional ways to render Markdown** content. Users can set their preferred method in the **User Settings** section of their profile. This flexibility ensures optimal reading experience based on individual preferences for performance, visual style, or ecosystem integration.

### 1. Marked + GitHub Markdown CSS
- **Description**: Uses the `marked` library for fast Markdown parsing combined with `github-markdown-css` for authentic GitHub-style appearance.
- **Best For**: Users who want exact GitHub-like rendering with minimal overhead.
- **Characteristics**:
  - Fast parsing speed
  - Familiar GitHub visual style
  - Lightweight dependency footprint

### 2. Remark / Rehype Ecosystem
- **Description**: Leverages the powerful `remark` and `rehype` plugin ecosystem (used internally by Astro) for advanced Markdown processing.
- **Best For**: Users who need extensibility or want consistency with the Astro build pipeline.
- **Characteristics**:
  - Highly configurable via plugins
  - Seamless integration with Astro's internal processing
  - Supports custom transformations and syntax highlighting

### 3. Tailwind Typography Plugin
- **Description**: Implements `@tailwindcss/typography` with the `prose` class to automatically style rendered HTML from Markdown.
- **Best For**: Users who prefer design consistency with the rest of the Tailwind-styled application.
- **Characteristics**:
  - Beautiful, opinionated default styles
  - Zero custom CSS required
  - Perfect integration with existing Tailwind utility classes

---

## User Interface for Selection

For initial implementation and testing, a **tristate toggle** will be available in the drawer component, allowing users to quickly switch between the three rendering methods. In future iterations, this setting will be moved to a dedicated Settings Modal/Page for better organization, while the viewer itself may retain a simple "View Mode" switcher for temporary overrides.

---

## Additional Settings (To Be Documented)

*The following settings categories will be added as they are implemented:*

- **Display Preferences**
  - Theme selection (Light/Dark/System)
  - Font size adjustment
  - Line height preferences
  
- **Navigation & Layout**
  - Drawer behavior (auto-hide, persistent, mini)
  - Spine visibility toggles
  - Breadcrumb display options

- **Content Preferences**
  - Default document sort order
  - Table of contents visibility
  - Metadata display options

---

*Last Updated: 2026-01-14*
