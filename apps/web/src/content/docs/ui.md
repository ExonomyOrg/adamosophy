# User Interface Architecture

## Overview

This document defines the user interface architecture for Adamosophy, drawing inspiration from modern platform design patterns including Couchers.org's component-driven approach and Google Docs' document management interface.

## Design Principles

### 1. Component-Driven Architecture
- **Modular Components**: Build UI from reusable, self-contained components
- **Clear Separation**: Separate layout, feature, and utility components
- **Consistent Patterns**: Use established patterns for navigation, forms, and data display

### 2. Responsive & Accessible
- **Mobile-First**: Design for mobile touch interactions first, enhance for desktop
- **Progressive Enhancement**: Core functionality works without JavaScript
- **WCAG Compliance**: Ensure all interactive elements are keyboard accessible

### 3. Performance-Oriented
- **Static-First**: Leverage Astro's static generation for optimal performance
- **Client Hydration**: Use `client:` directives strategically for interactive components
- **Lazy Loading**: Defer non-critical resources until needed

## Layout System

### Sidebar Navigation

#### Structure
```
┌─────────────────────────────────────┐
│ [Logo]                    [User]    │
├───────────┬─────────────────────────┤
│           │                         │
│  Docs     │   Main Content Area     │
│  Events   │                         │
│  Groups   │   (Resizable)           │
│  Messages │                         │
│           │                         │
└───────────┴─────────────────────────┘
```

#### Specifications
- **Default Width**: 21rem (280px base + 30% expansion)
- **Resizable Range**: 200px - 600px
- **Resize Handle**: Right edge, appears on hover
- **Touch Support**: Drag handles for mobile reordering
- **Persistence**: Width saved to localStorage

#### Interactive Features
1. **Drag-and-Drop Reordering**
   - Grab handle appears on hover next to each item
   - Visual feedback during drag (opacity + background highlight)
   - Touch support for mobile devices

2. **Accordion Editor**
   - Dropdown arrow appears on hover
   - Inline editing for title, description, image
   - Save button with status feedback

3. **Resize Handle**
   - Appears on right edge hover
   - Blue highlight on active
   - Smooth width transition
   - Minimum/maximum constraints enforced

### Top Navigation Bar
- Height: 4rem (desktop), 3.5rem (mobile)
- Contains: Logo, search, user menu, notifications
- Sticky positioning on scroll

## Document Gallery

### View Modes

