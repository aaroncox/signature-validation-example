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

// Get the packed transaction from the command line
const [input] = process.argv.slice(2);

// EOSIO API Client
const fetch = require('node-fetch')
const provider = new FetchProvider('https://fio.greymass.com', {fetch})
const api = new APIClient({provider})

async function main() {
    // Get chain info
    const info = await api.v1.chain.get_info()

    const packedTransaction = PackedTransaction.from(JSON.parse(input))
    console.log('\nPacked Transaction')
    console.log(JSON.stringify(packedTransaction))

    const signedTransaction = packedTransaction.getSignedTransaction()
    console.log('\nSigned Transaction')
    console.log(JSON.stringify(signedTransaction))

    const transaction = packedTransaction.getTransaction()
    console.log('\nTransaction')
    console.log(JSON.stringify(transaction))

    const digest = transaction.signingDigest(info.chain_id)
    console.log('\nSigning Digest')
    console.log(String(digest))

    const publicKey = packedTransaction.signatures[0].recoverDigest(digest)
    console.log('\nPublic Key from Signing Digest')
    console.log(String(publicKey.toLegacyString('FIO')))

    const digestVerified = packedTransaction.signatures[0].verifyDigest(digest, publicKey)
    console.log('\nSigning Digest Verified')
    console.log(JSON.stringify(digestVerified))

}

main()

