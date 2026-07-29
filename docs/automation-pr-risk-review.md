# PR Risk Review

## Summary

Latest changes add a small Python CLI calculator under `python-calculator/`, including AST-based arithmetic evaluation, pytest coverage, and usage documentation. The implementation avoids raw `eval()` and covers common arithmetic cases, but validation and CLI-level coverage could be tightened before relying on untrusted input.

Verification note: attempted `python3 -m pytest python-calculator/test_calculator.py -q`, but the environment does not have `pytest` installed.

## Changed Files

- `python-calculator/calculator.py`: Implements the CLI parser, stdin fallback, AST-based expression evaluator, result formatting, and error handling.
- `python-calculator/test_calculator.py`: Adds unit tests for basic arithmetic, decimals, precedence, parentheses, division by zero, invalid input, and formatting.
- `python-calculator/README.md`: Documents calculator features, example CLI usage, error behavior, and how to run tests.

## Potential Risks

- Correctness: `bool` values are accepted because `bool` is a subclass of `int`; expressions such as `True` may be treated as numeric input.
- Correctness/security: there is no explicit expression size or AST depth limit, so very large or deeply nested input could cause high CPU/memory usage or recursion failures.
- Correctness: special float literals such as overflowed values may produce `inf`, and `format_result()` can raise when converting non-finite floats to `int`.
- Maintainability: the tests import `calculator` by relying on the current working directory/module path; this may be brittle if the project layout changes.
- Operability: dependency setup is manual in the README, with no requirements file or project metadata to make test execution reproducible.

## Suggested Tests

- Add tests rejecting boolean constants and other non-numeric constants explicitly.
- Add tests for deeply nested, very long, and very large-number expressions to define safe failure behavior.
- Add tests for non-finite float results or literals, including `1e309`.
- Add subprocess-based CLI tests for argv input, stdin input, stderr output, and non-zero exit codes.
- Add a reproducible test setup file, then run the full pytest suite in CI or a clean environment.

## Recommended Next Action

Add input validation limits and explicit numeric-type checks, introduce reproducible test dependencies, then run the pytest suite and CLI subprocess tests before merging.
