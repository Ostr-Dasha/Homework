// 1

function helloName(name) {
    return console.log(`Hello ${name}`)
}

helloName('Alex')
console.log('///////////////////////')

// 2

const numbers = [11, 10, 100, 234, 4]

function numbersMoreTen(array) {
    for (let i = 0; i <= array.length; ++i) {
        if (array[i] > 10) console.log(array[i])
    }
}

numbersMoreTen(numbers)
console.log('///////////////////////')

// 3

function calculator(number1, number2, operator) {
    if (operator === 'plus') return (number1 + number2);
    else
        if (operator === 'minus') return (number1 - number2);
        else
            if (operator === 'mult') return (number1 * number2);
            else
                if (operator === 'del') return (number1 / number2);
                else return ('Error')
}

console.log(calculator(4, 8, 'minus'))
console.log(calculator(4, 8, 'plus'))
console.log(calculator(4, 8, 'mult'))
console.log(calculator(4, 8, 'del'))
console.log(calculator(4, 8, 'asdf'))