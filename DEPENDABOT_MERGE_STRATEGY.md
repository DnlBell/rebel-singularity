# Dependabot PR Merge Strategy

**Total PRs**: 16 open  
**Created**: May 10, 2026  
**Target**: Safely merge all updates while maintaining stability

---

## Risk Assessment

### 🔴 HIGH RISK (Major version bumps)
- **react-scripts**: 2.1.8 → 5.0.1 (3 major versions)
  - Breaking changes in build system, webpack config, babel
  - Affects: #12, #11, #10, #9, #4, #3
  - **Impact**: Major refactor may be needed

- **@babel/runtime-corejs2**: 7.2.0 → 7.26.10 (PR #1)
  - Significant version jump
  - Possible breaking changes in transpilation

### 🟡 MEDIUM RISK (Security fixes with changes)
- **lodash**: 4.17.11 → 4.17.23 (PR #13)
  - Security vulnerability fixed
  - Check for API changes
- **js-yaml**: 3.13.1 → 3.14.2 (PR #8)
  - Security: Prototype pollution fix
- **brace-expansion**: 1.1.11 → 1.1.12 (PR #5)
  - ReDoS vulnerability fix

### 🟢 LOW RISK (Patch/minor versions)
- **url-parse**: 1.4.6 → 1.5.10 (PR #15)
- **diff**: 3.5.0 → 3.5.1 (PR #14)
- **semver**: 5.7.0 → 5.7.2, 6.0.0 → 6.3.1 (PR #16)
- **sha.js**: 2.4.11 → 2.4.12 (PR #7)
- **cipher-base**: 1.0.4 → 1.0.6 (PR #6)
- **pbkdf2**: 3.0.17 → 3.1.3 (PR #2)

---

## Merge Strategy (Phased Approach)

### Phase 1: Security Patches (Low Risk) - MERGE FIRST
**Conservative approach: 1-2 per day for testing**

**Batch 1A (Independent patches):**
```
- #16 semver
- #15 url-parse  
- #7 sha.js
- #6 cipher-base
```

**Steps:**
1. Merge #16 and #15 together (no conflicts expected)
2. Wait 1-2 hours, test locally: `npm install && npm test`
3. If passes, merge #7 and #6

**Batch 1B (Security-critical):**
```
- #8 js-yaml (prototype pollution)
- #5 brace-expansion (ReDoS)
- #13 lodash (security)
```

**Steps:**
1. Merge #8 first (most critical)
2. Test: `npm test`
3. If OK, merge #5 and #13 together

**Batch 1C (Minor updates):**
```
- #14 diff
- #2 pbkdf2
```

---

### Phase 2: Mid-Level Updates (Moderate Risk)
**These touch the build system or core dependencies**

**Batch 2A:**
```
- #1 @babel/runtime-corejs2 (7.2.0 → 7.26.10)
```

**Steps:**
1. Merge alone
2. Run: `npm install && npm test`
3. Check transpilation: `npm run build`
4. **Review build output for size changes or errors**

**Estimated time**: 2-3 hours, test thoroughly

---

### Phase 3: React-Scripts Major Upgrade (HIGHEST RISK)
**react-scripts 2.1.8 → 5.0.1 = MASSIVE CHANGES**

#### Pre-merge checklist:
- [ ] Backup current `package-lock.json`
- [ ] Have a clean git branch to revert to
- [ ] Review breaking changes: https://github.com/facebook/create-react-app/releases
- [ ] Check Node version compatibility (CRA 5.0 requires Node 14+)

#### Recommended order (5 dependent PRs):
```
#3   on-headers + compression
#9   node-forge + react-scripts
#10  qs + react-scripts  
#12  tar + react-scripts (tar removal)
#11  diff + react-scripts (diff removal)
#4   form-data + react-scripts
```

#### Strategy: Merge one at a time

**Step 1: Merge #3 (on-headers + compression)**
```bash
# Low risk, prep work
# Just dependency version bumps
npm install && npm test
```

**Step 2: Merge #9 (node-forge → 1.3.2 + react-scripts)**
```bash
npm install && npm test && npm run build
# Check for webpack/babel errors
# Verify bundle size hasn't exploded
```

**Step 3: Merge #10 (qs → 6.14.1 + react-scripts)**
```bash
npm install && npm test && npm run build
```

**Step 4: Merge #12 (remove tar + react-scripts)**
```bash
# Verify tar is truly no longer needed
npm install && npm test && npm run build
# Check for any 'tar' imports in codebase
```

**Step 5: Merge #11 (remove diff + react-scripts)**
```bash
# Verify diff is truly no longer needed
npm install && npm test && npm run build
# Check for any 'diff' imports in codebase
```

**Step 6: Merge #4 (form-data → 3.0.4 + react-scripts)**
```bash
npm install && npm test && npm run build
```

---

## Testing Protocol

### After each merge:
```bash
# 1. Clean install
rm -r node_modules
npm install

# 2. Run tests
npm test

# 3. Build for production
npm run build

# 4. Check bundle size
ls -lh build/static/

# 5. Start dev server (manual test)
npm start
# Visit http://localhost:3000
# Test core gameplay features
```

### After Phase 3 complete:
- [ ] Full test suite passes
- [ ] App starts without errors
- [ ] No console warnings
- [ ] Build completes successfully
- [ ] Manual gameplay testing (create character, move rooms, combat)

---

## Rollback Plan

If any phase fails:

```bash
# See recent commits
git log --oneline -10

# Revert last merge commit
git revert -m 1 <merge-commit-hash>

# OR hard reset to last working state
git reset --hard <stable-commit-hash>

# Reinstall from lock file
npm ci
```

---

## Timeline

| Phase | Duration | Risk | Action |
|-------|----------|------|--------|
| 1A | 30 min | Low | Merge 4 PRs together |
| Wait | 2 hrs | - | Test locally |
| 1B | 1 hr | Medium | Merge 3 security PRs |
| Wait | 2 hrs | - | Test locally |
| 1C | 30 min | Low | Merge 2 PRs |
| **Total Phase 1** | **~6 hours** | **Low-Medium** | - |
| 2A | 3 hrs | Medium | Merge & test @babel |
| **Total Phase 2** | **~3 hours** | **Medium** | - |
| 3 (per PR) | 1-2 hrs each | **HIGH** | One at a time |
| **Total Phase 3** | **~12 hours** | **HIGH** | 6 PRs @2hrs each |
| **TOTAL TIME** | **~21 hours** | - | Can be split over 2-3 days |

---

## Alternative: Fast-Track Strategy

If you want to merge faster with higher risk:

1. **Merge all independent PRs #1, #2, #5-7, #14-16** (10 PRs at once)
   - Test thoroughly
   
2. **Merge security-critical #8, #13** 
   - Test

3. **Merge all react-scripts PRs #3, #4, #9-12** together
   - Single large merge
   - Requires more debugging if something breaks

**Pros**: Done in 1 day  
**Cons**: Harder to pinpoint which PR broke something

---

## Recommended Action

**Conservative + Practical Approach:**

### Day 1 (Morning):
- Merge Phase 1A (4 low-risk patches)
- Test 2 hours
- Merge Phase 1B (3 security fixes)
- Test 2 hours

### Day 1 (Afternoon):
- Merge Phase 1C (2 minor updates)
- Merge Phase 2A (@babel single PR)
- Test thoroughly (3 hours)

### Day 2:
- Start Phase 3 (react-scripts migration)
- Merge #3-4, test
- Merge #9, test
- Merge #10, test
- Merge #11-12, test  
- Merge #4, test

### Day 3:
- Full regression testing
- Verify all features work
- Commit final state

---

## Next Steps

1. **Run Phase 1A immediately** (safest option)
   ```bash
   # Merge all low-risk patches together
   git pull origin dependabot/npm_and_yarn/semver
   git pull origin dependabot/npm_and_yarn/url-parse-1.5.10
   git pull origin dependabot/npm_and_yarn/sha.js-2.4.12
   git pull origin dependabot/npm_and_yarn/cipher-base-1.0.6
   ```

2. **Run tests**
   ```bash
   npm ci
   npm test
   npm run build
   ```

3. **If Phase 1A passes**, proceed to Phase 1B

---

## Monitoring

Track PR merge status here as you go:

- [ ] Phase 1A: semver, url-parse, sha.js, cipher-base
- [ ] Phase 1B: js-yaml, brace-expansion, lodash  
- [ ] Phase 1C: diff, pbkdf2
- [ ] Phase 2A: @babel/runtime-corejs2
- [ ] Phase 3: #3, #9, #10, #12, #11, #4

---

## References

- [CRA 5.0 Breaking Changes](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md)
- [Node.js 14+ Requirements](https://nodejs.org/en/download/)
- [npm ci vs npm install](https://docs.npmjs.com/cli/v8/commands/npm-ci)
