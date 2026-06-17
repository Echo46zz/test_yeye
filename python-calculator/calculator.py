#!/usr/bin/env python3
"""CLI calculator that safely evaluates arithmetic expressions using the ast module."""

import argparse
import ast
import operator
import sys

OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}


def safe_eval(node):
    """Recursively evaluate an AST node containing only arithmetic operations."""
    if isinstance(node, ast.Expression):
        return safe_eval(node.body)

    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)):
            return node.value
        raise ValueError(f"Unsupported constant: {node.value!r}")

    if isinstance(node, ast.BinOp):
        op_type = type(node.op)
        if op_type not in OPERATORS:
            raise ValueError(f"Unsupported operator: {op_type.__name__}")
        left = safe_eval(node.left)
        right = safe_eval(node.right)
        if op_type is ast.Div and right == 0:
            raise ZeroDivisionError("division by zero")
        return OPERATORS[op_type](left, right)

    if isinstance(node, ast.UnaryOp):
        op_type = type(node.op)
        if op_type not in OPERATORS:
            raise ValueError(f"Unsupported unary operator: {op_type.__name__}")
        return OPERATORS[op_type](safe_eval(node.operand))

    raise ValueError(f"Unsupported expression: {ast.dump(node)}")


def calculate(expression: str) -> float:
    """Parse and safely evaluate an arithmetic expression string."""
    try:
        tree = ast.parse(expression, mode="eval")
    except SyntaxError as exc:
        raise ValueError(f"Invalid expression: {expression!r}") from exc
    return safe_eval(tree)


def format_result(value: float) -> str:
    """Format a numeric result, dropping unnecessary trailing zeros."""
    if isinstance(value, float) and value == int(value):
        return str(int(value))
    return str(value)


def main():
    parser = argparse.ArgumentParser(
        description="Safely evaluate an arithmetic expression."
    )
    parser.add_argument(
        "expression",
        nargs="?",
        help='Arithmetic expression to evaluate, e.g. "2 + 3 * 4". Reads from stdin if omitted.',
    )
    args = parser.parse_args()

    expression = args.expression
    if expression is None:
        expression = sys.stdin.read().strip()

    if not expression:
        print("Error: no expression provided", file=sys.stderr)
        sys.exit(1)

    try:
        result = calculate(expression)
        print(format_result(result))
    except (ValueError, ZeroDivisionError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
