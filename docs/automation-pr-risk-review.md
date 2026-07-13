# PR Risk Review

## Summary

Latest repository changes add a small Python CLI calculator under `python-calculator/`.
The implementation uses `ast.parse(..., mode="eval")` and a whitelist of arithmetic nodes, with pytest coverage and usage documentation.

## Changed Files

- `python-calculator/calculator.py`: Adds safe arithmetic expression parsing/evaluation, result formatting, stdin/argument handling, and CLI error output.
- `python-calculator/test_calculator.py`: Adds pytest coverage for basic operations, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: Documents features, example CLI usage, error handling, and test execution.

## Potential Risks

- Correctness: `bool` is a subclass of `int`, so expressions like `True` can be accepted as numeric constants.
- Security/performance: Very large or deeply nested expressions have no input size or AST depth limit, which could cause excessive CPU/memory use or recursion failures.
- Maintainability: There is no package metadata or dependency file, so pytest setup and supported Python versions are implicit.
- Correctness: Floating-point arithmetic is exposed directly, so precision surprises are expected for decimal-heavy calculations.

## Suggested Tests

- Add cases rejecting boolean constants such as `True`, `False`, and `True + 1`.
- Add tests for extremely long or deeply nested expressions once input limits are defined.
- Add CLI-level tests for stdin input, missing input, invalid expressions, and exit codes.
- Add tests documenting expected floating-point behavior or tolerances for decimal calculations.

## Recommended Next Action

Address boolean constant handling first, then define lightweight input limits and add CLI integration coverage.
