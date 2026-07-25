# PR Risk Review

## Summary

Latest repository change adds a small Python CLI calculator under `python-calculator/`. It safely parses arithmetic expressions with `ast`, supports basic arithmetic and stdin/argument input, and includes pytest coverage plus usage documentation.

## Changed Files

- `python-calculator/calculator.py`: Implements the calculator CLI, AST-based expression evaluator, result formatting, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest tests for basic operations, decimal math, precedence, parentheses, divide-by-zero, invalid input, and formatting.
- `python-calculator/README.md`: Documents features, CLI usage examples, error behavior, and test execution.

## Potential Risks

- Correctness: `bool` constants are accepted because `bool` is a subclass of `int`; expressions like `True + 1` would evaluate even though the README only promises numeric arithmetic.
- Correctness/UX: README says `abc` returns `Invalid expression: 'abc'`, but the current evaluator is likely to report an unsupported AST node instead.
- Robustness: Very large or deeply nested expressions can consume CPU/memory or hit recursion limits; stdin input is not bounded.
- Maintainability: There is no dependency manifest or test runner configuration, so contributors must infer how to install pytest and run tests from the README.

## Suggested Tests

- Add tests that reject booleans and other non-numeric constants (`True`, `False`, `None`).
- Add CLI-level tests for argv input, stdin input, empty input, stderr messages, and exit codes.
- Add tests that pin documented error messages, especially for names like `abc`.
- Add boundary tests for deeply nested expressions and very large numeric literals to define acceptable failure behavior.

## Recommended Next Action

Address the documented behavior mismatch and decide whether boolean literals should be explicitly rejected before merging. Add lightweight CLI tests so future changes cover both library behavior and command-line user experience.
