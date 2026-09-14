# Rimcast — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Edge / ML platform engineer

- As an ML engineer, I want to attach a latency budget to a model version, so that real-time eligibility is explicit.
- As an ML engineer, I want automatic refusal when no edge slot meets the budget, so that we do not ship a false real-time claim.
- As an ML engineer, I want one-click rollback of an edge placement, so that bad versions do not linger in the field.

### Site / fleet operator

- As a site operator, I want live SLA dashboards per ward/line/vehicle class, so that I can see physical-world readiness.
- As a fleet manager, I want placements pinned to on-device or near-device nodes first, so that backhaul outages do not halt inference.
- As a site operator, I want to freeze placements during an incident, so that safety review can proceed.

### Capacity provider

- As an edge capacity provider, I want to publish available compute and price, so that democratised supply can be scheduled.
- As a capacity provider, I want settlement only for SLA-compliant reserved slots, so that I am not paid for unusable capacity.

### Safety / clinical governance

- As a safety officer, I want an incident pack naming model version and edge node, so that after-action review is factual.
- As a clinical AI lead, I want raw patient data to stay on-site for real-time inference, so that latency wins do not become exfiltration.

### Compliance

- As a compliance officer, I want purpose tags on any allowed overflow to cloud, so that non-real-time paths remain accountable.
- As a compliance officer, I want immutable placement history, so that “what ran where” survives disputes.
