#!/usr/bin/env python3
"""contrast.py — hitung rasio kontras WCAG dan verdict teks normal/besar.

Usage:
    python3 contrast.py "#FFFFFF" "#777777"
    # normal text: FAIL (4.48 < 4.5)
    # large text:  PASS (4.48 >= 3.0)

Dua argumen hex (#RRGGBB), urutan bebas; fungsi memilih yang lebih terang
sebagai foreground luminance. Exit 0 normal; 1 bila input tak valid.
"""
import re
import sys


def parse_hex(value: str) -> tuple[int, int, int]:
    m = re.fullmatch(r"#?([0-9a-fA-F]{6})", value.strip())
    if not m:
        raise ValueError(f"format hex tak valid: {value}")
    h = m.group(1)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def channel_linear(channel: int) -> float:
    c = channel / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = [channel_linear(c) for c in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    l1 = relative_luminance(a)
    l2 = relative_luminance(b)
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: python3 contrast.py \"#RRGGBB\" \"#RRGGBB\"", file=sys.stderr)
        return 2
    try:
        c1 = parse_hex(sys.argv[1])
        c2 = parse_hex(sys.argv[2])
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1
    ratio = contrast_ratio(c1, c2)
    normal = ratio >= 4.5
    large = ratio >= 3.0
    verdict_normal = "PASS" if normal else "FAIL"
    verdict_large = "PASS" if large else "FAIL"
    print(f"ratio: {ratio:.2f}:1")
    print(f"normal text (4.5): {verdict_normal} ({ratio:.2f} {'>= 4.5' if normal else '< 4.5'})")
    print(f"large text  (3.0): {verdict_large} ({ratio:.2f} {'>= 3.0' if large else '< 3.0'})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())