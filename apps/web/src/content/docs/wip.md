---
title: "Work in Progress"
description: "Current development status and active tasks for the documentation system."
sortOrder: 0
draft: false
---

# Work in Progress

This document tracks **actively ongoing** development work for the Adamosophy documentation system.

## Stale Information Policy

**CRITICAL: This document must reflect ONLY what is actively "in progress" NOW.**

### Criteria for Removing Information

Remove content from this document when ANY of these conditions are met:

1. **Completed & Verified**: Task is done, build passed, and user confirmed acceptance
   - Move to GitHub Projects board (adamosophy) under "Done" column
   - Do NOT keep completed checkboxes here as a work log

2. **Abandoned or Deprioritized**: Work was started but stopped without completion
   - Move to GitHub Projects board (adamosophy) under "Backlog" or "Cancelled" column
   - Document reasoning in `decisions.md` if significant architectural decision

3. **Superseded**: Approach was changed or solution was replaced
   - Document the final approach in relevant technical docs (`ui.md`, `settings.md`, etc.)
   - Move old approach notes to GitHub Projects if reference needed
   - Remove the abandoned approach from this document

### Learning Capture Protocol

If you struggled with something and learned important lessons:
- **Do NOT** leave the struggle narrative in `wip.md`
- **DO** document key learnings in:
  - `decisions.md` for architectural choices
  - `agent.md` for operational lessons
  - Inline code comments for implementation specifics
- Then remove the entire episode from `wip.md`

### GitHub Projects Integration

**Cold Storage Protocol**: All non-current activity moves to GitHub Projects:
- **Finished work**: Move to "Done" column after verification
- **Pending/Backlog items**: Move to "Backlog" column
- **Paused items**: Move to "Paused" column with context notes
- **Active work only stays here**: Only tasks being worked on *right now* remain in wip.md

GitHub Project Board: https://github.com/users/thalperi/projects/2

**Remember**: `wip.md` is a current status dashboard, NOT a project diary, changelog, or work log.

---

## Currently Active Tasks

Tasks being worked on in the current session:

- [ ] Implement GitHub integration for actual file updates
  - Install `octokit` and `gray-matter` packages
  - Update API endpoints to commit/push changes back to repo
  - Test end-to-end workflow with build verification

- [ ] Add image upload and optimization logic
  - Implement file storage in `/api/upload-image`
  - Add automatic resizing to optimal dimensions (400x250px for cards)
  - Convert images to WebP format
  - Store optimized images in `/public/docs/images/`

- [ ] Implement remaining Markdown rendering options
  - [ ] Option 2: remark/rehype ecosystem solution
  - [ ] Option 3: @tailwindcss/typography with prose class
  - [ ] Add tristate toggle in drawer for renderer selection
  - [ ] Integrate with user settings profile section

- [ ] Implement Dark Mode theme system
  - Reference: ui.md (color specs), settings.md (theme selection requirement)
  - Create theme context/store for Light/Dark/System preference
  - Apply dark mode color palette from ui.md (#313539 bg, #3d4347 surface, etc.)
  - Add system preference detection via prefers-color-scheme
  - Implement manual override toggle in UI
  - Ensure optimal readability adjustments across all components
  - Test all pages and components in both themes

---

## Notes & Context

Reference information for active tasks:

- **GitHub Integration**: Changes made via UI (reordering, metadata edits) will commit directly to `main` branch using PAT, triggering automatic rebuilds
- **Image Handling**: Smart resizing and WebP conversion for performance optimization
- **Markdown Rendering**: Three optional rendering methods with user preference stored in settings
- **Build Verification**: All commits must pass GitHub Actions build before task completion confirmation
- **Project Management**: Non-current work is tracked in GitHub Projects (cold storage): https://github.com/users/thalperi/projects/2

---

*Last Updated: 2026-01-14*
*Next Review: Beginning of next session - apply stale information criteria*

