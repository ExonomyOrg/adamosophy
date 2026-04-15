---
title: 'Agent Instructions & Session Log'
description: 'Operational constraints, GitHub interaction protocols, and a log of decisions made during the development session.'
---

# Agent Instructions & Session Log

## 1. Core Operational Constraints

*   **Main Branch Only**: **ALWAYS** ensure you are working on the `main` branch before doing any work on the project. Verify with `git branch` or `git status` before any file modification, commit, or push. **Never create or use any other branches** unless explicitly instructed by the user. If not on `main`, switch to it immediately with `git checkout main`.
*   **Documentation Location**: All active project documentation is located at `/workspace/apps/web/src/content/docs/`. This is the **ONLY** directory where documentation files should be read from or written to during normal operations. Never waste time searching for documentation files elsewhere; if a document is needed, it must be in this location. The `incoming/` folder is OFF LIMITS (see Section 9).
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
    1.  **Wait** for the GitHub Actions build to complete using the **Active Polling Loop**.
    2.  **Active Polling Loop Protocol**:
        *   Initiate the check immediately after push.
        *   Enter a loop: Sleep for **5 seconds**, then check the build status via API.
        *   **Efficient API Query**: Use `gh api` with `--jq` filtering to retrieve ONLY the status and conclusion fields. Do NOT use verbose `curl` commands that return unnecessary data.
            *   Command: `gh api repos/ExonomyOrg/adamosophy/actions/runs?head_sha=$(git rev-parse HEAD) --jq '.workflow_runs[0] | {status: .status, conclusion: .conclusion}'`
        *   Repeat this cycle a **maximum of 6 times** (Total wait time: ~30 seconds).
        *   **If Success/Failure is found:** Report the result immediately and proceed to the next step.
        *   **If No Result after 6 attempts:** Stop looping. Report to the user: "Build status pending after 30 seconds. Please check GitHub Actions manually." Gracefully end the verification task there; do not leave the task in a "waiting" limbo state.
    3.  **Verify** the build status (success/failure) via logs or API.
    4.  **Report** back to the user only after confirming the actual result.
    5.  **Never transfer the waiting burden to the user.** If you initiate a wait, you must own the loop until a result is found or the limit is reached.
    *   *Critical*: Do not claim success until the build has actually passed. Do not mark a task as "Completed" until build verification is resolved.

## 3. Critical Failure Modes & Anti-Hallucination Protocol

**STRICT PROHIBITION ON SIMULATION:**
You are an AI agent operating in a real environment. You **MUST NOT** simulate, hallucinate, or pretend that an action has been completed unless you have successfully executed the command and received a positive confirmation from the system.
- **NEVER** say "I have updated the file" until the `str_replace_editor` tool returns a success status.
- **NEVER** say "I have committed/pushed" until the `bash` command returns exit code 0.
- **NEVER** say "The build passed" until you have actively polled the GitHub Actions API and confirmed the `conclusion` is `success`.
- **NEVER** generate fake commit hashes, fake URLs, or fake log outputs. If you do not have the data, state "Waiting for data..." and fetch it.

**TRUTHFULNESS STANDARD:**
- If you are unsure, say "I am unsure."
- If a tool fails, report the exact error message.
- If the build is running, report "Build is in progress..." and keep checking (per the Active Polling Loop).
- **Do not optimize for brevity at the cost of accuracy.** It is better to be verbose and accurate than concise and wrong.

## 4. Markdown Frontmatter Standards

**MANDATORY FRONTMATTER FOR ALL `.md` FILES:**
Every Markdown file created for the docs collection (`/src/content/docs/`) **MUST** include valid YAML frontmatter at the very top of the file. Without this, the Astro build will fail.

**Required Fields:**
```markdown
---
title: 'Human Readable Title'
sortOrder: 99
description: 'Brief description of the document content'
---
```

- `title` (String, Required): The display title of the document.
- `sortOrder` (Integer, Required): Determines the order in the navigation/sidebar.
- `description` (String, Optional but Recommended): Brief summary for SEO and previews.

**Validation Rule:** Before committing any new `.md` file, verify it contains this frontmatter block. Missing frontmatter = Build Failure.

## 5. Session Context: Build Failure & Resolution (Commit 866b672)

**Issue**: The build triggered by commit `866b672` (Interactive Sidebar feature) failed.
**Error**: `Expected "(" but found "type"` in API routes (`update-doc-metadata.ts`, `update-doc-order.ts`, `upload-image.ts`).
**Root Cause**: Astro's static build mode (using esbuild) cannot parse TypeScript `import type` syntax inside `.ts` API route files when combined with frontmatter delimiters.
**Resolution**:
*   Changed `import type { APIRoute } from 'astro';` to `import { APIRoute } from 'astro';`.
*   Removed unnecessary trailing frontmatter delimiters (`---`) from API route files.
*   Verified fix by waiting for successful build completion.

## 6. Feature Implementation Log

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

## 7. Current Project State

*   **Frontend**: Interactive sidebar (drag-and-drop reordering, accordion metadata editor, resizing) is functional.
*   **Backend**: API endpoints exist but currently log changes; full GitHub write-back integration (Octokit) is pending.
*   **Documentation**: All docs (`wip.md`, `ui.md`, `agent.md`) are beautified with enhanced Markdown structure.
*   **Build Status**: Stable (pending next change).

## 8. Pending Tasks / Backlog

1.  **GitHub Integration**: Install `octokit` and `gray-matter` to enable API endpoints to actually commit/push file changes back to the repo.
2.  **Image Uploads**: Implement real file storage logic in `/api/upload-image` (currently a stub).
3.  **Refinement**: Continue refining mobile responsiveness and touch interactions based on user feedback.

## 9. The `incoming/` Folder - Off Limits

**CRITICAL: The `incoming/` folder is OFF LIMITS for any modifications or workflow integration while working on adamosophy.**

*   **Reference Only**: You may refer to documents in the `incoming/` folder from time to time for informational purposes, but **do not modify, move, or integrate** any files from this folder into the active workflow.
*   **External Origin**: The `incoming/` folder contains documentation copied from another repository (the Republet project). It has **not yet been integrated** into our current workflow.
*   **Future Monorepo Structure**: When integration occurs, the `incoming/` folder will be replaced by the actual external repository becoming one of many repos that make up the adamosophy monorepo we are currently configuring.
*   **Current Website Purpose**: The website we are building now is designed to manage this future monorepo structure. Until that architecture is fully implemented, treat `incoming/` as a read-only reference archive.
*   **Do Not Assume Integration**: Never assume that content from `incoming/` should be migrated, consolidated, or modified unless explicitly instructed by the user.

