"""
03_sets_and_operations.py
-------------------------
Demonstrates Python Sets:
- Unordered collections of unique elements (duplicates automatically stripped)
- Fast O(1) membership lookups
- Methods: add(), remove(), discard(), pop()
- Mathematical set operations:
  * Union (|)
  * Intersection (&)
  * Difference (-)
  * Symmetric Difference (^)
"""

def main():
    print("--- 1. Automatic Deduplication with Sets ---")
    raw_tags = ["python", "react", "fastapi", "python", "nextjs", "react", "sql"]
    unique_tags = set(raw_tags)
    print(f"Original Raw Tags ({len(raw_tags)} items): {raw_tags}")
    print(f"Deduplicated Set  ({len(unique_tags)} items): {unique_tags}")

    unique_tags.add("docker")
    unique_tags.discard("sql") # safe removal without throwing error if missing
    print(f"After modifications:              {unique_tags}")

    print("\n--- 2. Mathematical Set Operations ---")
    frontend_skills = {"HTML", "CSS", "JavaScript", "React", "Next.js"}
    backend_skills = {"Python", "FastAPI", "PostgreSQL", "JavaScript", "Docker"}

    print(f"Frontend Team Skills: {frontend_skills}")
    print(f"Backend Team Skills:  {backend_skills}")
    print("-" * 50)

    # Union: All skills combined
    print(f"All Unique Skills (Union |):")
    print(f"  -> {frontend_skills | backend_skills}")

    # Intersection: Shared skills
    print(f"\nShared Skills in Both Teams (Intersection &):")
    print(f"  -> {frontend_skills & backend_skills}")

    # Difference: Frontend-only skills
    print(f"\nFrontend-Only Skills (Difference -):")
    print(f"  -> {frontend_skills - backend_skills}")

    # Symmetric Difference: Skills in either frontend or backend, but NOT both
    print(f"\nNon-Overlapping Skills (Symmetric Difference ^):")
    print(f"  -> {frontend_skills ^ backend_skills}")

if __name__ == "__main__":
    main()
