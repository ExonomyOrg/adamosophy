---
title: 'Agent Instructions'
description: 'Operational constraints, GitHub interaction protocols, and anti-hallucination standards for the development agent.'
sortOrder: 1
---

# Agent Instructions

## 1. Core Operational Constraints

*   **Main Branch Only**: **ALWAYS** ensure you are working on the `main` branch before doing any work on the project. Verify with `git branch` or `git status` before any file modification, commit, or push. **Never create or use any other branches** unless explicitly instructed by the user. If not on `main`, switch to it immediately with `git checkout main`.
*   **Documentation Location**: All active project documentation is located at `/workspace/apps/web/src/content/docs/`. This is the **ONLY** directory where documentation files should be read from or written to during normal operations. Never waste time searching for documentation files elsewhere; if a document is needed, it must be in this location. The `incoming/` folder is OFF LIMITS and unavailable to the agent (see Section 5).
*   **No Unauthorized Coding**: Do not code or modify anything without **explicit instruction** and **permission** from the user.
*   **Verification First**: Before acting, always verify the current state of the workspace (file existence, content, build status). Never assume prior steps were completed correctly due to potential context loss.
*   **Documentation Review**: Always review `wip.md` and other project definition documents before starting work to understand the current project state.
*   **WIP.md Workflow**: For every task:
    1.  Read `wip.md` first to understand current priorities and status
    2.  Update `wip.md` with new task information, including a timestamped entry (format: YYYY-MM-DD)
    3.  Complete the task as instructed
    4.  Report back to the user with results (findings or completion status)
    5.  Ask for explicit permission to commit and push changes
    6.  After receiving permission, commit and push the changes immediately (required for GitHub Pages testing)
    7.  Monitor the triggered build and verify it completes successfully using the Active Polling Loop
    8.  User tests the live site; upon approval, ask permission to check off the task in `wip.md`
    9.  Commit the `wip.md` update locally (no immediate push needed; it will be pushed with the next work cycle)
    10. Ensure all updates include timestamps going forward

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
        *   **Efficient API Query - CRITICAL**: Use `gh api` with `--jq` filtering ONLY. **NEVER use `curl`** - it is forbidden due to inefficiency and token waste. Retrieve ONLY the status and conclusion fields:
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

## 5. Project Management with GitHub Projects

**Cold Storage Protocol**: All non-current work is tracked in GitHub Projects, not in documentation files.

*   **GitHub Projects Board**: https://github.com/users/thalperi/projects/2 (Project name: "adamosophy")
*   **Purpose**: Centralized tracking for finished, pending, and paused work items
*   **Columns**:
    *   **Done**: Completed and verified tasks (moved here after build passes)
    *   **Backlog**: Pending or deprioritized items awaiting future work
    *   **Paused**: Temporarily halted items with intent to resume
    *   **Cancelled**: Abandoned work with reasoning documented in `decisions.md`
*   **wip.md Relationship**: Only **actively ongoing** tasks remain in `wip.md`. Everything else moves to GitHub Projects as "cold storage"
*   **Automated Management**: No automated task management rules (e.g., "older than 3 sessions"). Human judgment determines when to move items

**Workflow**:
1. When a task is completed and build verified → Move to GitHub Projects "Done" column
2. When a task is deprioritized → Move to "Backlog" or "Cancelled" column
3. When a task is paused → Move to "Paused" column with context notes
4. Document significant decisions in `decisions.md`, not in wip.md

---

## 6. The `incoming/` Folder - Unavailable to Agent

**CRITICAL: The `incoming/` folder is OFF LIMITS and unavailable to the agent while working on adamosophy.**

*   **Not Part of Active Workflow**: The `incoming/` folder is not part of the active project workflow and should not be referenced as such.
*   **Agent Access Restricted**: The agent cannot access, modify, or integrate any files from this folder.
*   **Documentation Focus**: All active project documentation is located at `/workspace/apps/web/src/content/docs/`. This is the **ONLY** directory where documentation files should be read from or written to during normal operations.
