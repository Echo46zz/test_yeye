# PR Risk Review

## Summary

Latest repository change adds a small Python CLI calculator under `python-calculator/`.
It evaluates arithmetic expressions with Python `ast` instead of raw `eval`, includes unit tests, and documents usage.
Current feature branch has no additional diff beyond the base branch, so this report reviews the latest commit contents.

## Changed Files

- `python-calculator/calculator.py` - Implements CLI parsing, stdin fallback, AST-based arithmetic evaluation, result formatting, and error handling.
- `python-calculator/test_calculator.py` - Adds pytest coverage for basic operations, decimals, precedence, parentheses, division by zero, invalid input, and output formatting.
- `python-calculator/README.md` - Documents features, usage examples, error behavior, and how to run tests.

## Potential Risks

- Correctness: `float("nan")`/`float("inf")` style input is rejected, but very large numeric literals or deeply nested expressions may still consume significant CPU or memory during parsing/evaluation.
- Correctness: `format_result` converts floats equal to integers into integer strings, which may hide precision surprises for very large floating-point results.
- Security/robustness: AST node filtering blocks names, calls, attributes, and unsupported operators, but there is no explicit expression length or AST depth limit.
- Maintainability: The supported operator set is hard-coded and small; future operator additions need matching tests and README updates.
- Testability: Existing tests focus on pure functions and do not exercise CLI exit codes, stderr messages, or stdin behavior.

## Suggested Tests

- Add subprocess-based CLI tests for argument input, stdin input, empty input, invalid expressions, and division-by-zero exit code `1`.
- Add stress/guard tests for very long expressions and deeply nested parentheses if input limits are introduced.
- Add tests for unsupported AST forms such as function calls, attribute access, lists, comparisons, boolean operators, and assignments.
- Add result-formatting tests for large floats and precision edge cases.

## Recommended Next Action

Add CLI-level tests first, then consider explicit input length/depth limits before accepting untrusted or externally supplied expressions.
