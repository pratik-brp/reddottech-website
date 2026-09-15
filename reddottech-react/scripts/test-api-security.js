import assert from "node:assert";

/**
 * Red Dot Technologies Automated API Security & Endpoint Regression Suite
 * Run with: node scripts/test-api-security.js
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:5000";

async function runTests() {
  console.log(
    `\n🧪 Running Red Dot Technologies Security & API Verification Suite against ${BASE_URL}...\n`,
  );
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}\n`);
      failed++;
    }
  }

  // 1. Healthcheck Test
  await test("GET /api/health returns status ok with uptime", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200, "Expected status 200");
    const json = await res.json();
    assert.strictEqual(json.status, "ok");
    assert.strictEqual(String(json.database).toLowerCase(), "mysql");
  });

  // 2. Security Headers Test
  await test("Security headers (CSP, X-Content-Type-Options, X-Frame-Options) are present", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.ok(res.headers.get("content-security-policy"), "Missing Content-Security-Policy header");
    assert.strictEqual(res.headers.get("x-content-type-options"), "nosniff");
    assert.strictEqual(res.headers.get("x-frame-options"), "SAMEORIGIN");
  });

  // 3. Admin Protected Route Auth Check
  await test("GET /api/auth/me without token returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    assert.strictEqual(res.status, 401);
    const json = await res.json();
    assert.strictEqual(json.success, false);
  });

  // 4. Paid Course Gating (DRM)
  await test("GET /api/ai-courses/lesson for paid track without access code returns 403 Locked", async () => {
    const res = await fetch(`${BASE_URL}/api/ai-courses/lesson?track=healthcare&lessonId=h2`);
    assert.strictEqual(res.status, 403);
    const json = await res.json();
    assert.strictEqual(json.locked, true);
    assert.ok(json.manifest, "Should return manifest without proprietary body text");
    assert.strictEqual(json.manifest.sections, undefined);
  });

  // 5. Free Course Accessibility
  await test("GET /api/ai-courses/lesson for free foundations track returns 200 with full content", async () => {
    const res = await fetch(`${BASE_URL}/api/ai-courses/lesson?track=foundations&lessonId=l1`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.data.sections.length > 0, "Sections should be populated for free tracks");
  });

  // 6. Certificate Minting Protection
  await test("POST /api/certificates/claim for paid track without verified enrollment returns 403", async () => {
    const res = await fetch(`${BASE_URL}/api/certificates/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Unverified Attacker",
        email: "attacker@example.com",
        track: "healthcare",
      }),
    });
    assert.strictEqual(res.status, 403);
    const json = await res.json();
    assert.strictEqual(json.success, false);
  });

  // 7. Course Pagination Metadata
  await test("GET /api/courses?page=1&limit=2 returns pagination envelope", async () => {
    const res = await fetch(`${BASE_URL}/api/courses?page=1&limit=2`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data));
    assert.ok(json.pagination, "Pagination object missing");
    assert.strictEqual(json.pagination.page, 1);
    assert.strictEqual(json.pagination.limit, 2);
    assert.ok(typeof json.pagination.total === "number");
  });

  // 8. Password Reset Flow - Non-existent email security (no user enumeration)
  await test("POST /api/auth/forgot-password handles unknown email safely", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "unknown@example.com" }),
    });
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.success, true);
  });

  // 9. Payment Receipt Security - Unauthenticated access returns 401
  await test("GET /api/receipts/:filename without auth returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/receipts/private_student_receipt.png`);
    assert.strictEqual(res.status, 401);
    const json = await res.json();
    assert.strictEqual(json.success, false);
  });

  // 10. Access Code Generation Protection - Unauthenticated request returns 401
  await test("POST /api/admin/generate-access-code without auth returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/generate-access-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track: "healthcare" }),
    });
    assert.strictEqual(res.status, 401);
    const json = await res.json();
    assert.strictEqual(json.success, false);
  });

  // 11. Access Code DRM - Tampered/forged codes rejected with 400
  await test("POST /api/ai-access/verify-code rejects invalid/forged codes with 400", async () => {
    const res = await fetch(`${BASE_URL}/api/ai-access/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track: "healthcare", code: "FORGEDCODE123" }),
    });
    assert.strictEqual(res.status, 400);
    const json = await res.json();
    assert.strictEqual(json.valid, false);
  });

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner encountered error:", err);
  process.exit(1);
});
