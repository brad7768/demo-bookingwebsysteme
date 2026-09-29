#!/usr/bin/env python3
"""Procedural Lumière atelier assets when Higgsfield credits are unavailable."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]
OUT_GLB = ROOT / "public" / "studio" / "atelier-form.glb"
OUT_SOURCE = ROOT / "tmp" / "lumiere-scroll-source.mp4"
FRAMES_DIR = ROOT / "tmp" / "scroll-frames"

W, H = 1920, 1080
FPS = 24
DURATION = 12.0
N_FRAMES = int(DURATION * FPS)

# Brand tokens
BG = np.array([0.11, 0.10, 0.09])  # #1c1916
IVORY = np.array([0.94, 0.90, 0.85])
TAUPE = np.array([0.71, 0.64, 0.56])


def _smooth_noise(u: np.ndarray, v: np.ndarray, t: float) -> np.ndarray:
    return (
        np.sin(u * 3.1 + t * 0.4) * 0.35
        + np.sin(v * 2.7 - t * 0.3) * 0.25
        + np.sin((u + v) * 1.9 + t * 0.2) * 0.2
    )


def render_frame(i: int) -> np.ndarray:
    t = i / max(N_FRAMES - 1, 1)
    orbit = t * math.pi * 0.55 - 0.25
    push = 0.82 + t * 0.22
    light_az = orbit + 0.9

    ys, xs = np.mgrid[0:H, 0:W]
    nx = (xs / W - 0.5) * 2.0
    ny = (ys / H - 0.5) * 2.0

    # Vignette charcoal field
    r = np.sqrt(nx * nx + ny * ny)
    vignette = np.clip(1.0 - r * 0.35, 0.2, 1.0)
    img = BG * vignette[..., None]

    # Sculptural SDF-ish blob (center-safe)
    cx, cy = 0.08 * math.sin(orbit * 0.5), -0.05 * math.cos(orbit * 0.4)
    sx, sy = 0.34 * push, 0.48 * push
    dx = (nx - cx) / sx
    dy = (ny - cy) / sy
    zz = np.sqrt(np.clip(1.0 - dx * dx - dy * dy, 0, 1))
    on_surface = zz > 0.02

    # Fake normals for shading
    lx = math.cos(light_az)
    ly = -0.35
    lz = math.sin(light_az)
    nx3 = dx * on_surface
    ny3 = dy * on_surface
    nz3 = zz * on_surface
    ndotl = np.clip(nx3 * lx + ny3 * ly + nz3 * lz, 0, 1)

    ripple = _smooth_noise(nx, ny, t * 6.0)
    albedo = IVORY * (0.55 + 0.25 * ndotl[..., None]) + TAUPE * (0.15 + 0.35 * ndotl[..., None])
    albedo = albedo * (1.0 + 0.08 * ripple[..., None])

    mask = on_surface & (zz < 0.98)
    img = np.where(mask[..., None], albedo, img)

    # Soft floor reflection
    floor = np.exp(-((ny - 0.55) ** 2) / 0.02) * 0.12
    img += floor[..., None] * TAUPE

    return np.clip(img * 255, 0, 255).astype(np.uint8)


def build_glb() -> None:
    sphere = trimesh.creation.icosphere(subdivisions=5, radius=1.0)
    v = sphere.vertices.copy()
    for idx, (x, y, z) in enumerate(v):
        u = math.atan2(z, x)
        w = y
        bulge = 0.22 * math.sin(3 * u) * math.cos(2 * w)
        pinch = 0.12 * math.sin(5 * w + 1.2)
        scale = 1.0 + bulge + pinch
        v[idx] = np.array([x, y * 1.35, z]) * scale
    sphere.vertices = v
    sphere.vertices *= np.array([0.55, 0.85, 0.55])
    sphere.vertices += np.array([0, -0.05, 0])

    colors = np.tile(np.array([210, 195, 175, 255], dtype=np.uint8), (len(sphere.vertices), 1))
    sphere.visual.vertex_colors = colors
    OUT_GLB.parent.mkdir(parents=True, exist_ok=True)
    sphere.export(OUT_GLB)


def build_scroll_source() -> None:
    try:
        from PIL import Image
    except ImportError:
        subprocess.check_call(["pip", "install", "pillow", "-q"])
        from PIL import Image

    FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    for i in range(N_FRAMES):
        arr = render_frame(i)
        Image.fromarray(arr).save(FRAMES_DIR / f"frame_{i:04d}.png")

    OUT_SOURCE.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-framerate",
            str(FPS),
            "-i",
            str(FRAMES_DIR / "frame_%04d.png"),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-crf",
            "18",
            str(OUT_SOURCE),
        ]
    )


def main() -> None:
    build_glb()
    build_scroll_source()
    print(f"Wrote {OUT_GLB} ({OUT_GLB.stat().st_size} bytes)")
    print(f"Wrote {OUT_SOURCE} ({OUT_SOURCE.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
