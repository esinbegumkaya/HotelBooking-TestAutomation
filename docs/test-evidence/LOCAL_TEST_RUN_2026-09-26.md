# Local test execution evidence — 2026-09-26

**Source:** User-shared PowerShell `npm run test:all` output and HTML Selenium report. Results below were transcribed from that execution, not independently rerun in this workspace. Machine: Windows PowerShell; environment: local `localhost:3001` API and `localhost:5173` UI. Commit SHA was not provided.

## Newman — Postman

| Measure | Observed result |
| --- | ---: |
| Requests | 14 executed, 0 request failures |
| Assertions | 70 executed, 0 failures |
| Pre-request scripts | 24 executed, 0 failures |
| Collection runtime | 1,744 ms |
| Mean API response time | 39 ms |
| Final output | `Postman collection passed against http://localhost:3001` |

CRUD chain: `POST /bookings` → 201; `GET /bookings/3` → 200; `PUT /bookings/3` → 200; `DELETE /bookings/3` → 200; immediate subsequent `GET /bookings/3` → 404. Additional negative and mock edge-case requests passed the collection's defined expectations. The mock intentionally accepts some malformed booking payloads; passing the collection does not imply production validation.

## Selenium — local HTML report

| Test | Status | Duration |
| --- | :---: | ---: |
| 01_bookingFlow_happyPath.test.js | PASS | 3952 ms |
| 02_invalidDate_showsError.test.js | PASS | 230 ms |
| 03_sameDayBooking_allowed.test.js | PASS | 232 ms |
| 04_backNavigation_stateReset.test.js | PASS | 245 ms |
| 05_refresh_results_stillWorks.test.js | PASS | 237 ms |
| 06_blank_fields.test.js | PASS | 238 ms |
| 07_invalid_email.test.js | PASS | 241 ms |
| 08_booking_api_integration.test.js | PASS | 231 ms |
| 09_consecutive_bookings.test.js | PASS | 232 ms |
| 10_mobile_viewport.test.js | PASS | 227 ms |
| 11_api_unavailable.test.js | PASS | 234 ms |

Final CLI output: `11/11 tests passed. Report: selenium/artifacts/report.html`.

**Evidence limitations:** The original generated `report.html`, JUnit XML, screenshot files and a CI run URL were not uploaded, so this checked-in summary documents the exact results shared in chat rather than posing as those original artifacts. Generated artifacts remain ignored and can be downloaded from a successful CI run. A green GitHub Actions result must be confirmed after pushing the repo; it has not been established by this local run.
