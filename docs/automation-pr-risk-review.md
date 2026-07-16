# PR Risk Review

## Summary

Latest repository changes add a small Python CLI calculator under `python-calculator/`. The implementation uses Python `ast` parsing with an operator allowlist instead of raw `eval`, and includes unit tests plus usage documentation.

Existing tests were not executed successfully in this environment because `pytest` is not installed (`python3 -m pytest ...` failed with `No module named pytest`).

## Changed Files

- `python-calculator/calculator.py`: Adds the CLI entry point, AST-based expression parser/evaluator, result formatting, stdin support, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest coverage for arithmetic operations, precedence, parentheses, decimals, division by zero, invalid input, and formatting.
- `python-calculator/README.md`: Documents features, CLI usage examples, error handling, and how to run tests.

## Potential Risks

- Correctness: Very large or deeply nested expressions may hit recursion limits or consume excessive CPU/memory because expression size/depth is not bounded.
- Correctness: Floating-point output uses native Python float behavior, so decimal precision surprises remain possible for user-facing calculations.
- Maintainability: Test dependency setup is not captured in a project file, so fresh environments may fail to run tests without manual `pytest` installation.
- Security/performance: The AST allowlist blocks code execution, but unbounded numeric literals or expression trees could still be used for denial-of-service style workloads.
- Coverage: CLI behavior, stdin behavior, stderr messages, and exit codes are not covered by tests.

## Suggested Tests

- Add subprocess-based CLI tests for argument input, stdin input, empty input, invalid expressions, and exit codes.
- Add tests for deeply nested expressions and very large numeric literals once input size/depth limits are defined.
- Add precision/formatting tests for representative decimal calculations.
- Add a dependency or project metadata file and verify tests in a clean environment.

## Recommended Next Action

Add lightweight project metadata for test dependencies, then add CLI integration tests and an input complexity guard before relying on the calculator in broader workflows.
