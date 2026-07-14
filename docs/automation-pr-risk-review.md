# PR Risk Review

## Summary

Latest reviewed change: `efb2a40` (`Add Python CLI calculator with ast-based safe eval, tests, and docs`).

The change adds a small Python command-line calculator under `python-calculator/`. It safely parses arithmetic expressions with `ast`, supports basic operators, includes pytest coverage for core expression handling, and documents usage.

## Changed Files

- `python-calculator/calculator.py` - Adds the CLI entry point, expression parsing, restricted AST evaluation, result formatting, stdin handling, and user-facing error output.
- `python-calculator/test_calculator.py` - Adds pytest unit tests for basic operations, decimals, precedence, parentheses, division by zero, invalid input, and result formatting.
- `python-calculator/README.md` - Documents calculator features, command-line/stdin usage examples, error handling, and how to run tests.

## Potential Risks

- Correctness: `format_result()` converts any float equal to an integer into an integer string. This is convenient for `4.0`, but very large floats, infinities, or precision edge cases could produce surprising output if future operations expand beyond the current scope.
- Security/availability: AST evaluation blocks names, calls, and unsupported operators, but there is no input size or AST depth limit. Extremely large or deeply nested expressions could consume CPU or recursion depth in a CLI context.
- Maintainability: Supported operators are encoded in one shared `OPERATORS` map for both binary and unary operators. This is compact, but future operators may need clearer separation to avoid accidental support in the wrong expression shape.
- Packaging: The calculator is currently a standalone script without dependency metadata or a package entry point, so test/install behavior depends on running commands from the `python-calculator/` directory.

## Suggested Tests

- Add CLI-level tests that invoke `calculator.py` with arguments and stdin, asserting stdout, stderr, and exit codes.
- Add stress/guardrail tests for very long or deeply nested expressions to define acceptable failure behavior.
- Add tests for unsupported AST nodes such as lists, dictionaries, comparisons, boolean operators, function calls, and variable names.
- Add tests for formatting edge cases, including negative decimal results and floating-point precision examples.

## Recommended Next Action

Keep the implementation as-is for a lightweight calculator, then add CLI integration tests before relying on it as a user-facing command. If this will be exposed to untrusted or automated input, add explicit expression length/depth limits.
