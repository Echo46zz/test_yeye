# PR Risk Review

## Summary

Latest repository change adds a standalone Python CLI calculator under `python-calculator/`. It uses Python `ast` parsing with a small operator allowlist, includes pytest-based unit tests, and documents CLI/stdin usage.

Validation note: attempted `python -m pytest -q` failed because `python` is unavailable; attempted `python3 -m pytest -q` failed because `pytest` is not installed in the environment.

## Changed Files

- `python-calculator/calculator.py` - Implements expression parsing, safe recursive AST evaluation, result formatting, and CLI error handling.
- `python-calculator/test_calculator.py` - Adds pytest coverage for arithmetic operations, decimals, precedence, parentheses, division by zero, invalid input, and formatting.
- `python-calculator/README.md` - Documents calculator features, usage examples, error behavior, and test command.

## Potential Risks

- Correctness: `bool` values are accepted because `bool` is a subclass of `int` in Python, so expressions such as `True` or `True + 2` can evaluate even though only numbers are documented.
- Performance/availability: deeply nested or very large expressions can drive high recursion depth or CPU work; there is no input length, AST depth, or operation-count limit.
- Maintainability: there is no dependency/project metadata file, so contributors must infer that `pytest` is required from the README.
- Usability: CLI behavior is only unit-tested through the calculation functions, leaving stdin handling, exit codes, and stderr messages unverified.

## Suggested Tests

- Add tests that boolean constants and boolean arithmetic are rejected.
- Add CLI subprocess tests for argv input, stdin input, empty input, invalid expressions, and non-zero exit codes.
- Add boundary tests for very long or deeply nested expressions once input-size/depth limits are defined.
- Add a lightweight dependency setup check, such as a requirements file plus documentation/test validation that `pytest` can be installed consistently.

## Recommended Next Action

Address the boolean-constant acceptance first, then add CLI-level tests and explicit dependency metadata before merging or expanding calculator functionality.
