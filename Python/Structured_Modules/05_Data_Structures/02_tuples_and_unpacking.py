"""
02_tuples_and_unpacking.py
--------------------------
Demonstrates Python Tuples:
- Ordered, immutable sequences (cannot be modified after creation)
- Memory efficiency compared to lists
- Tuple packing and multiple variable unpacking
- Extended unpacking with star operator (*rest)
- Tuple methods: count(), index()
"""

def get_server_status():
    """Returns a tuple of (host, port, is_active, latency_ms)."""
    return ("127.0.0.1", 8000, True, 14.5)

def main():
    print("--- 1. Tuple Immutability & Characteristics ---")
    point_2d = (10, 25)
    rgb_color = (255, 128, 0)
    print(f"2D Point Coordinate: {point_2d} (Type: {type(point_2d).__name__})")
    print(f"RGB Color Tuple:     {rgb_color}")

    # Tuples are immutable: attempting point_2d[0] = 50 raises TypeError

    print("\n--- 2. Tuple Packing and Unpacking ---")
    # Packing from function return
    host, port, is_active, latency = get_server_status()
    print(f"Host:       {host}")
    print(f"Port:       {port}")
    print(f"Active:     {is_active}")
    print(f"Latency:    {latency} ms")

    print("\n--- 3. Extended Unpacking with *star operator ---")
    score_records = (99, 95, 91, 88, 82, 75, 68)
    highest, second, *middle_scores, lowest = score_records
    print(f"Top 1st:       {highest}")
    print(f"Top 2nd:       {second}")
    print(f"Middle cohort: {middle_scores}")
    print(f"Lowest:        {lowest}")

    print("\n--- 4. Tuple Methods: count() & index() ---")
    data = (1, 2, 3, 2, 4, 2, 5)
    print(f"Occurrences of 2: {data.count(2)}")
    print(f"First index of 4: {data.index(4)}")

if __name__ == "__main__":
    main()
