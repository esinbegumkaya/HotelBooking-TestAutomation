# Test strategy

**Objective:** Validate the hotel booking flow at the API, UI, and cross-layer boundaries. The project is an automation demonstration, not a production booking platform.

## Environments

- Local UI: `http://localhost:5173` (set using `BASE_URL`).
- Local API: `http://localhost:3001` (set using `API_URL`; Vite uses `VITE_API_URL`).
- Public Render environment is demo-only; destructive tests should target a disposable local environment.

## Approach

1. Structural checks validate JSON fixtures and Postman collection presence.
2. Newman runs the existing Postman collection against the selected mock API.
3. Selenium runs each numbered scenario in a fresh Chrome instance using explicit element locators and dynamic future dates.
4. Cross-layer tests verify actual server-side booking records, and delete their generated data.
5. CI starts disposable local services; waits for HTTP health; then executes checks and uploads available evidence.

## Exit criteria

- UI build successful; local API returns hotels; all automated assertions pass.
- Any failure is visible as an exit code, logs, a JUnit result and, when browser capture succeeds, a screenshot.
- No claim of 100% production coverage or production security validation.

## Risks

- JSON Server accepts certain invalid payloads by design.
- Postman collection can mutate local `api/db.json` during testing; restore its fixture when required.
- External CI/browser versions can vary; browser failures need a reproducible run.
- Existing mock data may contain manually created bookings.

## Defect report template

ID; environment; build/commit; preconditions; steps; expected behavior; actual behavior; severity; reproducibility; screenshot/log; linked test ID.
