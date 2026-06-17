#!/usr/bin/env bash
set -euo pipefail

VERSION="1.0.0"

usage() {
    cat <<EOF
sysinfo.sh v${VERSION} — portable system information report

Usage: ${0##*/} [-h|--help]

Options:
  -h, --help    Show this help message and exit

Prints a sectioned report covering:
  • Hostname          • OS / Kernel
  • Uptime            • CPU model & core count
  • Memory usage      • Disk usage of /
  • Logged-in user
EOF
}

# ---------------------------------------------------------------------------
# Argument parsing
# ---------------------------------------------------------------------------
for arg in "$@"; do
    case "$arg" in
        -h|--help) usage; exit 0 ;;
        *)
            printf 'Unknown option: %s\n' "$arg" >&2
            usage >&2
            exit 1
            ;;
    esac
done

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
section() {
    printf '\n==== %s ====\n' "$1"
}

cmd_exists() {
    command -v "$1" >/dev/null 2>&1
}

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
printf '=== System Information Report ===\n'
printf 'Generated: %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')"

# --- Hostname --------------------------------------------------------------
section "Hostname"
hostname 2>/dev/null || printf '%s\n' "${HOSTNAME:-unknown}"

# --- OS / Kernel -----------------------------------------------------------
section "OS / Kernel"
if cmd_exists uname; then
    printf 'Kernel : %s\n' "$(uname -srm)"
fi
if [ -f /etc/os-release ]; then
    # shellcheck source=/dev/null
    . /etc/os-release
    printf 'OS     : %s\n' "${PRETTY_NAME:-${NAME:-unknown}}"
elif cmd_exists sw_vers; then
    printf 'OS     : macOS %s\n' "$(sw_vers -productVersion)"
elif cmd_exists lsb_release; then
    printf 'OS     : %s\n' "$(lsb_release -ds)"
else
    printf 'OS     : unknown\n'
fi

# --- Uptime ----------------------------------------------------------------
section "Uptime"
if cmd_exists uptime; then
    uptime
elif [ -f /proc/uptime ]; then
    read -r up _ < /proc/uptime
    printf 'Up %.0f seconds\n' "$up"
else
    printf 'Uptime information unavailable\n'
fi

# --- CPU -------------------------------------------------------------------
section "CPU"
if [ -f /proc/cpuinfo ]; then
    model=$(grep -m1 'model name' /proc/cpuinfo 2>/dev/null | cut -d: -f2 | sed 's/^ //' || true)
    cores=$(grep -c '^processor' /proc/cpuinfo 2>/dev/null || true)
    printf 'Model  : %s\n' "${model:-unknown}"
    printf 'Cores  : %s\n' "${cores:-unknown}"
elif cmd_exists sysctl; then
    printf 'Model  : %s\n' "$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo unknown)"
    printf 'Cores  : %s\n' "$(sysctl -n hw.ncpu 2>/dev/null || echo unknown)"
else
    printf 'CPU information unavailable\n'
fi

# --- Memory ----------------------------------------------------------------
section "Memory"
if cmd_exists free; then
    free -h 2>/dev/null || free
elif [ -f /proc/meminfo ]; then
    grep -E '^(MemTotal|MemAvailable|MemFree)' /proc/meminfo
elif cmd_exists vm_stat; then
    vm_stat
else
    printf 'Memory information unavailable\n'
fi

# --- Disk usage of / -------------------------------------------------------
section "Disk Usage (/)"
if cmd_exists df; then
    df -h / 2>/dev/null || df /
else
    printf 'Disk usage information unavailable\n'
fi

# --- Logged-in user --------------------------------------------------------
section "Logged-in User"
if cmd_exists whoami; then
    printf 'User   : %s\n' "$(whoami)"
elif [ -n "${USER:-}" ]; then
    printf 'User   : %s\n' "$USER"
else
    printf 'User   : unknown\n'
fi
if cmd_exists who; then
    printf '\nCurrently logged-in users:\n'
    who 2>/dev/null || true
fi

printf '\n=== End of Report ===\n'
