# PR Risk Review

## Summary

Latest changes add a standalone Python CLI calculator under `python-calculator/`, including an AST-based evaluator, pytest coverage, and usage documentation. The implementation avoids raw `eval()`, but it does not yet define dependency setup, packaging, or input limits.

Test check attempted: `python3 -m pytest -q` in `python-calculator/` could not run because `pytest` is not installed in this environment.

## Changed Files

- `python-calculator/calculator.py`: Adds a command-line calculator that parses arithmetic expressions with `ast.parse`, supports `+`, `-`, `*`, `/`, parentheses, unary signs, stdin input, result formatting, and stderr error output.
- `python-calculator/test_calculator.py`: Adds pytest unit tests for basic arithmetic, decimals, precedence, parentheses, division by zero, invalid input, and formatting.
- `python-calculator/README.md`: Documents features, CLI/stdin usage examples, error handling, and a manual pytest command.

## Potential Risks

- Correctness: non-finite float literals such as very large exponential values may produce `inf`; `format_result()` can raise an uncaught `OverflowError` when converting `inf` to `int`.
- Security/availability: there are no expression length, AST depth, or numeric magnitude limits, so extremely large or deeply nested inputs could consume excessive CPU, memory, or recursion depth.
- Maintainability: no dependency file or project metadata declares `pytest`, so tests may fail in a clean environment.
- Usability: README examples use `python`, while the script shebang and this environment use `python3`; that mismatch can confuse users on systems without a `python` executable.

## Suggested Tests

- Add CLI subprocess tests for argument input, stdin input, empty input, invalid expressions, stderr content, and exit codes.
- Add boundary tests for huge numeric literals, non-finite floats, deeply nested parentheses, and very long expressions.
- Add tests for unsupported AST nodes that look arithmetic-adjacent, such as function calls, names, lists, and exponentiation.
- Add a documented dependency/setup check, or a minimal project config, so pytest can run reliably in clean environments.

## Recommended Next Action

Add input validation limits and dependency metadata before merging, then run the full pytest suite in a clean Python 3 environment.
