"""Tests for calculator.py."""

import pytest

from calculator import calculate, format_result


class TestBasicOperations:
    def test_addition(self):
        assert calculate("2 + 3") == 5

    def test_subtraction(self):
        assert calculate("10 - 4") == 6

    def test_multiplication(self):
        assert calculate("3 * 7") == 21

    def test_division(self):
        assert calculate("20 / 4") == 5.0

    def test_negative_result(self):
        assert calculate("3 - 10") == -7

    def test_unary_negative(self):
        assert calculate("-5") == -5

    def test_unary_positive(self):
        assert calculate("+5") == 5


class TestDecimals:
    def test_decimal_addition(self):
        assert calculate("1.5 + 2.5") == 4.0

    def test_decimal_multiplication(self):
        assert abs(calculate("0.1 * 0.2") - 0.02) < 1e-9

    def test_decimal_result(self):
        assert calculate("7 / 2") == 3.5


class TestPrecedence:
    def test_mul_before_add(self):
        assert calculate("2 + 3 * 4") == 14

    def test_div_before_sub(self):
        assert calculate("10 - 6 / 2") == 7.0

    def test_left_to_right(self):
        assert calculate("10 - 3 - 2") == 5


class TestParentheses:
    def test_parentheses_override_precedence(self):
        assert calculate("(2 + 3) * 4") == 20

    def test_nested_parentheses(self):
        assert calculate("((2 + 3) * (4 - 1))") == 15

    def test_parentheses_division(self):
        assert calculate("(10 + 2) / 3") == 4.0


class TestDivisionByZero:
    def test_divide_by_zero(self):
        with pytest.raises(ZeroDivisionError):
            calculate("1 / 0")

    def test_divide_by_zero_expression(self):
        with pytest.raises(ZeroDivisionError):
            calculate("10 / (5 - 5)")


class TestInvalidInput:
    def test_empty_string(self):
        with pytest.raises(ValueError):
            calculate("")

    def test_letters(self):
        with pytest.raises(ValueError):
            calculate("abc")

    def test_unsupported_operator(self):
        with pytest.raises(ValueError):
            calculate("2 ** 3")

    def test_incomplete_expression(self):
        with pytest.raises(ValueError):
            calculate("2 +")

    def test_string_literal(self):
        with pytest.raises(ValueError):
            calculate("'hello'")


class TestFormatResult:
    def test_integer_result(self):
        assert format_result(5.0) == "5"

    def test_float_result(self):
        assert format_result(3.5) == "3.5"

    def test_int_type(self):
        assert format_result(7) == "7"
