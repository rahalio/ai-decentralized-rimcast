/**
 * Postman-collection 1:1 Vitest tests for governance (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  eventId: "",
  freezeId: "",
  limit: "",
  siteId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / governance (1:1 generated)", () => {

  it("listSiteFreezes", async () => {
    const url = sub("{{baseUrl}}/v1/governance/site-freezes?cursor={{cursor}}&limit={{limit}}&siteId={{siteId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("freezeSitePlacements", async () => {
    const url = sub("{{baseUrl}}/v1/governance/site-freezes");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"siteId\": \"newman_siteId\",\n  \"reason\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("unfreezeSitePlacements", async () => {
    const url = sub("{{baseUrl}}/v1/governance/site-freezes/{{freezeId}}/unfreeze");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listSafeModeEvents", async () => {
    const url = sub("{{baseUrl}}/v1/governance/safe-mode?cursor={{cursor}}&limit={{limit}}&siteId={{siteId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("enterSafeMode", async () => {
    const url = sub("{{baseUrl}}/v1/governance/safe-mode");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"siteId\": \"newman_siteId\",\n  \"placementId\": \"newman_placementId\",\n  \"playbook\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("clearSafeMode", async () => {
    const url = sub("{{baseUrl}}/v1/governance/safe-mode/{{eventId}}/clear");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"acknowledgment\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("upsertEgressPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/governance/egress-policies");
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"siteId\": \"newman_siteId\",\n  \"allowOverflow\": false,\n  \"purposeTags\": null\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listOverflowExceptions", async () => {
    const url = sub("{{baseUrl}}/v1/governance/overflow-exceptions?cursor={{cursor}}&limit={{limit}}&siteId={{siteId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("requestOverflowException", async () => {
    const url = sub("{{baseUrl}}/v1/governance/overflow-exceptions");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"siteId\": \"newman_siteId\",\n  \"purposeTag\": \"\",\n  \"rationale\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
