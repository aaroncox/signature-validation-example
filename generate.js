const { 
    Action,
    APIClient,
    FetchProvider,
    PackedTransaction,
    PrivateKey,
    Signature,
    SignedTransaction,
    Transaction
} = require('@greymass/eosio')


// EOSIO API Client
const fetch = require('node-fetch')
const provider = new FetchProvider('https://fio.greymass.com', {fetch})
const api = new APIClient({provider})

// Private key used for signing the example
const privateKey = PrivateKey.from('5JW71y3njNNVf9fiGaufq8Up5XiGk68jZ5tYhKpy69yyU9cr7n9')

async function main() {
    // Generate tapos headers
    const info = await api.v1.chain.get_info()
    const header = info.getTransactionHeader()

    // Create the action to perform
    const untypedAction = {
        authorization: [
            {
                actor: 'corecorecore',
                permission: 'active',
            },
        ],
        account: 'fio.token',
        name: 'transfer',
        data: {
            from: 'corecorecore',
            to: 'teamgreymass',
            quantity: '0.0042 EOS',
            memo: 'eosio-core is the best <3',
        },
    }

    // Retrieve the ABI for the transaction
    const {abi} = await api.v1.chain.get_abi(untypedAction.account)
    if (!abi) {
        throw new Error(`No ABI for ${untypedAction.account}`)
    }

    // Create the transaction itself
    const action = Action.from(untypedAction, abi)
    const transaction = Transaction.from({
        ...header,
        actions: [action],
    })
    console.log('\nTransaction')
    console.log(JSON.stringify(transaction))

    // Create signature for the transaction using the private key
    const signature = privateKey.signDigest(transaction.signingDigest(info.chain_id))
    console.log('\nSignature Created')
    console.log(String(signature))

    // Create signed transaction object
    const signedTransaction = SignedTransaction.from({
        ...transaction,
        signatures: [signature],
    })
    console.log('\nSigned Transaction')
    console.log(JSON.stringify(signedTransaction))

    // Convert to a packed transaction
    const packedTransaction = PackedTransaction.fromSigned(signedTransaction)
    console.log('\nPacked Transaction')
    console.log(JSON.stringify(packedTransaction))
}

main()

