# TODO: Migration to @opennextjs/cloudflare

**Priority:** P2 (Low)  
**Timeline:** 1-3 months  
**Status:** 📋 Planned

---

## Background

`@cloudflare/next-on-pages` is being deprecated in favor of `@opennextjs/cloudflare`, which offers better performance and more features.

**Current Package:** `@cloudflare/next-on-pages@1.13.16`  
**Target Package:** `@opennextjs/cloudflare` (latest)

**Reference:** https://www.npmjs.com/package/@cloudflare/next-on-pages

---

## Why Migrate?

1. **Official Recommendation:** Cloudflare recommends migrating to OpenNext
2. **Better Performance:** Improved edge runtime performance
3. **More Features:** Better support for Next.js 15+ features
4. **Active Development:** OpenNext is actively maintained
5. **Future-Proof:** Ensures long-term compatibility

---

## Current Status

**Working Perfectly:**
- ✅ Build time: 0.90s
- ✅ 39 prerendered routes
- ✅ 2 Edge Functions
- ✅ 1 Middleware (34.6 kB)
- ✅ No critical issues

**Reason for Delay:**
- Current setup works perfectly
- Migration requires testing
- No urgent need
- Focus on launch first

---

## Migration Plan

### Phase 1: Research (1 week)

1. **Read Documentation:**
   - OpenNext Cloudflare adapter docs
   - Migration guide
   - Breaking changes

2. **Check Compatibility:**
   - Next.js 15.5.2 support
   - Middleware compatibility
   - Edge Functions support
   - Static generation support

3. **Identify Risks:**
   - Breaking changes
   - Performance impact
   - Build time changes

### Phase 2: Testing (2 weeks)

1. **Local Testing:**
   ```bash
   # Install new package
   npm uninstall @cloudflare/next-on-pages
   npm install @opennextjs/cloudflare
   
   # Update build script
   # package.json: "pages:build": "opennextjs-cloudflare"
   
   # Test build
   npm run pages:build
   ```

2. **Verify Output:**
   - Check `.vercel/output/static` structure
   - Verify middleware works
   - Verify Edge Functions work
   - Verify static routes work

3. **Preview Deployment:**
   - Deploy to Cloudflare Pages preview
   - Test all functionality
   - Compare performance metrics

### Phase 3: Migration (1 week)

1. **Update Dependencies:**
   ```json
   {
     "devDependencies": {
       "@opennextjs/cloudflare": "latest"
     }
   }
   ```

2. **Update Build Script:**
   ```json
   {
     "scripts": {
       "pages:build": "opennextjs-cloudflare"
     }
   }
   ```

3. **Update Documentation:**
   - Update `CLOUDFLARE_DEPLOYMENT.md`
   - Update `docs/deployment.md`
   - Update `README.md`

4. **Test Thoroughly:**
   - Run full test suite
   - Manual testing
   - Performance testing

5. **Deploy:**
   - Deploy to production
   - Monitor for issues
   - Rollback plan ready

---

## Rollback Plan

If migration fails:

1. **Revert Dependencies:**
   ```bash
   npm uninstall @opennextjs/cloudflare
   npm install @cloudflare/next-on-pages@1.13.16
   ```

2. **Revert Build Script:**
   ```json
   {
     "scripts": {
       "pages:build": "npx @cloudflare/next-on-pages@1"
     }
   }
   ```

3. **Redeploy:**
   - Trigger new deployment
   - Verify working

---

## Success Criteria

Migration is successful if:

- ✅ Build completes without errors
- ✅ Build time ≤ 1.5s (current: 0.90s)
- ✅ All routes work correctly
- ✅ Middleware works correctly
- ✅ Edge Functions work correctly
- ✅ No new CSP violations
- ✅ No performance degradation
- ✅ Lighthouse scores maintained

---

## Resources

- **OpenNext Docs:** https://opennext.js.org/cloudflare
- **Migration Guide:** https://opennext.js.org/cloudflare/migration
- **GitHub:** https://github.com/opennextjs/opennextjs-cloudflare
- **Discord:** OpenNext community

---

## Notes

- **Not Urgent:** Current setup works perfectly
- **Low Risk:** Can be done gradually
- **High Reward:** Better long-term support
- **Timing:** After successful launch + 1 month stable operation

---

**Status:** 📋 **PLANNED FOR Q2 2025**

**Owner:** TBD  
**Reviewer:** TBD  
**Estimated Effort:** 2-4 weeks
