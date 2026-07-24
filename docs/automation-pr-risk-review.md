# PR Risk Review

## Summary

Latest repository changes add a small Python command-line calculator under `python-calculator/`. It safely parses arithmetic expressions with `ast`, supports CLI argument and stdin input, includes pytest coverage, and documents usage.

## Changed Files

- `python-calculator/calculator.py`: Implements AST-based arithmetic evaluation, result formatting, CLI parsing, stdin fallback, and error handling.
- `python-calculator/test_calculator.py`: Adds unit tests for basic arithmetic, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: Documents calculator features, usage examples, error handling, and test execution.

## Potential Risks

- `bool` constants are accepted because `bool` is a subclass of `int`; expressions like `True + 1` may behave unexpectedly.
- Very large or deeply nested expressions have no input length or recursion-depth guard, so untrusted input could cause high CPU/memory usage or recursion failures.
- Float edge cases such as `1e309` can produce `inf`; `format_result()` may raise uncaught errors when converting non-finite floats to `int`.
- CLI behavior is not covered by tests, so stdin handling, stderr output, and exit codes could regress independently from unit-level calculation behavior.

## Suggested Tests

- Add tests rejecting boolean literals (`True`, `False`) and other non-numeric constants.
- Add tests for non-finite or very large float input such as `1e309`.
- Add CLI subprocess tests for argument input, stdin input, missing input, invalid input, and division-by-zero exit code/stderr behavior.
- Add a stress or guardrail test for deeply nested expressions once an input-depth or length limit is defined.

## Recommended Next Action

Tighten accepted constants to exclude booleans and handle non-finite float results explicitly, then add CLI-level tests before merging.