#### Card View (Default)
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│  Image  │ │  Image  │ │  Image  │
│ Title   │ │ Title   │ │ Title   │
│ Desc... │ │ Desc... │ │ Desc... │
│ [Edit]  │ │ [Edit]  │ │ [Edit]  │
└─────────┘ └─────────┘ └─────────┘
```
- Grid layout (responsive columns)
- Thumbnail preview
- Title and description excerpt
- Action buttons on hover

#### List View
```
┌──────────────────────────────────────┐
│ [Img] Document Title      [Actions]  │
│       Description excerpt...         │
├──────────────────────────────────────┤
│ [Img] Another Document    [Actions]  │
│       More description...            │
└──────────────────────────────────────┘
```
- Horizontal layout
- Larger thumbnail
- Full-width rows
- Actions aligned right

### Toggle Behavior
- Button in top-right corner of gallery
- Icon switches between grid/list
- Preference saved to localStorage
- Smooth transition animation

## Color System

### Primary Palette
- **Primary**: #6bc4a6 (teal green)
- **Primary Light**: #8fd4ba
- **Primary Dark**: #00a398

### Secondary Palette
- **Secondary**: #fe982a (orange)
- **Secondary Light**: #ffad52
- **Secondary Dark**: #e47701

### Neutral Colors
- **Background**: #313539 (dark mode)
- **Surface**: #3d4347
- **Text Primary**: #ffffff
- **Text Secondary**: rgba(255, 255, 255, 0.7)
- **Divider**: rgba(255, 255, 255, 0.12)

### Semantic Colors
- **Success**: Green tones for completed actions
- **Warning**: Orange/yellow for cautions
- **Error**: Red for failures
- **Info**: Blue for informational messages

## Typography

### Font Stack
- Primary: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- Monospace: For code snippets and technical content

### Scale
- **H1**: 2.5rem (40px)
- **H2**: 2rem (32px)
- **H3**: 1.5rem (24px)
- **H4**: 1.25rem (20px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

## Component Library

### Buttons
- **Primary**: Filled with primary color
- **Secondary**: Outlined or text-only
- **Icon**: Square aspect ratio, icon only
- **Sizes**: Small, medium, large
- **States**: Default, hover, active, disabled, loading

### Forms
- **Input Fields**: Clear labels, helpful placeholders
- **Validation**: Real-time feedback, clear error messages
- **Submit Buttons**: Prominent placement, loading states

### Cards
- **Elevation**: Subtle shadow for depth
- **Border Radius**: 4px consistent across components
- **Padding**: Consistent spacing using 0.5rem units
- **Hover States**: Slight elevation increase

### Dialogs/Modals
- **Overlay**: Semi-transparent backdrop
- **Focus Trap**: Keyboard navigation within modal
- **Dismiss**: Click outside, ESC key, or close button
- **Animations**: Smooth fade/slide transitions

## Interaction Patterns

### Drag-and-Drop
1. **Initiation**: Grab handle appears on hover
2. **Feedback**: Opacity change + background highlight
3. **Placeholder**: Shows drop location
4. **Completion**: Smooth animation to new position

### Resizing
1. **Activation**: Cursor changes on hover over resize handle
2. **Feedback**: Blue highlight on handle, live width update
3. **Constraints**: Min/max width enforced
4. **Persistence**: Saved to localStorage on release

### Loading States
- **Skeleton Screens**: For content loading
- **Spinners**: For actions and transitions
- **Progress Bars**: For multi-step processes
- **Optimistic Updates**: Show changes immediately, revert on error

### Error Handling
- **Inline Errors**: Next to problematic fields
- **Toast Notifications**: For action results
- **Retry Options**: When operations fail
- **Graceful Degradation**: Core features remain functional

## Responsive Breakpoints

Based on Couchers.org's approach:
- **XS**: < 600px (mobile phones)
- **SM**: 600px - 960px (tablets)
- **MD**: 960px - 1280px (small laptops)
- **LG**: 1280px - 1920px (desktops)
- **XL**: > 1920px (large screens)

## Accessibility Requirements

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip links for main content

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images
- Live regions for dynamic content

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Don't rely on color alone for information

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.astro
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Dialog.astro
│   │   └── ...
│   └── features/
│       ├── DocumentGallery.astro
│       ├── DocumentCard.astro
│       ├── ResizeHandle.astro
│       └── ...
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── api/
│   │   ├── update-doc-metadata.ts
│   │   ├── update-doc-order.ts
│   │   └── upload-image.ts
│   └── docs/
│       └── index.astro
└── styles/
    └── global.css
```

## State Management

### Client-Side State
- **localStorage**: User preferences (sidebar width, view mode)
- **Component State**: Temporary UI state (dragging, editing)
- **Optimistic Updates**: Immediate UI feedback before server confirmation

### Server Communication
- **API Routes**: RESTful endpoints for CRUD operations
- **Error Handling**: Graceful fallbacks on failure
- **Loading States**: Visual feedback during operations

## Testing Guidelines

### Visual Regression
- Screenshot testing for key components
- Cross-browser verification
- Responsive layout testing

### Interaction Testing
- Drag-and-drop functionality
- Resize behavior
- Keyboard navigation
- Touch gestures on mobile

### Performance Testing
- Lighthouse scores target: 90+
- Time to Interactive: < 3.5s
- First Contentful Paint: < 1.5s

## Future Enhancements

1. **Dark/Light Theme Toggle**
2. **Customizable Sidebar Items**
3. **Advanced Search & Filtering**
4. **Document Tags & Categories**
5. **Collaborative Editing Indicators**
6. **Real-time Sync Visualization**
7. **Offline Support with PWA**

## References

- [Couchers.org Web App](https://github.com/Couchers-org/couchers/tree/develop/app/web)
- [Astro Documentation](https://docs.astro.build)
- [Material Design System](https://material.io/design)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Docs UI Patterns](https://www.google.com/docs/about/)
