import { getsharedCollection, getNonsharedCollection, MongoConnect} from './mongoConnect.js'
import { Worker } from 'worker_threads'
import { runTestOnCollection , maxOneInsertPerSecond} from './benchmarkOpt.js'

const testWithThread = async () => {
    let data = {dc : "pkz" , date : new Date() , evenef : "dghdbf" , number : 12}
    const saveWorker = new Worker('./workerThread.js')
    saveWorker.postMessage({data : data})  
}

const main = async () => {

    await MongoConnect()

    const sharedCollection = await getsharedCollection();
    const nonSharedCollection = await getNonsharedCollection();

    console.log(`make tests on shared collection`)
    await runTestOnCollection(sharedCollection)

    console.log(`make tests on nonSharedCollection`)
    await runTestOnCollection(nonSharedCollection)

    console.log("max insert per second on shared collection")
    await maxOneInsertPerSecond(sharedCollection).then((value) =>{
        console.log(value)
    })    

    console.log("max insert per second on nonSharedCollection")
    await maxOneInsertPerSecond(nonSharedCollection).then((value) =>{
        console.log(value)
    })

    console.log("run all test on thread")
    testWithThread()

    //testWithThread()
}

main()