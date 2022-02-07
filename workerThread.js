import { parentPort } from 'worker_threads'
import { getNonsharedCollection, getsharedCollection , MongoConnect} from './mongoConnect.js'
import { runTestOnCollection, maxOneInsertPerSecond} from './benchmarkOpt.js'

await MongoConnect()
const sharedCollection = await getsharedCollection()
const nonSharedCollection = await getNonsharedCollection()

parentPort.on("message" , msg => {
    benchmarkTest(msg)
})

const benchmarkTest = async (msg) => {
    console.log("run test on sharedColletion from thread")
    await runTestOnCollection(sharedCollection)

    console.log("run test on nonSharedColletion from thread")
    await runTestOnCollection(nonSharedCollection)
   
    // console.log("max insert in 5 second from thread on sharedCollection") 
    // await maxOneInsertPerSecond(sharedCollection).then((value) => {
    //    console.log(value)
    // })

    // console.log("max insert in 5 second from thread on nonSharedCollection") 
    // await maxOneInsertPerSecond(nonSharedCollection).then((value) => {
    //    console.log(value)
    // })

   parentPort.postMessage({res : `opertations from thread success finished after ${(Date.now() - msg)/1000 }`})
}
