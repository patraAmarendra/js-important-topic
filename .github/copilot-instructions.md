# Project Guidelines

## Overview

This is a JavaScript learning and interview preparation repository. All code examples and explanations should prioritize clarity, correctness, and educational value.

## Code Style

- Use ES6+ syntax (const/let, arrow functions, template literals, destructuring)
- Prefer `const` over `let`; never use `var`
- Use meaningful, descriptive variable and function names
- Add concise inline comments explaining _why_, not _what_, for non-obvious logic
- Use semicolons consistently
- Use 2-space indentation
- Prefer single quotes for strings

## Code Suggestions

- Always provide working, runnable code examples
- Include `console.log` output comments so readers can verify behavior without running code
- When demonstrating a concept, show both the correct approach and common pitfalls
- For interview-style questions, include the expected output and a brief explanation
- Prefer pure functions and avoid side effects unless the topic requires them
- Show polyfill implementations with spec-compliant behavior
- When suggesting alternatives, explain trade-offs (readability, performance, browser support)

## Code Review

- Flag use of `var` — suggest `const` or `let` instead
- Flag `==` — suggest `===` unless the example specifically demonstrates type coercion
- Flag mutation of function parameters unless intentional and documented
- Ensure all Promises have proper error handling (`.catch` or try/catch with async/await)
- Verify `this` binding is explicit and correct (call/apply/bind or arrow functions)
- Check for potential memory leaks in closures and event listeners
- Ensure examples handle edge cases (empty arrays, null/undefined, NaN)

## Documentation

- Use Markdown for all explanatory content
- Structure topics with clear headings: Concept → Syntax → Examples → Interview Questions
- Mark difficulty levels: `Beginner`, `Intermediate`, `Advanced`
- Mark interview questions with the 🔍 icon
- Include links to MDN or ECMAScript spec for further reading when relevant

## File Naming Conventions

- Use kebab-case for all file names (e.g., `call-apply-bind.md`, `event-loop.js`)
- Use lowercase only — no uppercase letters in file or folder names
- Markdown explanation files use the `.md` extension
- Runnable code examples use the `.js` extension
- Name files after the concept they cover (e.g., `closure.md`, `prototype.js`)
- Use hyphens (`-`) to separate words, never underscores (`_`) or spaces
- Polyfill files should clearly indicate the method (e.g., `array-map.js`, `promise-all.js`)
- Folder names use camelCase for topic grouping (e.g., `dataTypes/`, `function/`)
- Keep file names concise but descriptive — avoid abbreviations unless widely known (e.g., `DOM`, `API`)

## Conventions

- Each topic folder contains `.md` files for explanations and `.js` files for runnable examples
- Polyfill implementations go in the `polyfill/` directory
- Code blocks in Markdown must specify the language (```javascript)
-
