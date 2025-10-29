#!/usr/bin/env python3
"""
A standalone Python CLI that mimics the code_artefact "find_replace" behavior.

Supports:
- type=added: create a new file with new_code
- type=modified: replace a unique old_code snippet in target file with new_code
  - If old_code is empty, overwrite entire file with new_code
- type=removed: delete a file
- type=renamed: rename a file (requires --new-path)

Usage examples:
  # Modify a snippet
  python artefact_patcher.py --type modified --file index.html --old-code "$(cat old.txt)" --new-code "$(cat new.txt)"

  # Overwrite an entire file
  python artefact_patcher.py --type modified --file index.html --new-code "$(cat full_content.html)"

  # Add new file
  python artefact_patcher.py --type added --file path/to/newfile.txt --new-code "Hello"

  # Remove file
  python artefact_patcher.py --type removed --file path/to/remove.txt

  # Rename file
  python artefact_patcher.py --type renamed --file path/old.txt --new-path path/new.txt
"""

import argparse
import os
from pathlib import Path


def apply_added(file_path: Path, new_code: str) -> None:
    if file_path.exists():
        raise FileExistsError(f"File already exists: {file_path}")
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(new_code, encoding="utf-8")


def apply_removed(file_path: Path) -> None:
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    if file_path.is_dir():
        raise IsADirectoryError(f"Path is a directory, refusing to remove: {file_path}")
    file_path.unlink()


def apply_renamed(file_path: Path, new_path: Path) -> None:
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    new_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.replace(new_path)


def apply_modified(file_path: Path, old_code: str, new_code: str) -> None:
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    if file_path.is_dir():
        raise IsADirectoryError(f"Path is a directory, refusing to modify: {file_path}")

    current = file_path.read_text(encoding="utf-8")

    # Overwrite entire file if old_code is empty
    if old_code == "":
        file_path.write_text(new_code, encoding="utf-8")
        return

    # Ensure the old_code uniquely matches exactly one position
    occurrences = []
    start = 0
    while True:
        idx = current.find(old_code, start)
        if idx == -1:
            break
        occurrences.append(idx)
        start = idx + len(old_code)

    if len(occurrences) == 0:
        raise ValueError("old_code not found in target file.")
    if len(occurrences) > 1:
        raise ValueError("old_code matches multiple locations; refine the snippet to be unique.")

    updated = current.replace(old_code, new_code, 1)
    file_path.write_text(updated, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Apply content-based patches similar to code_artefact.")
    p.add_argument("--type", required=True, choices=["added", "modified", "removed", "renamed"], help="Operation type.")
    p.add_argument("--file", required=True, help="Target file path for the operation.")
    p.add_argument("--old-code", default="", help="Exact snippet to replace (leave empty to overwrite entire file).")
    p.add_argument("--new-code", default="", help="Replacement/new content.")
    p.add_argument("--new-path", default="", help="New path for type=renamed.")
    return p.parse_args()


def main() -> None:
    args = parse_args()
    file_path = Path(args.file)

    if args.type == "added":
        if args.new_code == "":
            raise ValueError("new_code is required for type=added.")
        apply_added(file_path, args.new_code)

    elif args.type == "removed":
        apply_removed(file_path)

    elif args.type == "renamed":
        if not args.new_path:
            raise ValueError("new-path is required for type=renamed.")
        new_path = Path(args.new_path)
        apply_renamed(file_path, new_path)

    elif args.type == "modified":
        if args.new_code == "" and args.old_code == "":
            raise ValueError("For type=modified, provide new_code (old_code can be empty to overwrite).")
        apply_modified(file_path, args.old_code, args.new_code)

    else:
        raise ValueError(f"Unsupported type: {args.type}")

    print("Patch applied successfully.")


if __name__ == "__main__":
    main()