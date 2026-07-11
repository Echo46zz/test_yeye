# PR Risk Review

## Summary

Latest reviewed change adds a standalone Python CLI calculator under `python-calculator/`. It parses arithmetic expressions with `ast`, evaluates a limited operator set, documents CLI usage, and includes pytest coverage for core behavior.

Validation note: `python3 -m pytest python-calculator -q` could not run in this environment because `pytest` is not installed.

## Changed Files

- `python-calculator/calculator.py`: Implements safe AST-based parsing/evaluation, result formatting, CLI argument/stdin handling, and user-facing error messages.
- `python-calculator/test_calculator.py`: Adds pytest tests for arithmetic operations, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: Documents calculator features, usage examples, error behavior, and test command.

## Potential Risks

- `bool` values are accepted as numbers because `bool` subclasses `int` in Python; expressions like `True + 1` may evaluate despite not being documented arithmetic input.
- Very large or deeply nested expressions may consume CPU/memory or trigger recursion errors, which are not handled by the CLI.
- Test execution depends on `pytest`, but the repository does not include dependency metadata or setup instructions beyond a manual install command.
- CLI behavior is not covered by tests, so stdin handling, exit codes, and stderr output could regress unnoticed.

## Suggested Tests

- Add tests rejecting boolean constants such as `True` and `False`.
- Add CLI/subprocess tests for argument input, stdin input, empty input, invalid expressions, division by zero, exit codes, stdout, and stderr.
- Add stress or boundary tests for deeply nested expressions and very large numeric inputs.
- Add dependency/setup verification, such as a minimal requirements file or documented test environment command.

## Recommended Next Action

Tighten numeric constant validation to exclude booleans, add CLI-level tests, and define test dependencies so the suite can run reliably in fresh environments.
