// Task 1: Print Numbers with Conditions
// Print numbers from 16 to 50 with conditions

for(let i = 16; i <= 50; i++){
    if(i%4 == 0 & i%6 == 0){
        console.log('QuadHex')
    }else if(i%4 == 0){
        console.log('Quad')
    }else if(i%6 == 0){
        console.log('Hex')
    }else{
        console.log(i)
    }
}

