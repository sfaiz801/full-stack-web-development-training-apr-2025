/**
 * 06_ES6_Plus_Modern_Features/index.js
 * ------------------------------------
 * Demonstrates Modern ECMAScript (ES6 to ES2024):
 * - Destructuring (Array & Object) & Spread Operator (...)
 * - Optional Chaining (?.) and Nullish Coalescing (??)
 * - Template Literals
 * - ES6 Classes, Inheritance (extends), super(), getters & static methods
 */

// 1. ES6 Class Hierarchy
class Course {
    constructor(id, title, durationWeeks) {
        this.id = id;
        this.title = title;
        this.durationWeeks = durationWeeks;
    }

    get summary() {
        return `${this.title} (${this.durationWeeks} weeks)`;
    }

    static compareDuration(courseA, courseB) {
        return courseA.durationWeeks - courseB.durationWeeks;
    }
}

class FullStackTrack extends Course {
    constructor(id, title, durationWeeks, techStack = []) {
        super(id, title, durationWeeks);
        this.techStack = techStack;
    }

    describeStack() {
        return `Track '${this.title}' covers: ${this.techStack.join(", ")}`;
    }
}

function main() {
    console.log("==========================================");
    console.log(" Modern ES6+ JavaScript Features          ");
    console.log("==========================================");

    // 2. Destructuring & Spread Operator
    console.log("\n--- 1. Destructuring & Spread Operator ---");
    const user = {
        name: "Mohammad Faiz",
        role: "Full Stack Engineer",
        skills: ["React", "FastAPI", "Next.js"],
        contact: { email: "faiz@example.com" }
    };

    const { name, role, skills: [primarySkill, ...otherSkills] } = user;
    console.log(`Extracted: ${name} is a ${role}. Primary Skill: ${primarySkill}`);
    console.log(`Other skills via rest:`, otherSkills);

    // Spread into new array/object
    const updatedUser = { ...user, location: "Bengaluru", active: true };
    console.log(`Cloned & Extended Object keys:`, Object.keys(updatedUser));

    // 3. Optional Chaining (?.)
    console.log("\n--- 2. Optional Chaining (?.) ---");
    const company = { name: "Indixpert Technologies" };
    // Safe navigation without TypeError: Cannot read properties of undefined
    const ceoCity = company?.executives?.ceo?.address?.city ?? "Default HQ Location";
    console.log(`Safe deep property access: ${ceoCity}`);

    // 4. ES6 Classes & Inheritance
    console.log("\n--- 3. ES6 Classes & Polymorphic Inheritance ---");
    const fsTrack = new FullStackTrack(
        "FSD-2025",
        "Master Full Stack Engineering",
        24,
        ["HTML/CSS", "Bootstrap", "JavaScript", "React", "Python", "FastAPI", "SQL", "Next.js"]
    );

    console.log(`Course Summary (getter): ${fsTrack.summary}`);
    console.log(fsTrack.describeStack());

    const cTrack = new Course("C-2025", "C Language Core", 6);
    console.log(`Duration difference: ${Course.compareDuration(fsTrack, cTrack)} weeks longer.`);
}

main();
