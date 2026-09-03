/**
 * 01_Fundamentals_Variables_DataTypes/index.js
 * ---------------------------------------------
 * Demonstrates:
 * - Variable declarations (var vs let vs const), block scope & TDZ
 * - Primitive data types (number, string, boolean, undefined, null, symbol, bigint)
 * - Strict (===) vs loose (==) equality & type coercion
 * - Logical operators (&&, ||) and Nullish Coalescing (??)
 */

function main() {
    console.log("==================================================");
    console.log(" JavaScript Fundamentals: Variables & Data Types  ");
    console.log("==================================================");

    // 1. Variable Scope (let vs const vs var)
    let studentName = "Mohammad Faiz";
    const cohortYear = 2025;
    var legacyModule = "Web Fundamentals";

    {
        let blockScoped = "I exist only inside this block";
        var functionScoped = "I leak outside the block!";
    }
    console.log(`\n--- 1. Variable Scoping ---`);
    console.log(`Student: ${studentName} | Cohort: ${cohortYear}`);
    console.log(`Leaked var variable: '${functionScoped}'`);

    // 2. Primitive Data Types & typeof
    console.log(`\n--- 2. Primitive Types & typeof operator ---`);
    const typesDemo = [
        { val: 42, label: "Number" },
        { val: 9007199254740991n, label: "BigInt" },
        { val: "Full Stack Developer", label: "String" },
        { val: true, label: "Boolean" },
        { val: undefined, label: "Undefined" },
        { val: null, label: "Null (historical typeof object bug)" },
        { val: Symbol("id"), label: "Symbol" }
    ];

    typesDemo.forEach(item => {
        console.log(`Value: ${String(item.val).padEnd(25)} | typeof: ${typeof item.val} (${item.label})`);
    });

    // 3. Strict (===) vs Loose (==) Equality
    console.log(`\n--- 3. Equality & Type Coercion ---`);
    console.log(`"42" ==  42  -> ${"42" == 42}  (Loose equality coerces string to number)`);
    console.log(`"42" === 42  -> ${"42" === 42} (Strict equality checks value AND type)`);
    console.log(`null ==  undefined -> ${null == undefined} (Loose true)`);
    console.log(`null === undefined -> ${null === undefined} (Strict false)`);

    // 4. Nullish Coalescing (??) vs Logical OR (||)
    console.log(`\n--- 4. Logical OR (||) vs Nullish Coalescing (??) ---`);
    const userScore = 0; // 0 is falsy, but a valid numeric score!
    const fallbackScore1 = userScore || 50; // Replaces 0 with 50 (undesired)
    const fallbackScore2 = userScore ?? 50; // Keeps 0 (only null/undefined triggers fallback)

    console.log(`Score with ||: ${fallbackScore1} (incorrectly replaced 0)`);
    console.log(`Score with ??: ${fallbackScore2} (correctly preserved 0)`);
}

main();
