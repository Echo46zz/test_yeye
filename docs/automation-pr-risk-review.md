# PR Risk Review

## Summary

Latest repository changes add a standalone Python CLI calculator under `python-calculator/`. The implementation uses `ast.parse(..., mode="eval")` and a small allowlist of arithmetic AST nodes to avoid raw `eval`, with pytest coverage and README usage notes.

## Changed Files

- `python-calculator/calculator.py`: Adds the CLI entry point, safe arithmetic evaluator, result formatting, stdin support, and error handling.
- `python-calculator/test_calculator.py`: Adds pytest coverage for basic arithmetic, decimals, precedence, parentheses, division by zero, invalid inputs, and formatting.
- `python-calculator/README.md`: Documents supported operations, CLI/stdin usage, error behavior, and how to run tests.

## Potential Risks

- Correctness: `bool` values are accepted because `bool` is a subclass of `int`; expressions like `True` can return `True` instead of being rejected.
- Correctness: very large float literals such as `1e309` can produce `inf`; `format_result()` then attempts `int(inf)` and may raise an uncaught `OverflowError` in the CLI.
- Security/performance: there is no input length, AST node count, or recursion-depth limit, so extremely large or deeply nested expressions could consume excessive CPU/memory or trigger recursion errors.
- Maintainability: the calculator is a bare script without packaging or pinned test tooling, so imports and test commands depend on running from the `python-calculator/` directory.

## Suggested Tests

- Add rejection tests for boolean constants (`True`, `False`) and other non-numeric constants.
- Add CLI-level tests for stdin input, missing input, invalid input, division by zero, and non-zero exit codes.
- Add boundary tests for very large floats/integers and deeply nested expressions to define expected behavior.
- Add tests confirming unsupported AST nodes remain blocked, such as function calls, attribute access, lists, comparisons, and comprehensions.

## Recommended Next Action

Address the correctness issues for boolean constants and non-finite numeric results first, then add input-size/depth guards before broadening CLI integration coverage.
