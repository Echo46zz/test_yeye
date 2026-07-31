# PR Risk Review

## Summary

Reviewed the latest repository change (`efb2a40` vs. its parent), which adds a small Python command-line calculator using AST-based arithmetic evaluation, with README usage documentation and pytest coverage. The implementation avoids raw `eval()` and covers common arithmetic paths, but a few edge cases and packaging gaps remain.

## Changed Files

- `python-calculator/calculator.py`: Adds the CLI entry point, AST parsing, operator whitelist, result formatting, stdin support, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest unit tests for basic operations, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: Documents features, usage examples, error handling, and how to run tests.

## Potential Risks

- Correctness: `bool` values can be accepted because `bool` is a subclass of `int` in Python, so expressions such as `True` may be treated as numeric constants.
- Correctness: very large float literals such as `1e309` can produce infinity; `format_result()` may raise an uncaught `OverflowError` when converting non-finite floats to `int`.
- Performance: deeply nested or extremely large arithmetic expressions can consume CPU or hit recursion limits because there is no expression size or depth guard.
- Maintainability: there is no dependency or project metadata file, so test setup depends on manually installing `pytest`.
- Usability: README examples use `python`, but this environment only has `python3`; that may confuse users on systems without a `python` alias.

## Suggested Tests

- Add tests rejecting boolean constants (`True`, `False`) and other non-arithmetic literals.
- Add tests for non-finite float inputs and formatting behavior (`1e309`, `-1e309`).
- Add CLI tests for stdout, stderr, and exit codes for valid input, stdin input, invalid input, and division by zero.
- Add stress or boundary tests for deeply nested expressions and very large numeric operands.
- Add a dependency/setup check, such as `requirements-dev.txt` or `pyproject.toml`, so `pytest` installation is reproducible.

## Recommended Next Action

Add focused guards for accepted constants and non-finite float formatting, then add the suggested edge-case and CLI tests. Existing tests could not be run in this environment because `pytest` is not installed (`python3 -m pytest python-calculator` failed with `No module named pytest`).
