# Test evidence

- [Verified local execution summary (2026-09-26)](LOCAL_TEST_RUN_2026-09-26.md): transcribed from user-provided Newman and Selenium report output.
- Generated report files (`selenium/artifacts/report.html`, `results.json`, `junit.xml`, `artifacts/postman-junit.xml`) are intentionally excluded from Git. They are emitted by local test commands and attached to the GitHub Actions run as artifacts.
- To preserve an original browser-generated report for a specific release, copy it into a dated evidence directory after running tests and ensure it contains no personal test data. Do not commit fabricated screenshots or claim CI passed without a green run.
