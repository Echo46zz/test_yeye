# PR Risk Review

## Summary

Latest reviewed change: `efb2a40 Add Python CLI calculator with ast-based safe eval, tests, and docs`.

The change adds a small Python CLI calculator under `python-calculator/`. It parses arithmetic expressions with Python's `ast` module, evaluates a limited operator whitelist, provides CLI/stdin input handling, and includes pytest coverage plus usage documentation.

Validation note: existing tests were not run because the environment has `python3` but does not have `pytest` installed.

## Changed Files

- `python-calculator/calculator.py`: New CLI calculator implementation using AST parsing, explicit support for `+`, `-`, `*`, `/`, unary signs, parentheses, stdin input, result formatting, and error handling.
- `python-calculator/test_calculator.py`: New pytest suite covering basic arithmetic, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: New usage and testing documentation for the calculator.

## Potential Risks

- Correctness: `format_result()` converts integral floats with `int(value)`, which can fail for special float values if future operators introduce them.
- Correctness: floating-point arithmetic is expected but may surprise users for decimal inputs such as `0.1 + 0.2`.
- Security/performance: deeply nested expressions or extremely large numeric literals could consume CPU or memory because there is no input length or AST depth limit.
- Maintainability: there is no dependency file or test runner configuration, so a fresh environment cannot run tests without manually installing `pytest`.
- Usability: README examples use `python`, while this environment only provides `python3`.

## Suggested Tests

- CLI tests for argument input, stdin input, empty stdin, successful exit code, and error exit code.
- Boundary tests for very long expressions, deeply nested parentheses, and very large numeric literals.
- Tests for rejected AST constructs such as function calls, lists, dictionaries, attributes, and comparisons.
- Documentation or CI test that verifies the documented test command works in a clean environment.

## Recommended Next Action

Add lightweight project setup metadata, such as `requirements.txt` or `pyproject.toml`, then run the pytest suite in CI. Consider adding expression size/depth limits before accepting untrusted or very large inputs.
