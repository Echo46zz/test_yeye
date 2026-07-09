# PR Risk Review

## Summary

Latest reviewed change adds a standalone Python CLI calculator under `python-calculator/`. It evaluates arithmetic expressions with Python `ast`, includes pytest coverage for core expression handling, and documents usage.

## Changed Files

- `python-calculator/calculator.py`: Adds CLI entry point, AST-based expression parsing, safe arithmetic evaluation, result formatting, stdin support, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest unit coverage for arithmetic operators, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md`: Documents calculator features, usage examples, error behavior, and test commands.

## Potential Risks

- Correctness: `calculate()` is annotated as returning `float`, but it can return `int`; callers may make inaccurate type assumptions.
- Correctness: Floating-point operations use native binary floats, so decimal arithmetic can produce precision artifacts for some inputs.
- Security/availability: Input is safely parsed without raw `eval()`, but there are no size or depth limits; extremely large or deeply nested expressions could consume CPU or hit recursion limits.
- Maintainability: Tests import `calculator` by relying on the current working directory, which may be fragile if test execution moves to the repository root without pytest path handling.
- Documentation: README test instructions assume `pytest` is installed globally and use `python`, while some environments only provide `python3`.

## Suggested Tests

- Add CLI-level tests that execute `calculator.py` with argv, stdin, empty input, invalid input, and division-by-zero cases while asserting stdout, stderr, and exit codes.
- Add tests for resource-boundary inputs such as very long expressions and deeply nested parentheses once expected limits are defined.
- Add tests for representative floating-point precision cases and document whether approximate output is acceptable.
- Add an import/path test or packaging configuration check so tests run reliably from the repository root and from `python-calculator/`.

## Recommended Next Action

Add lightweight CLI behavior tests and define input size/depth limits before treating the calculator as robust for untrusted or automated use.
