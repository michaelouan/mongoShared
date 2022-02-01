const insertOne = async (collection) => {
    await collection.insertOne({dc : "pkz" , date : new Date() , evenef : "dghdbf" , number : 57})
}

const insertOneManyTime = async (collection) => {
    for (let index = 0; index < 1000; index++) {
        var dc = "";
        var numberRandom = null;
        index % 2 == 0 ? dc="pkz" : dc = "evn"
        index % 2 == 0 ? numberRandom = Math.floor(Math.random() * 100) : numberRandom = Math.floor(Math.random() * 100 + 100)
        await collection.insertOne({dc : dc , date : new Date() , evenef : "dghdbf" , number : numberRandom})
    }
}

const InsertMany = async (collection) => {
    let arr = []
    for (let index = 0; index < 1000; index++) {
        var dc = "";
        var numberRandom = null;
        index % 2 == 0 ? dc="pkz" : dc = "evn"
        index % 2 == 0 ? numberRandom = Math.floor(Math.random() * 100) : numberRandom = Math.floor(Math.random() * 100 + 100)
        const element = {dc : dc , date : new Date() , evenef : "dghdbf" , number : numberRandom} 
        arr.push(element)
    }
    await collection.insertMany(arr)
}

const updateOne = async (collection) => {
    await collection.updateOne({dc : "pkz"} , { $set: {evenef: "dsfdgsgkknjklnklnkjy"}})
}

const findWithSardKey = async (collection) => {
    await collection.find({dc : "pkz" , number : 26}).toArray()
}

const findAll = async (collection) => {
    await collection.find({})
}

const find = async (collection) => {
    await collection.find({number : 26}).toArray()
}

const maxOneInsertPerSecond = async (collection) => {
    var startTime = Date.now();
    let count =0;
    while ((Date.now() - startTime) < 5000) {
        await collection.insertOne({dc : "evn" , date : new Date() , evenef : "dghdbf"})
        count++;
    }
    return Promise.resolve(`insert ${count} in 5 seconds`)
}

const makeTest = async (fn,collection,test) => {
    var start = Date.now();
    await fn(collection)
    return Promise.resolve(`test ${test} finished after ${(Date.now() - start)/1000} seconds`)
}

const runTestOnCollection = async  (collection) => {
    await Promise.all([makeTest(insertOne,collection,"insert One"),
                        makeTest(insertOneManyTime,collection,"insertOneManyTime loop 10000 doc"),
                        makeTest(InsertMany,collection,"insert Many arr 10000 doc"),
                        makeTest(updateOne,collection,"update One"),
                        makeTest(findWithSardKey,collection,"find with shardKey"),
                        makeTest(findAll,collection,"find All"),
                        makeTest(find,collection,"find")]).then((values)=>{
                                    console.log(values)
                                })
}

export { runTestOnCollection, maxOneInsertPerSecond}