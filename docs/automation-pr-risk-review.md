# PR Risk Review

## Summary

Latest reviewed change: commit `efb2a40` adds a small Python CLI calculator that parses arithmetic expressions with `ast`, plus README usage docs and pytest coverage.

## Changed Files

- `python-calculator/calculator.py`: Implements CLI argument/stdin handling, AST-based arithmetic evaluation, result formatting, and error reporting.
- `python-calculator/test_calculator.py`: Adds unit tests for arithmetic operations, precedence, parentheses, division by zero, invalid input, and output formatting.
- `python-calculator/README.md`: Documents supported operations, CLI/stdin usage, error handling, and test execution.

## Potential Risks

- Correctness: Boolean constants are accepted because `bool` is a subclass of `int`, so expressions like `True + 1` can evaluate instead of being rejected.
- Performance/availability: Very large numeric literals or deeply nested expressions may consume excessive CPU, memory, or recursion depth because there are no expression size/depth limits.
- Maintainability: There is no packaging or project-level test configuration, so running tests from different working directories may rely on implicit import-path behavior.
- User experience: CLI behavior is not covered by tests, leaving exit codes, stderr messages, and stdin handling more likely to regress.

## Suggested Tests

- Add tests that reject boolean constants and other non-numeric AST constants explicitly.
- Add boundary tests for empty stdin, CLI argument input, stderr output, and exit code `1` on invalid expressions.
- Add resource-limit tests or validation tests for overly long/deep expressions once limits are defined.
- Add a repository-root test command in CI or project config to ensure imports and test discovery remain stable.

## Recommended Next Action

Tighten `safe_eval` constant validation to exclude `bool`, define practical input size/depth limits, and add CLI-level tests before relying on this calculator in automated workflows.
