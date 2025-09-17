# Branch Management Guide

This guide explains how to properly manage branches to prevent commit accumulation and maintain clean deployment history.

## 🎯 Branch Strategy

### **Main Branches**

- **`main`**: Production branch, auto-deploys to production
- **`preview`**: Integration branch, auto-creates PRs to main

### **Feature Branches**

- **`feature/issue-123-description`**: Development branches
- **`bugfix/issue-456-description`**: Bug fix branches
- **`hotfix/issue-789-description`**: Critical fixes

## 🚀 Workflow Process

### **1. Starting New Work**

```bash
# Always start from clean preview branch
git checkout preview
git pull origin preview
git checkout -b feature/issue-123-add-hover-effects
```

### **2. Development Process**

```bash
# Make commits with clear messages
git add .
git commit -m "feat: add hover effects to buttons"
git commit -m "fix: resolve tooltip positioning"
git commit -m "style: improve mobile responsiveness"
```

### **3. Creating Pull Request**

```bash
# Push feature branch
git push origin feature/issue-123-add-hover-effects

# Create PR: feature/issue-123 → preview
# Use the PR template with proper description
```

### **4. After PR Merge**

```bash
# Delete local feature branch
git checkout preview
git pull origin preview
git branch -d feature/issue-123-add-hover-effects

# Delete remote feature branch
git push origin --delete feature/issue-123-add-hover-effects
```

## 🧹 Preventing Commit Accumulation

### **What Causes the Problem**

- ❌ Merging feature branches without squashing
- ❌ Not cleaning up preview branch after deployments
- ❌ Creating merge commits instead of fast-forward merges
- ❌ Not deleting old feature branches

### **How to Prevent It**

#### **1. Always Use Squash Merges**

When merging PRs, use "Squash and merge" to:

- Combine all commits into one clean commit
- Remove merge commits
- Keep history clean

#### **2. Regular Preview Branch Cleanup**

The automated cleanup workflow will:

- Reset preview branch to match main after each deployment
- Remove all accumulated merge commits
- Keep preview branch clean for new features

#### **3. Feature Branch Best Practices**

```bash
# Good: Clean feature branch
feature/issue-123-add-hover-effects
├── feat: add hover effects to buttons
├── fix: resolve tooltip positioning
└── style: improve mobile responsiveness

# Bad: Messy feature branch
feature/issue-123-add-hover-effects
├── WIP: working on hover effects
├── fix: typo
├── fix: another typo
├── Merge branch 'main' into feature/issue-123
├── fix: resolve conflicts
└── feat: add hover effects to buttons
```

## 🔧 Manual Cleanup (If Needed)

### **Reset Preview Branch**

```bash
# If preview branch gets messy
git checkout preview
git reset --hard origin/main
git push origin preview --force
```

### **Clean Up Feature Branches**

```bash
# Delete merged feature branches
git branch --merged | grep -v main | grep -v preview | xargs -n 1 git branch -d

# Delete remote branches
git remote prune origin
```

## 📋 Checklist for Each Feature

- [ ] Create feature branch from clean preview
- [ ] Make focused, atomic commits
- [ ] Use clear commit messages
- [ ] Create PR to preview (not main)
- [ ] Use squash merge when merging
- [ ] Delete feature branch after merge
- [ ] Verify preview branch stays clean

## 🚨 Warning Signs

Watch out for these signs that indicate branch management issues:

- Preview branch has many merge commits
- Auto-deploy PRs show 20+ commits
- Feature branches have "Merge branch 'main'" commits
- Old feature branches still exist after merging
- Preview branch is behind main

## 🛠️ Automated Solutions

The repository includes automated workflows to prevent these issues:

1. **Auto-Deploy Workflow**: Creates clean PRs from preview to main
2. **Cleanup Workflow**: Resets preview branch after successful merge
3. **Squash Merge**: Automatically squashes commits when merging

## 📚 Additional Resources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Git Squash and Merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits)
- [Git Branch Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)

---

**Remember**: Clean branches = Clean deployments = Happy developers! 🎉
