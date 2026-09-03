"""
Project 12: Employee Payroll & Salary Slip Generator
Topic: OOP, Inheritance, String formatting, Tax calculations
Description: Compute employee basic salary, allowances (HRA, DA), tax deductions, and generate payslips.
"""

class Employee:
    def __init__(self, emp_id, name, department, basic_salary):
        self.emp_id = emp_id
        self.name = name
        self.department = department
        self.basic_salary = float(basic_salary)

    def calculate_allowances(self):
        # 20% House Rent Allowance (HRA), 10% Dearness Allowance (DA), 5% Medical
        hra = self.basic_salary * 0.20
        da = self.basic_salary * 0.10
        medical = self.basic_salary * 0.05
        return hra, da, medical

    def calculate_deductions(self):
        # 12% Provident Fund (PF), 5% Professional Tax
        pf = self.basic_salary * 0.12
        tax = self.basic_salary * 0.05
        return pf, tax

    def calculate_net_salary(self):
        hra, da, med = self.calculate_allowances()
        pf, tax = self.calculate_deductions()
        gross = self.basic_salary + hra + da + med
        deductions = pf + tax
        net = gross - deductions
        return gross, deductions, net

    def generate_payslip(self, month="Current Month"):
        hra, da, med = self.calculate_allowances()
        pf, tax = self.calculate_deductions()
        gross, total_ded, net = self.calculate_net_salary()

        print("\n" + "=" * 55)
        print(f"            MONTHLY SALARY PAYSLIP ({month})")
        print("=" * 55)
        print(f"Employee ID : {self.emp_id:<15} Department : {self.department}")
        print(f"Name        : {self.name}")
        print("-" * 55)
        print(f"{'EARNINGS':<28} | {'DEDUCTIONS':<20}")
        print("-" * 55)
        print(f"Basic Salary   : ${self.basic_salary:<10.2f} | PF (12%)       : ${pf:.2f}")
        print(f"HRA (20%)      : ${hra:<10.2f} | Income Tax (5%): ${tax:.2f}")
        print(f"DA (10%)       : ${da:<10.2f} |")
        print(f"Medical (5%)   : ${med:<10.2f} |")
        print("-" * 55)
        print(f"Gross Earnings : ${gross:<10.2f} | Total Ded.     : ${total_ded:.2f}")
        print("=" * 55)
        print(f"               NET TAKE-HOME SALARY: ${net:.2f}")
        print("=" * 55)

def main():
    print("=== EMPLOYEE PAYROLL & SALARY CALCULATOR ===")
    emp_id = input("Enter Employee ID (e.g. EMP101): ").strip()
    name = input("Enter Employee Name: ").strip()
    dept = input("Enter Department (e.g. Engineering/Sales): ").strip()
    
    try:
        basic = float(input("Enter Monthly Basic Salary ($): "))
        month = input("Enter Salary Month (e.g. August 2026): ").strip() or "Current"
        emp = Employee(emp_id, name, dept, basic)
        emp.generate_payslip(month)
    except ValueError:
        print("Invalid salary amount!")

if __name__ == '__main__':
    main()
