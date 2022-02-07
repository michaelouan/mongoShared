const insertOne = async (collection) => {
    return collection.insertOne({dc : "pkz" , date : new Date() , evenef : "dghdbf" , number : 57})
}

const insertOneManyTime = async (collection) => {
    var bulk = collection.initializeUnorderedBulkOp();
        for (let index = 0; index < 100000; index++) {
        var dc = "";
        var numberRandom = null;
        index % 2 == 0 ? dc="pkz" : dc = "evn"
        index % 2 == 0 ? numberRandom = Math.floor(Math.random() * 100) : numberRandom = Math.floor(Math.random() * 100 + 100)
        bulk.insert({dc : dc , date : new Date() , evenef : "dghdbf" , number : numberRandom})
    }
        await bulk.execute()
        return collection.insertOne({dc : dc , date : new Date() , evenef : "dghdbf" , number : 53})
}

const insertManyOneArray = async (collection) => {
    let arr = []
    for (let index = 0; index < 10000; index++) {
        var dc = "";
        var numberRandom = null;
        index % 2 == 0 ? dc="pkz" : dc = "evn"
        index % 2 == 0 ? numberRandom = Math.floor(Math.random() * 100) : numberRandom = Math.floor(Math.random() * 100 + 100)
        const element = {dc : dc , date : new Date() , evenef : "dghdbf" , number : numberRandom}
        arr.push(element)
    }
    return collection.insertMany(arr)
}

const updateOne = async (collection) => {
    return collection.updateOne({dc : "pkz"} , { $set: {evenef: "dsfdgsgkknjklnklnkjy"}})
}

const findWithSardKey = async (collection) => {
    return collection.find({dc : "pkz" , number : 26}).toArray()
}

const findAll = async (collection) => {
    return collection.find({})
}

const find = async (collection) => {
    return collection.find({number : 26}).toArray()
}

const maxOneInsertPerSecond = async (collection) => {
    var startTime = Date.now();
    let count =0;
    while ((Date.now() - startTime) < 5000) {
        await collection.insertOne({dc : "evn" , date : new Date() , evenef : "dghdbf"})
        count++;
    }
    return Promise.resolve(`insert ${count+1} in 5 seconds`)
}

const makeTest = async (fn,collection,test) => {
    var start = Date.now();
    await fn(collection)
    return Promise.resolve(`test ${test} finished after ${(Date.now() - start)/1000} seconds`)
}

const runTestOnCollection = async  (collection) => {
    console.log("maxinsert for 5 seconds")
    await maxOneInsertPerSecond(collection).then((value) => console.log(value))
    await makeTest(insertOne,collection,"insert One alone").then((value) => console.log(value))
    await makeTest(insertManyOneArray,collection,"insertManyOneArray Alone").then((value) => console.log(value))
    await makeTest(insertOneManyTime,collection,"insertOneManyTime Alone").then((value) => console.log(value))
    //makeTest(updateOne,collection,"update One Alone").then((value) => console.log(value))
    await makeTest(findAll,collection,"find all alone").then((value) => console.log(value))
    await makeTest(findWithSardKey,collection,"find with shardKey").then((value) => console.log(value))
    return Promise.all([makeTest(insertOne,collection,"insert One"),
                        makeTest(insertOneManyTime,collection,"insertOneManyTime loop 10000 doc"),
                        makeTest(insertManyOneArray,collection,"insert Many arr 10000 doc"),
                        //makeTest(updateOne,collection,"update One"),
                        makeTest(findWithSardKey,collection,"find with shardKey"),
                        makeTest(findAll,collection,"find All"),
                        makeTest(find,collection,"find")]).then((values)=>{
                                    console.log(values)
                                })
}

export { runTestOnCollection }
