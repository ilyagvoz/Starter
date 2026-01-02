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

- **Base UI**: Current documentation and usage patterns for our UI components can be found in `llms/base-ui.llms.txt`. Use this as the primary reference for all UI-related tasks.

## Software Releases

When performing a software release, follow these steps strictly:

1.  **Prepare Branch**: Ensure you are on the `main` branch and have pulled the latest changes from the remote repository.
2.  **Versioning**: 
    - Determine the next version number according to Semantic Versioning.
    - Update the `"version"` field in the root `package.json` and **all** sub-package `package.json` files (found in `apps/` and `packages/`).
3.  **Commit & Push**:
    - Stage all changed `package.json` files.
    - Commit with the message: `chore: bump version to X.Y.Z`.
    - Push the changes to the `main` branch.
4.  **Git Tagging**:
    - Create a new tag: `git tag vX.Y.Z`.
    - Push the tag to GitHub: `git push origin vX.Y.Z`.
5.  **GitHub Release**:
    - Use the GitHub CLI (`gh`) to create a formal release with a title and detailed release notes:
      ```bash
      gh release create vX.Y.Z --title "vX.Y.Z: [Short Title]" --notes "[Detailed highlights and changelog]"
      ```
