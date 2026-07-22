# PR Risk Review

## Summary

Reviewed the latest repository change: commit `efb2a40` adds a small Python CLI calculator under `python-calculator/` with AST-based arithmetic evaluation, pytest coverage, and usage documentation. No existing source files were modified by this review.

Validation note: the included tests could not be run in this environment because `pytest` is not installed (`python3 -m pytest python-calculator/test_calculator.py -q` failed with `No module named pytest`).

## Changed Files

- `python-calculator/calculator.py` - Implements a command-line calculator that parses expressions with `ast.parse(..., mode="eval")`, evaluates supported arithmetic nodes recursively, formats numeric output, and handles CLI/stdin input.
- `python-calculator/test_calculator.py` - Adds pytest unit tests for basic operations, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md` - Documents features, CLI usage examples, error handling, and how to run tests.

## Potential Risks

- Correctness: floating-point arithmetic is used directly, so decimal calculations can expose normal binary floating-point precision behavior.
- Correctness/security: very large or deeply nested expressions may consume significant CPU/memory or hit recursion limits, even though arbitrary code execution is blocked.
- Maintainability: there is no dependency manifest or test runner configuration, so contributors may not know which Python/pytest versions are expected.
- Usability: CLI behavior is not covered by tests, including stdout/stderr output, stdin input, and process exit codes.

## Suggested Tests

- Add subprocess-based CLI tests for argument input, stdin input, empty input, invalid input, and division-by-zero exit codes.
- Add tests for unsupported AST constructs such as calls, lists, names, comparisons, and boolean expressions.
- Add boundary tests for deeply nested parentheses and very large numeric expressions to define expected failure behavior.
- Add precision-focused tests documenting expected output for representative decimal division/multiplication cases.
- Add CI or dependency setup that installs `pytest` and runs `python3 -m pytest`.

## Recommended Next Action

Add a lightweight Python test/dependency setup and CLI-level tests before merging, then run the full pytest suite in CI.
