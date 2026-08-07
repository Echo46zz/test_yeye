# Python CLI Calculator

A simple command-line calculator that safely evaluates arithmetic expressions using Python's `ast` module.

## Features

- Supports `+`, `-`, `*`, `/`, parentheses, and decimal numbers
- Safe evaluation — no `eval()` on raw input
- Reads from command-line argument or stdin

## Usage

```bash
# As a command-line argument
python calculator.py "2 + 3 * 4"
# Output: 14

# With parentheses
python calculator.py "(2 + 3) * 4"
# Output: 20

# Decimals
python calculator.py "1.5 + 2.5"
# Output: 4

# From stdin
echo "10 / 3" | python calculator.py
# Output: 3.3333333333333335

# Negative numbers
python calculator.py "-5 + 3"
# Output: -2
```

## Error Handling

Invalid input and division by zero produce a clear error message and exit with code 1:

```bash
python calculator.py "1 / 0"
# Error: division by zero

python calculator.py "abc"
# Error: Invalid expression: 'abc'
```

## Running Tests

```bash
pip install pytest
pytest test_calculator.py -v
```
