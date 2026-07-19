# PR Risk Review

## Summary

Latest repository change adds a small Python CLI calculator under `python-calculator/`. It uses `ast.parse(..., mode="eval")` and a limited operator allowlist to evaluate arithmetic expressions without raw `eval()`, plus pytest coverage and local usage documentation.

## Changed Files

- `python-calculator/calculator.py`: Implements parsing, safe recursive AST evaluation for `+`, `-`, `*`, `/`, unary signs, result formatting, argparse CLI handling, stdin fallback, and error reporting.
- `python-calculator/test_calculator.py`: Adds pytest unit tests for basic arithmetic, decimals, precedence, parentheses, division by zero, invalid inputs, and result formatting.
- `python-calculator/README.md`: Documents calculator features, CLI/stdin usage, error handling, and test execution.

## Potential Risks

- Correctness: `bool` values are subclasses of `int` in Python, so constants like `True` or `False` may be accepted as numeric input unless explicitly rejected.
- Correctness/maintainability: The evaluator has no configured limits on expression size, numeric magnitude, or AST depth; very large inputs could cause high CPU/memory use or recursion failures.
- Maintainability: The project has no dependency or tooling file, so contributors must infer Python and pytest setup from the README.
- Usability: CLI expressions containing spaces must be quoted by the shell; this is documented by examples but not enforced or explained in error output.

## Suggested Tests

- Add tests that boolean constants (`True`, `False`) and other non-numeric constants are rejected.
- Add CLI-level tests for argv input, stdin input, empty stdin, stderr messages, and exit codes.
- Add rejection tests for function calls, attribute access, lists/dicts, comparisons, modulo, floor division, and power expressions.
- Add boundary tests for deeply nested expressions and very large numeric literals to define expected behavior.

## Recommended Next Action

Address boolean handling first, then add CLI subprocess tests so the documented command-line behavior is covered before expanding feature support.
