"""
utility_pkg/string_helpers.py
-----------------------------
Provides string formatting and sanitization utilities.
"""

import re

def slugify(text: str) -> str:
    """Converts a title into a clean URL-friendly slug."""
    text = text.lower().strip()
    # Replace non-alphanumeric characters with hyphens
    text = re.sub(r"[^\w\s-]", "", text)
    slug = re.sub(r"[\s_-]+", "-", text)
    return slug

def mask_email(email: str) -> str:
    """Masks personal email for privacy (e.g. faiz@example.com -> f***z@example.com)."""
    if "@" not in email:
        return email
    user, domain = email.split("@", 1)
    if len(user) <= 2:
        masked_user = user[0] + "*"
    else:
        masked_user = user[0] + ("*" * (len(user) - 2)) + user[-1]
    return f"{masked_user}@{domain}"
