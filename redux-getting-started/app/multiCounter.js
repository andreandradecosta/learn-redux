var expect = require('expect')
var deepFreeze = require('deep-freeze')


function addCounter(list) {
    return list.concat([0])
}

function removeCounter(list, index) {
    return list
            .slice(0, index)
            .concat(list.slice(index + 1))
}

function incrementCounter(list ,index) {
    return list
        .slice(0, index)
        .concat([list[index] + 1])
        .concat(list.slice(index + 1))
}


//Tests
function testAddCounter() {
    var listBefore = []
    var listAfter = [0]

    deepFreeze(listBefore)

    expect(
        addCounter(listBefore)
    ).toEqual(listAfter)
}
testAddCounter()

function testRemoveCounter() {
    var listBefore = [0, 10, 20]
    var listAfter = [0, 20]

    deepFreeze(listBefore)

    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter)
}
testRemoveCounter()


function testIncrementCounter() {
    var listBefore = [0, 10, 20]
    var listAfter = [0, 11, 20]

    deepFreeze(listBefore)

    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter)
}
testIncrementCounter()

console.log('Tests passed');
