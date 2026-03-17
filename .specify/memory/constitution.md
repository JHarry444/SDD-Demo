<!--
Sync Impact Report
- Version change: N/A (template) -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Functional Correctness Is Non-Negotiable
	- Template Principle 2 -> II. Readability Over Cleverness
	- Template Principle 3 -> III. Testability by Design
	- Template Principle 4 -> IV. Small, Safe, Incremental Change
	- Template Principle 5 -> V. Explicit Contracts and Observable Behavior
- Added sections:
	- Engineering Standards
	- Development Workflow & Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending (directory not present): .specify/templates/commands/*.md
- Deferred TODOs:
	- None
-->

# sdd-prac Constitution

## Core Principles

### I. Functional Correctness Is Non-Negotiable
Every production change MUST preserve or improve functional correctness for the
target behavior. New behavior MUST be specified with acceptance criteria before
implementation, and code MUST not be merged if key scenarios are ambiguous or
unverifiable. Rationale: reliable software is the baseline for all other
quality goals.

### II. Readability Over Cleverness
Code MUST optimize for clarity to a new team member: descriptive names, small
units of behavior, explicit control flow, and minimal hidden side effects.
Complex logic MUST include concise intent-focused comments and be decomposed
into testable units. Rationale: readable code reduces defects and shortens
review, onboarding, and incident resolution time.

### III. Testability by Design
Designs MUST enable deterministic automated testing at unit and integration
levels. Each user story MUST define independent acceptance tests, and each bug
fix MUST include a regression test that fails before the fix and passes after.
Rationale: testability is the fastest route to confidence and safe iteration.

### IV. Small, Safe, Incremental Change
Work MUST be delivered in small vertical slices that can be validated and
rolled back independently. Pull requests MUST declare scope boundaries and avoid
bundling unrelated refactors with feature behavior changes. Rationale: smaller
changes reduce review risk and speed up defect isolation.

### V. Explicit Contracts and Observable Behavior
Interfaces, data shapes, and failure modes MUST be explicit at boundaries.
Behavioral changes to public contracts MUST include compatibility notes and
tests that capture the contract. Logs and errors MUST be actionable for local
debugging and CI failure diagnosis. Rationale: explicit contracts and
observability prevent integration drift and hidden regressions.

## Engineering Standards

- Keep modules cohesive and keep dependencies directional and minimal.
- Prefer pure functions or side-effect-limited services where practical.
- Fail fast on invalid input with clear, stable error messages.
- Use formatting and linting tools consistently; warnings that affect
	readability or correctness MUST be resolved before merge.

## Development Workflow & Quality Gates

- Specification gate: each feature spec MUST include independently testable user
	stories and measurable success criteria.
- Plan gate: implementation plans MUST pass Constitution Check before design and
	after design updates.
- Implementation gate: tests for changed behavior MUST be added or updated in
	the same change set.
- Review gate: at least one reviewer MUST verify readability, test coverage
	intent, and contract impact notes.
- Release gate: all required automated checks MUST pass in CI before merge.

## Governance

This constitution supersedes local habits and informal practices for this
repository.

- Amendment procedure: changes require a documented proposal, impact summary,
	and approval in a pull request.
- Versioning policy:
	- MAJOR for incompatible governance or principle redefinitions/removals.
	- MINOR for new principles/sections or materially expanded obligations.
	- PATCH for clarifications and editorial refinements without semantic impact.
- Compliance review expectations: every PR review MUST include an explicit
	constitution compliance check, and planning artifacts MUST reference relevant
	gates.

**Version**: 1.0.0 | **Ratified**: 2026-03-17 | **Last Amended**: 2026-03-17
