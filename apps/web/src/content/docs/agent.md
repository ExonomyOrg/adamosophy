---
title: 'Agent Instructions & Session Log'
description: 'Operational constraints, GitHub interaction protocols, and a log of decisions made during the development session.'
---

# Agent Instructions & Session Log

## 1. Core Operational Constraints

*   **No Unauthorized Coding**: Do not code or modify anything without **explicit instruction** and **permission** from the user.
*   **Verification First**: Before acting, always verify the current state of the workspace (file existence, content, build status). Never assume prior steps were completed correctly due to potential context loss.
*   **Documentation Review**: Always review `wip.md` and other project definition documents before starting work to understand the current project state.
*   **WIP.md Workflow**: For every task:
    1.  Read `wip.md` first to understand current priorities and status
    2.  Update `wip.md` with new task information, including a timestamped entry (format: YYYY-MM-DD)
    3.  Complete the task as instructed
    4.  Report back to the user with results (findings or completion status)
    5.  Ask for explicit permission to commit and push changes (user needs to test the live project)
    6.  After receiving permission, commit and push the changes
    7.  Monitor the triggered build and verify it completes successfully
    8.  Only after successful build completion, return to the user to ask for permission to check off the task in `wip.md`
    9.  Ensure all updates include timestamps going forward

## 2. GitHub Interaction Protocols

*   **Repository URL**: https://github.com/ExonomyOrg/adamosophy
*   **Authentication**: Use the provided `GITHUB_TOKEN` environment variable to access the repository.
    *   The token is stored in the environment variable `GITHUB_TOKEN`
    *   Token format: GitHub Personal Access Token (PAT) with `repo` scope
    *   Usage: Configure git to use the token for HTTPS authentication:
        ```bash
        git remote set-url origin https://${GITHUB_TOKEN}@github.com/ExonomyOrg/adamosophy.git
        ```
*   **Branch Strategy**: Commit and push directly to the `main` branch. **Do not create new branches** unless explicitly instructed.
*   **Build Verification**: After pushing a commit that triggers a build:
    1.  **Wait** for the GitHub Actions build to complete.
    2.  **Verify** the build status (success/failure) via logs or API.
    3.  **Report** back to the user only after confirming the actual result.
    *   *Critical*: Do not claim success until the build has actually passed.

## 3. Session Context: Build Failure & Resolution (Commit 866b672)

**Issue**: The build triggered by commit `866b672` (Interactive Sidebar feature) failed.
**Error**: `Expected "(" but found "type"` in API routes (`update-doc-metadata.ts`, `update-doc-order.ts`, `upload-image.ts`).
**Root Cause**: Astro's static build mode (using esbuild) cannot parse TypeScript `import type` syntax inside `.ts` API route files when combined with frontmatter delimiters.
**Resolution**:
*   Changed `import type { APIRoute } from 'astro';` to `import { APIRoute } from 'astro';`.
*   Removed unnecessary trailing frontmatter delimiters (`---`) from API route files.
*   Verified fix by waiting for successful build completion.

## 4. Feature Implementation Log

### A. Resizable Sidebar
*   **Requirement**: Make the documentation drawer resizable, defaulting to 30% wider than the original (21rem vs 16rem).
*   **Implementation**:
    *   Added a resize handle on the right edge of the sidebar.
    *   Implemented drag logic updating CSS custom property `--sidebar-width`.
    *   Added touch event support for mobile devices.
    *   Saved width preference to `localStorage`.
*   **Mobile Fix**: Initial implementation failed on mobile (drawer collapsed). Fixed by switching from `display: none` toggle to an off-canvas transform pattern (`translate-x`) ensuring the drawer renders correctly on small screens.

### B. Document Gallery (Docs Landing Page)
*   **Requirement**: Create a Google Docs-style gallery view with Card/List toggle.
*   **Implementation**:
    *   Created a landing page at `/docs` listing all markdown files.
    *   Added a toggle button to switch between Grid (Card) and List views.
    *   Saved view preference to `localStorage`.

### C. UI Architecture Documentation
*   **Inspiration**: Modeled after **Couchers.org** UI design principles (flattering imitation).
*   **Action**: Created/Updated `ui.md` to document layout systems, component libraries, and interaction patterns based on this inspiration.

## 5. Current Project State

*   **Frontend**: Interactive sidebar (drag-and-drop reordering, accordion metadata editor, resizing) is functional.
*   **Backend**: API endpoints exist but currently log changes; full GitHub write-back integration (Octokit) is pending.
*   **Documentation**: All docs (`wip.md`, `ui.md`, `agent.md`) are beautified with enhanced Markdown structure.
*   **Build Status**: Stable (pending next change).

## 6. Pending Tasks / Backlog

1.  **GitHub Integration**: Install `octokit` and `gray-matter` to enable API endpoints to actually commit/push file changes back to the repo.
2.  **Image Uploads**: Implement real file storage logic in `/api/upload-image` (currently a stub).
3.  **Refinement**: Continue refining mobile responsiveness and touch interactions based on user feedback.
