---
name: git
description: Safe, guided git operations for everyday workflows. Each action checks state, executes, and confirms. Designed for non-technical users.
---

# Git Operations

Safe, guided git workflows. Every action checks state first and uses conservative defaults.

## When to Activate

- User wants to save, push, or deploy their work
- User wants to pull latest changes or sync with remote
- User wants to start new work or create a branch
- User wants to merge work back to main
- User is confused about git state or has a git error

## Safety Rules (Always Enforced)

1. **Never work directly on main** — `start` always creates a feature branch
2. **Always pull --rebase** — never plain `pull` or `pull --merge`
3. **Always check state first** — every action starts with `git status`
4. **Never force-push** unless explicitly requested
5. **Never amend** commits already pushed to remote
6. **Tag naming** — always `v` prefix + semantic versioning (`v1.0.0`)
7. **Commit messages** — present tense, specific, under 72 characters

## Invocable Actions

### `save` — Save your work

Trigger: "save my work", "commit", "save changes"

1. Run `git status` to check what's changed
2. Run `git add .` to stage all changes
3. Ask user for commit message (suggest one based on changes)
4. Run `git commit -m "<message>"`
5. Show summary of what was committed

### `push` — Push your work to GitHub

Trigger: "push", "upload my changes", "push to remote"

1. Run `git status` to ensure there's something to push
2. Run `git push origin <current-branch>` to push to remote
3. Confirm what was pushed

### `deploy` — Deploy to production

Trigger: "deploy", "ship it", "go to production", "push a tag"

1. Run `git checkout main` to switch to main
2. Run `git pull --rebase origin main` to ensure main is fresh
3. Run `git tag -l` to check existing tags
4. Suggest next version tag based on existing tags (e.g., `v0.0.1` → `v0.1.0`)
5. Run `git tag v<X.Y.Z>` to create version tag
6. Run `git push origin v<X.Y.Z>` to push tag and trigger deploy
7. Confirm deployment triggered

### `sync` — Get latest changes from GitHub

Trigger: "pull", "get latest", "sync", "update"

1. Run `git status` to check for uncommitted changes
2. If dirty: run `git stash` to save changes temporarily
3. Run `git pull --rebase origin main` to pull with rebase
4. If stashed: run `git stash pop` to restore changes
5. Confirm what was pulled

### `start` — Start new work on a feature branch

Trigger: "start new work", "new branch", "create branch", "start feature"

1. Run `git checkout main` to switch to main
2. Run `git pull --rebase origin main` to ensure main is fresh
3. Ask user for branch name (suggest format: `feature/description` or `fix/description`)
4. Run `git checkout -b <branch-name>` to create feature branch
5. Run `git push -u origin <branch-name>` to push branch to remote
6. Confirm branch created and ready

### `finish` — Merge feature branch to main

Trigger: "I'm done", "merge to main", "finish work", "merge branch"

1. Run `git status` to ensure no uncommitted changes
2. If dirty: ask user to `save` first
3. Run `git checkout main` to switch to main
4. Run `git pull --rebase origin main` to ensure main is fresh
5. Run `git merge <feature-branch>` to merge feature branch
6. Run `git push origin main` to push merged changes
7. Run `git branch -d <feature-branch>` to delete local branch
8. Run `git push origin --delete <feature-branch>` to delete remote branch
9. Confirm merge complete

### `status` — Check what's going on

Trigger: "status", "what's going on", "where am I", "check state"

1. Run `git status` to see what's changed
2. Run `git log --oneline -5` to show recent commits
3. Run `git branch -vv` to show current branch and tracking
4. Run `git tag -l` to show existing tags
5. Present a clear summary

### `recover` — Fix a git problem

Trigger: "git is broken", "help", "error", "something went wrong", "conflict"

1. Run `git status` to diagnose the issue
2. Based on the error, apply the appropriate fix:
   - **Branch behind**: run `git pull --rebase origin main`
   - **Branch diverged**: run `git pull --rebase origin main`, guide through conflict resolution
   - **Uncommitted changes blocking**: run `git stash` → pull → `git stash pop`
   - **Merge conflict**: guide user through resolving conflicts, then `git add .` and `git rebase --continue`
3. Confirm resolution

## How to Map User Intent

| User says | Action |
|---|---|
| "Save my work" / "Commit" / "Save changes" | `save` |
| "Push" / "Upload" / "Send to GitHub" | `push` |
| "Deploy" / "Ship it" / "Production" / "Tag" | `deploy` |
| "Pull" / "Get latest" / "Sync" / "Update" | `sync` |
| "Start new work" / "New branch" / "Create branch" | `start` |
| "I'm done" / "Merge" / "Finish" / "Merge to main" | `finish` |
| "Status" / "What's going on" / "Where am I" | `status` |
| "Help" / "Error" / "Broken" / "Conflict" | `recover` |
