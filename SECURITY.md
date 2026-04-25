## Security Enhancements Documentation

### 1. Rate Limiting on Admin Login

**File:** `/lib/security/rate-limit.ts`
- Implements in-memory rate limiting with a Map store
- **Limits:** 5 failed attempts per IP in 15-minute windows
- **Block Duration:** 15 minutes after reaching the limit
- **Location:** Tracks by IP (extracted from headers: `x-forwarded-for` or `x-real-ip`)

**Implementation:**
- `checkRateLimit(ip)`: Check if an IP is allowed to attempt login
- `recordFailedAttempt(ip)`: Record a failed login attempt
- `resetRateLimit(ip)`: Clear rate limit after successful login

**UI Feedback:** Login page displays countdown timer and blocks input when rate-limited.

---

### 2. HTML Content Sanitization

**File:** `/lib/security/sanitize.ts`
- Uses `isomorphic-dompurify` for server-side HTML sanitization
- Prevents XSS (Cross-Site Scripting) attacks
- Applied to all user-generated HTML content before saving to Supabase

**Allowed Tags:** `b`, `i`, `em`, `strong`, `u`, `p`, `br`, `h1-h6`, `ul`, `ol`, `li`, `a`, `img`, `blockquote`, `pre`, `code`, `table`, `figure`, `figcaption`, `div`, `span`

**Allowed Attributes:** `href`, `target`, `rel`, `src`, `alt`, `width`, `height`, `class`, `id`, `style`

**Usage Locations:**
- `/app/admin/actions.ts`:
  - `createEvent()` - sanitizes event description
  - `updateEvent()` - sanitizes event description
  - `createPublication()` - sanitizes article content
  - `updatePublication()` - sanitizes article content

---

### 3. Upload Route Security

**File:** `/app/api/upload/route.ts`

**Validations:**
1. **File Size:** Max 5MB
2. **MIME Type Check:** Only allows `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`
3. **Magic Bytes Validation:** Verifies actual file content, not just extension:
   - JPEG: `FF D8 FF`
   - PNG: `89 50 4E 47`
   - WebP: `RIFF ... WEBP`
   - GIF: `GIF87a` or `GIF89a`
   - SVG: Checks for XML declaration or `<svg>` tag

4. **UUID Filename:** Uses `uuid.v4()` to generate unique filenames, preventing:
   - File overwrites
   - Path traversal attacks
   - Predictable file paths

**Benefits:** Prevents malicious file uploads (executables disguised as images, oversized files, etc.)

---

### 4. HTTP Security Headers

**File:** `/next.config.mjs`

Headers applied to all routes:

```
X-Frame-Options: DENY
  → Prevents clickjacking attacks

X-Content-Type-Options: nosniff
  → Prevents MIME type sniffing

Referrer-Policy: strict-origin-when-cross-origin
  → Controls referrer information leakage

Permissions-Policy: camera=(), microphone=(), geolocation=()
  → Disables unnecessary browser APIs

Content-Security-Policy: (basic policy)
  → Restricts script execution, prevents inline code injection

Strict-Transport-Security: max-age=31536000; includeSubDomains
  → Forces HTTPS (30 days)
```

---

### 5. Admin Authentication

**File:** `/app/admin/actions.ts`

**Session Management:**
- HTTP-only cookies (cannot be accessed via JavaScript)
- Secure flag on production (HTTPS only)
- SameSite=lax to prevent CSRF
- 24-hour expiration

**Protected Routes:**
- All CRUD operations check `isAdminAuthenticated()` before executing
- Returns `{ error: "Non autorisé" }` if session is invalid
- Database operations are rejected silently on auth failure (no information leakage)

---

### 6. Supabase Service Role Key

**Verification:**
- `SUPABASE_SERVICE_ROLE_KEY` is only used in:
  - `/app/api/upload/route.ts` (server-side API route)
  - NEVER in client components (files with `"use client"` directive)
  - NEVER in browser-accessible code

**Why Important:**
- Service role keys have full access to all database operations
- Exposing them would allow bypassing RLS (Row-Level Security)
- Must be kept server-only

---

### Testing Recommendations

**Rate Limiting:**
1. Try logging in with wrong password 5 times
2. Verify you get blocked for 15 minutes
3. Verify countdown timer updates
4. After 15 minutes, verify you can try again

**File Upload:**
1. Try uploading a `.txt` file → should be rejected
2. Try uploading a 10MB image → should be rejected (size limit)
3. Try uploading a malicious file with fake image extension → should be rejected (magic bytes check)
4. Upload valid images → should succeed with UUID-based filenames

**HTML Sanitization:**
1. Create a publication with HTML content containing `<script>alert('xss')</script>`
2. Verify the script tag is removed when displayed
3. Try with event handlers like `onclick="alert('xss')"`
4. Verify handlers are stripped

**Security Headers:**
1. Open DevTools → Network tab
2. Check any response headers for:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Content-Security-Policy: ...`

---

### Future Enhancements

1. **CAPTCHA Integration:** Add reCAPTCHA to login after 3 failed attempts
2. **2FA/MFA:** Email or authenticator app for admin access
3. **Audit Logging:** Track all admin actions (create, update, delete) with timestamps
4. **IP Whitelisting:** Restrict admin panel to known IPs (if team is small)
5. **Secrets Rotation:** Periodically change ADMIN_PASSWORD
6. **Backup Verification:** Test Supabase backups regularly
7. **Database Backups:** Enable point-in-time recovery
8. **CDN Security:** Add Cloudflare or similar for DDoS protection
