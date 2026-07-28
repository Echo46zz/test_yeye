# PR Risk Review

## Summary

Reviewed the latest changes on this branch against `origin/main`. The change adds a small Python CLI calculator implemented with AST-based expression parsing, plus README usage notes and pytest coverage. Existing tests could not be executed in this environment because `pytest` is not installed.

## Changed Files

- `python-calculator/calculator.py`: Adds the CLI entry point, expression parsing, safe AST evaluation for `+`, `-`, `*`, `/`, unary signs, stdin input, result formatting, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest tests for arithmetic operations, decimals, precedence, parentheses, division by zero, invalid input, and output formatting.
- `python-calculator/README.md`: Documents calculator features, usage examples, error handling, and how to run tests.

## Potential Risks

- Correctness: `format_result()` may raise for non-finite float literals such as very large scientific notation if parsing yields `inf`.
- Performance: Deeply nested or very large expressions can still consume CPU/memory during parsing or recursive evaluation.
- Maintainability: The project has no dependency file or test runner configuration, so new environments must infer that `pytest` is required.
- Usability: README test commands assume running inside `python-calculator`; root-level commands are not documented.

## Suggested Tests

- Add CLI subprocess tests for stdout, stderr, stdin input, empty input, and exit codes.
- Add tests for large numeric literals, very deep parentheses/unary expressions, and non-finite float behavior.
- Add rejection tests for calls, attributes, lists, booleans, complex numbers, and other unsupported AST nodes.
- Add a dependency/test setup file or CI check that runs the calculator tests from the repository root.

## Recommended Next Action

Add lightweight project metadata for test dependencies, then harden input limits and non-finite numeric handling before merging.
