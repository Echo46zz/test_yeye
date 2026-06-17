# bash-sysinfo

A portable Bash script that prints a clean, sectioned system-information report.

## Sections

| Section | Details |
|---------|---------|
| Hostname | Machine hostname |
| OS / Kernel | Distribution name, kernel version |
| Uptime | System uptime |
| CPU | Model name and core count |
| Memory | Usage summary (`free -h` or `/proc/meminfo`) |
| Disk Usage | Usage of `/` (`df -h`) |
| Logged-in User | Current user and active sessions |

## Quick Start

```bash
chmod +x sysinfo.sh
./sysinfo.sh
```

## Usage

```
sysinfo.sh [-h|--help]
```

| Flag | Description |
|------|-------------|
| `-h`, `--help` | Print help and exit |

## Compatibility

The script uses `#!/usr/bin/env bash` with `set -euo pipefail` and relies on
common utilities (`uname`, `hostname`, `free`, `df`, `who`, `whoami`). Where a
command is unavailable it falls back to alternatives (e.g. `/proc` files,
`sysctl` on macOS) or prints a friendly "unavailable" message.

## License

MIT
