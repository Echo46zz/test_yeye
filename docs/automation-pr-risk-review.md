# PR Risk Review

## Summary

Latest repository changes add a small Python CLI calculator that safely evaluates arithmetic expressions with `ast`, along with README usage docs and pytest coverage. The implementation is intentionally compact and avoids raw `eval()`, but it does not enforce input complexity limits.

## Changed Files

- `python-calculator/calculator.py`: Adds the CLI entry point, AST-based expression parsing, arithmetic evaluation for `+`, `-`, `*`, `/`, unary signs, stdin support, result formatting, and user-facing error handling.
- `python-calculator/test_calculator.py`: Adds pytest coverage for basic arithmetic, decimals, operator precedence, parentheses, division by zero, invalid inputs, and result formatting.
- `python-calculator/README.md`: Documents calculator features, CLI/stdin usage examples, error behavior, and test execution.

## Potential Risks

- Correctness: Very large numeric literals or expressions can produce huge integers/floats; `format_result()` may fail for non-finite floats such as `1e309`.
- Security/availability: The AST whitelist blocks code execution, but there are no limits on expression length, nesting depth, or numeric size, so crafted input could consume CPU or memory.
- Maintainability: The calculator is not packaged as an installable module and has no dependency/test configuration file, so invocation may depend on the current working directory.
- User experience: CLI behavior is covered indirectly by implementation tests, but subprocess-level exit codes, stderr messages, and stdin handling are not tested.

## Suggested Tests

- Add CLI subprocess tests for argument input, stdin input, empty input, invalid expressions, and division-by-zero exit code/stderr behavior.
- Add tests for rejected AST constructs such as function calls, attribute access, lists, dictionaries, comprehensions, and boolean operations.
- Add boundary tests for deeply nested expressions, very long expressions, very large integers, and non-finite float literals.
- Add a repo-root test command or configuration check so `pytest` works consistently from the repository root and from `python-calculator/`.

## Recommended Next Action

Keep the calculator change small, but add input complexity limits and CLI-level tests before treating it as production-ready.
