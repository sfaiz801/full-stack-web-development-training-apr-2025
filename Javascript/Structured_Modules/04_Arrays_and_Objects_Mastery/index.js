/**
 * 04_Arrays_and_Objects_Mastery/index.js
 * --------------------------------------
 * Demonstrates:
 * - Functional Array Methods (map, filter, reduce, find, some, every)
 * - Array sorting & slice/splice
 * - Modern Object manipulation, Object.keys/values/entries, and Object.freeze
 */

function main() {
    console.log("==========================================");
    console.log(" Arrays & Objects: Functional Mastery     ");
    console.log("==========================================");

    // 1. Array Data Collection
    const students = [
        { id: 1, name: "Mohammad Faiz", score: 94, track: "Full Stack", active: true },
        { id: 2, name: "Amit Sharma", score: 82, track: "Backend", active: true },
        { id: 3, name: "Sara Khan", score: 91, track: "Full Stack", active: true },
        { id: 4, name: "Rohit Verma", score: 58, track: "Frontend", active: false },
        { id: 5, name: "Pooja Patel", score: 76, track: "Backend", active: true }
    ];

    console.log("\n--- 1. Higher-Order Array Transformations ---");

    // map: Extract names
    const names = students.map(s => s.name);
    console.log("Mapped Names:", names);

    // filter: Active students with score >= 80
    const topPerformers = students.filter(s => s.active && s.score >= 80);
    console.log(`Top Performers (${topPerformers.length}):`, topPerformers.map(s => `${s.name} (${s.score}%)`));

    // reduce: Calculate average score of active students
    const activeStudents = students.filter(s => s.active);
    const totalScore = activeStudents.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = (totalScore / activeStudents.length).toFixed(1);
    console.log(`Average Score (Active Cohort): ${averageScore}%`);

    // find & some & every
    const foundFaiz = students.find(s => s.name.includes("Faiz"));
    console.log("Found Student via find():", foundFaiz.name, `[ID: ${foundFaiz.id}]`);
    console.log("Are all students active? (every):", students.every(s => s.active));
    console.log("Is any student scoring > 90? (some):", students.some(s => s.score > 90));

    // 2. Object Manipulation & Metadata Reflection
    console.log("\n--- 2. Object Introspection (keys, values, entries) ---");
    const courseConfig = {
        title: "Full Stack Web Development",
        modules: 7,
        frameworks: ["React", "FastAPI", "Next.js"],
        instructor: "Indixpert Mentor Team"
    };

    console.log("Object.keys():   ", Object.keys(courseConfig));
    console.log("Object.values(): ", Object.values(courseConfig));
    console.log("Object.entries():");
    for (const [key, value] of Object.entries(courseConfig)) {
        console.log(`  * ${key.padEnd(12)} -> ${Array.isArray(value) ? value.join(", ") : value}`);
    }

    // 3. Object Immutability via Object.freeze()
    console.log("\n--- 3. Object Immutability (Object.freeze) ---");
    const immutableTheme = Object.freeze({ primary: "#38bdf8", mode: "dark" });
    try {
        // Attempt mutation
        immutableTheme.primary = "#ff0000";
    } catch (e) {
        // Strict mode throws, non-strict fails silently
    }
    console.log("Frozen theme remains untouched:", immutableTheme);
}

main();
