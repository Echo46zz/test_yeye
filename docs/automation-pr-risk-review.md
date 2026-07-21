# PR Risk Review

## Summary

最新变更新增了一个基于 Python AST 的命令行计算器，包括实现、README 使用说明和 pytest 单元测试。实现避免直接使用 `eval()`，仅允许基础算术表达式。

## Changed Files

- `python-calculator/calculator.py`: 新增 CLI 入口、AST 表达式解析、安全求值、结果格式化和错误输出逻辑。
- `python-calculator/test_calculator.py`: 覆盖基础四则运算、小数、优先级、括号、除零、非法输入和结果格式化。
- `python-calculator/README.md`: 说明功能、CLI/stdin 用法、错误处理和测试运行方式。

## Potential Risks

- Correctness: `format_result()` 对极大浮点数执行 `int(value)` 比较，可能暴露精度边界行为。
- Security/Availability: 输入长度和 AST 深度没有限制，超长或深度嵌套表达式可能造成较高 CPU/递归消耗。
- Maintainability: 计算器没有打包配置或固定测试依赖，新环境中可能无法直接运行 `pytest`。
- UX: README 示例使用 `python`，但部分环境只提供 `python3`。

## Suggested Tests

- 增加 CLI 集成测试，覆盖命令行参数、stdin、空输入、错误输出和退出码。
- 增加超长表达式、深度嵌套括号和大量一元运算的限制/失败测试。
- 增加浮点边界用例，例如非常大的浮点数、`inf`/`nan` 是否应被拒绝或格式化。
- 增加环境/文档验证，确保 README 中的命令在目标 Python 版本下可执行。

## Recommended Next Action

优先为输入长度和 AST 深度设定明确限制，并补充 CLI 集成测试。当前环境未安装 `pytest`，本次未能执行现有测试套件。
