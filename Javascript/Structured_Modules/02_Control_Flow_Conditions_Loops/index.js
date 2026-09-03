/**
 * 02_Control_Flow_Conditions_Loops/index.js
 * ----------------------------------------
 * Demonstrates:
 * - Decision making (if-else, switch-case, ternary operator)
 * - Iteration patterns (for, while, do-while)
 * - for...of (iterables) vs for...in (object keys)
 * - break and continue statements
 */

function main() {
    console.log("==========================================");
    console.log(" Control Flow: Conditions & Iteration     ");
    console.log("==========================================");

    // 1. If-Else Ladder & Ternary Operator
    const score = 88.5;
    let grade;

    if (score >= 90) {
        grade = "A+ (Distinction)";
    } else if (score >= 80) {
        grade = "A (First Class Honours)";
    } else if (score >= 60) {
        grade = "B (Second Class)";
    } else {
        grade = "C (Pass)";
    }

    const statusMessage = score >= 60 ? "Student Passed!" : "Student Needs Revision";
    console.log(`\n--- 1. Conditional Branching ---`);
    console.log(`Marks: ${score} -> Grade: ${grade} | Status: ${statusMessage}`);

    // 2. Switch-Case Statement
    const userRole = "admin";
    console.log(`\n--- 2. Switch-Case Access Control ---`);
    switch (userRole) {
        case "admin":
            console.log("Role: Admin -> Full privileges (Read, Write, Delete, Audit).");
            break;
        case "editor":
            console.log("Role: Editor -> Content privileges (Read, Write).");
            break;
        case "student":
            console.log("Role: Student -> Read-only course access.");
            break;
        default:
            console.log("Role: Guest -> Restricted public view.");
    }

    // 3. Loops: for, while, do-while
    console.log(`\n--- 3. Loops & break / continue ---`);
    const primes = [];
    for (let num = 2; num <= 20; num++) {
        let isPrime = true;
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) {
                isPrime = false;
                break; // Exit inner loop
            }
        }
        if (isPrime) primes.push(num);
    }
    console.log(`Primes between 2 and 20: [${primes.join(", ")}]`);

    // 4. for...of vs for...in
    console.log(`\n--- 4. for...of (Array items) vs for...in (Object properties) ---`);
    const techStack = ["React", "FastAPI", "PostgreSQL", "Next.js"];
    console.log("Iterating with for...of (Elements):");
    for (const tech of techStack) {
        console.log(`  * Technology: ${tech}`);
    }

    const studentProfile = { id: 101, name: "Faiz", cohort: "April-2025", track: "Full Stack" };
    console.log("\nIterating with for...in (Object Keys):");
    for (const key in studentProfile) {
        console.log(`  * ${key}: ${studentProfile[key]}`);
    }
}

main();
