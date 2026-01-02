# UI Migration Notes: Base UI Transition

This document tracks the comprehensive overhaul of our UI components to use [Base UI](https://base-ui.com/).

## Core Components Migrated
- **Button**: Replaced with @base-ui/react/button. Supports primary, secondary, outline, ghost, and danger variants with standard sm, md, lg, and icon sizes.
- **Input**: Reimplemented using @base-ui/react/input and @base-ui/react/field. Now includes built-in support for accessible labels, descriptions, and error states.
- **Badge**: Standardized to use project-wide CSS variables for automatic Light/Dark mode support.
- **InlineCode**: A new reusable component for technical references (packages/shared, etc.), providing a distinct Indigo-themed monospaced look.

## Key Improvements
- **Accessibility**: Navbar and Form elements now adhere to W3C ARIA standards. Fixed generic nav structures and ensured correct list nesting.
- **Consistency**: Unified the look and feel of the Tech Stack cards across the Home and Features pages.
- **Modernized Design**: Enhanced the Documentation page with modern step indicators and a consistent code block theme.
- **Theme Support**: All new components are fully reactive to the project's CSS-variable-based theme system.

## Technical Fixes
- Resolved a conflict between Vitest and Playwright by excluding the e2e/ directory from the Vitest config.
- Corrected rendered backslashes in description text by using proper React node structures instead of escaped strings.
