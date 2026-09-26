# Test case matrix

| ID | Preconditions | Action | Expected result | Evidence |
| --- | --- | --- | --- | --- |
| UI-01 | UI/API running | Search, select, enter valid guest details | Confirmation and non-empty ID | Selenium 01 |
| UI-02 | UI running | Check-out before check-in | Date error | Selenium 02 |
| UI-03 | UI running | Same-day dates | Date error | Selenium 03 |
| UI-04 | Hotels visible | Browser back | Search view, reset inputs | Selenium 04 |
| UI-05 | Hotels visible | Refresh | Results visible | Selenium 05 |
| UI-06 | Booking form | Submit empty fields | Form error | Selenium 06 |
| UI-07 | Booking form | Submit malformed email | Email error | Selenium 07 |
| INT-08 | UI/API running | Book via UI, GET by ID, DELETE | Response body matches user input | Selenium 08 |
| INT-09 | UI/API running | Create two bookings | Distinct IDs, cleanup | Selenium 09 |
| UI-10 | Chrome | 390 px viewport, search | Hotel visible | Selenium 10 |
| UI-11 | Chrome DevTools available | Block hotel API request | Error displayed | Selenium 11 |
| API-01 | API running | Run Postman collection | Assertions in collection pass | Newman JUnit |
| PERF-01 | Local API running | 20 sequential GET `/hotels` | Zero failed requests; p50/p95 reported | Performance smoke console |

Actual result and run date: supplied by each execution, **not pre-filled as passing**.
