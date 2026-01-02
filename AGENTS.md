# Project Guidelines

## Definition of Done

Before considering any task, feature, or bug fix "done", you MUST:

1.  **Run the Preflight Script**: Execute `pnpm preflight` from the root of the workspace.
2.  **Fix All Issues**:
    - All **Type Errors** must be resolved (including those in root scripts).
    - All **Linting Warnings and Errors** must be fixed.
    - All **Tests** must pass.
3.  **Ensure Formatting**: The code must be formatted according to the project's Prettier configuration (this is handled automatically by the preflight script).

Do not submit code or mark a task as complete if the `pnpm preflight` command fails or reports any issues.

## AI Agent Context

This project includes specialized context files for AI agents to ensure consistency and quality:

- **Base UI**: Current documentation and usage patterns for our UI components can be found in `.gemini/base-ui.llms.txt`. Use this as the primary reference for all UI-related tasks.
