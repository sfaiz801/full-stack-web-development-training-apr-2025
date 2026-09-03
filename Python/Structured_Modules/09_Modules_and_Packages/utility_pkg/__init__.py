"""
utility_pkg/__init__.py
-----------------------
Package initialization file.
Demonstrates:
- Treating a directory as a Python package
- Exposing specific functions at the package root level
- __all__ export list
"""

from .math_helpers import calculate_gst, is_prime
from .string_helpers import slugify, mask_email

__all__ = ["calculate_gst", "is_prime", "slugify", "mask_email"]
