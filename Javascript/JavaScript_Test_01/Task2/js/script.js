// Task 2: Sum of Prime Numbers in a Range



function getPrime(num) {
    for (let i = 2; i <= num / 2; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return num
}
function sumOfPrime(num1, num2) {
    let sum = 0
    for (let i = num1; i <= num2; i++) {
        if (getPrime(i)) {
            sum += i
        }
    }
    return sum
}
console.log(sumOfPrime(21, 50))