# PR Risk Review

## Summary

Latest repository changes add a small Python command-line calculator under `python-calculator/`. The implementation uses Python `ast` parsing with an operator whitelist, includes pytest coverage for basic expressions, and documents usage.

## Changed Files

- `python-calculator/calculator.py` - Implements the CLI, safe AST evaluation, result formatting, stdin support, and error handling.
- `python-calculator/test_calculator.py` - Adds pytest coverage for arithmetic, decimals, precedence, parentheses, invalid input, division by zero, and formatting.
- `python-calculator/README.md` - Documents features, examples, error behavior, and how to run tests.

## Potential Risks

- Very deeply nested or very large expressions may trigger high CPU/memory use or recursion-depth errors because there is no input size or AST depth limit.
- Floating-point arithmetic can produce precision surprises for decimal inputs; this is expected for `float` but should be called out if users expect decimal calculator behavior.
- CLI behavior depends on users quoting expressions correctly when passing them as a single positional argument.
- Unsupported expression errors may expose verbose AST dumps for unusual inputs, which is useful for debugging but less polished for end users.

## Suggested Tests

- Add subprocess-based CLI tests for command-line arguments, stdin input, stderr messages, and non-zero exit codes.
- Add stress/limit tests for long expressions and deeply nested parentheses once input size or depth limits are defined.
- Add explicit tests for unsupported AST constructs such as function calls, attribute access, lists, and comparisons.
- Add tests that document expected floating-point behavior for values like `0.1 + 0.2`.

## Recommended Next Action

Add lightweight CLI integration tests and consider enforcing a maximum expression length or AST depth before relying on this calculator with untrusted or very large input.
