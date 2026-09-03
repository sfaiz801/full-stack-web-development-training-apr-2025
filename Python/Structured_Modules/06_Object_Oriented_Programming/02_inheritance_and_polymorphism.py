"""
02_inheritance_and_polymorphism.py
----------------------------------
Demonstrates:
- Inheritance: Subclasses extending base classes
- Method overriding and super() call
- Polymorphism: Different classes responding to the same method interface
"""

class Employee:
    """Base Class."""
    def __init__(self, emp_id: str, name: str, base_salary: float):
        self.emp_id = emp_id
        self.name = name
        self.base_salary = base_salary

    def calculate_monthly_pay(self) -> float:
        return self.base_salary

    def get_role_description(self) -> str:
        return f"Standard Employee ({self.name})"

class SoftwareDeveloper(Employee):
    """Derived Class extending Employee."""
    def __init__(self, emp_id: str, name: str, base_salary: float, tech_stack: str, bonus: float):
        super().__init__(emp_id, name, base_salary)
        self.tech_stack = tech_stack
        self.bonus = bonus

    def calculate_monthly_pay(self) -> float:
        # Overriding base method
        return self.base_salary + self.bonus

    def get_role_description(self) -> str:
        return f"Developer ({self.name}, Stack: {self.tech_stack})"

class ProjectManager(Employee):
    """Another Derived Class extending Employee."""
    def __init__(self, emp_id: str, name: str, base_salary: float, team_size: int):
        super().__init__(emp_id, name, base_salary)
        self.team_size = team_size

    def calculate_monthly_pay(self) -> float:
        # PM gets allowance based on team size
        return self.base_salary + (self.team_size * 2500.0)

    def get_role_description(self) -> str:
        return f"Project Manager ({self.name}, Team: {self.team_size} members)"

def print_payroll_slip(emp: Employee):
    """
    Polymorphic function: Accepts ANY Employee object
    and seamlessly executes its respective overridden methods!
    """
    print(f"Role: {emp.get_role_description():<45} | Pay: Rs. {emp.calculate_monthly_pay():,.2f}")

def main():
    print("--- Polymorphism & Inheritance in Action ---")
    staff_members = [
        SoftwareDeveloper("DEV-01", "Mohammad Faiz", 75000.0, "Next.js + Python", 15000.0),
        SoftwareDeveloper("DEV-02", "Amit Verma", 65000.0, "React + Node", 10000.0),
        ProjectManager("MGR-01", "Pooja Sharma", 90000.0, team_size=8)
    ]

    for staff in staff_members:
        print_payroll_slip(staff)

if __name__ == "__main__":
    main()
