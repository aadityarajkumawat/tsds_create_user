const { MongoClient } = require('mongodb')
const { v4: uuid } = require('uuid')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
    'mongodb+srv://tauseef:theposappisnice@posappcluster.gtkmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(url)

async function main() {
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected to server ✅')
    const db = client.db('tsds')

    const usersCollection = db.collection('users')

    const user = {
        LM_ID: uuid(),
        LM_E: 'user1@tsds.com',
        LM_MN: '1234567890',
        LM_P: '$2a$14$pazd4FL/Kb4qzfhqjnRx7.YndWlwTCuAs.vToFTJD3xbkiZKpR.z2',
        LM_PIN: '',
        LM_ROLE: 'store_master',
    }

    // add a user
    await usersCollection.insertOne(user)

    const storeMasterCollection = db.collection('store_master')

    const storeMaster = {
        SM_ID: uuid(),
        SM_N: 'User1 Store',
        SM_MN: user.LM_MN,
        SM_GPS: '',
        SM_ML: '',
        SM_ADD: 'A-71 Curfew Nagar, Banglore',
        SM_ST: 'Karnataka',
        SM_DST: 'Banglore',
        SM_CT: 'Banglore',
        SM_AR: 'Curfew Nagar',
        SM_PIN: '226016',
        SM_STR: 'Mayor Street 23',
        SM_LM: '',
        SM_EMP_C: 5,
        SM_TA: 0,
        SM_TB: 0,
        SM_PUR_BC: 1,
    }

    await storeMasterCollection.insertOne(storeMaster)

    const storeUserRelationCollection = db.collection('store_user_relation')

    const storeUserRelation = {
        LM_ID: user.LM_ID,
        SM_ID: storeMaster.SM_ID,
    }

    await storeUserRelationCollection.insertOne(storeUserRelation)

    return 'done.'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())
