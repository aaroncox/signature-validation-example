This repository was quickly thrown to gether showing how to generate and sign transactions using [@greymass/eosio](https://github.com/greymass/eosio-core) and verify that data.

# Setup

To run, install the dependencies via npm or yarn.

```bash
npm install
```

or

```bash
yarn
```

# Generating a packed transaction for testing

If you don't already have a packed transaction, you can use the `generate.js` script to create one. Feel free to modify the script to contain whatever action, private key, and other data you may need for your testing purposes. 

```bash
node generate.js
```

The script will output information and the final line it generates will be a packed transaction:

```bash
Transaction
{"expiration":"2021-08-19T19:44:19","ref_block_num":12898,"ref_block_prefix":2881683835,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"fio.token","name":"transfer","authorization":[{"actor":"corecorecore","permission":"active"}],"data":"a02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c33"}],"transaction_extensions":[]}

Signature Created
SIG_K1_KBhymXm7xccfM4pFRkgruvdUJRxxCZwDm3qJjAjt3yokH6Z8rJNouc2rcBSqnmjXMrYy9yizjsL68JhQmzjVCiKX1MGpGw

Signed Transaction
{"expiration":"2021-08-19T19:44:19","ref_block_num":12898,"ref_block_prefix":2881683835,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"fio.token","name":"transfer","authorization":[{"actor":"corecorecore","permission":"active"}],"data":"a02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c33"}],"transaction_extensions":[],"signatures":["SIG_K1_KBhymXm7xccfM4pFRkgruvdUJRxxCZwDm3qJjAjt3yokH6Z8rJNouc2rcBSqnmjXMrYy9yizjsL68JhQmzjVCiKX1MGpGw"],"context_free_data":[]}

Packed Transaction
{"signatures":["SIG_K1_KBhymXm7xccfM4pFRkgruvdUJRxxCZwDm3qJjAjt3yokH6Z8rJNouc2rcBSqnmjXMrYy9yizjsL68JhQmzjVCiKX1MGpGw"],"compression":0,"packed_context_free_data":"00","packed_trx":"93b41e6162327b01c3ab00000000010000980ad20ca85b000000572d3ccdcd01a02e45ea52a42e4500000000a8ed32323aa02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c3300"}
```

# Verify the data of a packed transaction

To validate and recover the information from a packed transaction, run the `verify.js` script and pass the packed transaction, as JSON, as a parameter like so: 

```bash
node verify.js '{"signatures":["SIG_K1_KWh6NHkt3UNMT5jm7kNKLximzgnp8sgtCGcDmsZPmsRbF8BSXHVQScQChfoxFPH6SRbuy18RB41kmci4m4MBYC9TP6pQNA"],"compression":0,"packed_context_free_data":"00","packed_trx":"29b01e6186291e22bc5400000000010000980ad20ca85b000000572d3ccdcd01a02e45ea52a42e4500000000a8ed32323aa02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c3300"}'
```

The script will output information related to the packed transaction such as:

```bash
Packed Transaction
{"signatures":["SIG_K1_KWh6NHkt3UNMT5jm7kNKLximzgnp8sgtCGcDmsZPmsRbF8BSXHVQScQChfoxFPH6SRbuy18RB41kmci4m4MBYC9TP6pQNA"],"compression":0,"packed_context_free_data":"00","packed_trx":"29b01e6186291e22bc5400000000010000980ad20ca85b000000572d3ccdcd01a02e45ea52a42e4500000000a8ed32323aa02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c3300"}

Signed Transaction
{"expiration":"2021-08-19T19:25:29","ref_block_num":10630,"ref_block_prefix":1421615646,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"fio.token","name":"transfer","authorization":[{"actor":"corecorecore","permission":"active"}],"data":"a02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c33"}],"transaction_extensions":[],"signatures":["SIG_K1_KWh6NHkt3UNMT5jm7kNKLximzgnp8sgtCGcDmsZPmsRbF8BSXHVQScQChfoxFPH6SRbuy18RB41kmci4m4MBYC9TP6pQNA"],"context_free_data":[]}

Transaction
{"expiration":"2021-08-19T19:25:29","ref_block_num":10630,"ref_block_prefix":1421615646,"max_net_usage_words":0,"max_cpu_usage_ms":0,"delay_sec":0,"context_free_actions":[],"actions":[{"account":"fio.token","name":"transfer","authorization":[{"actor":"corecorecore","permission":"active"}],"data":"a02e45ea52a42e4580b1915e5d268dca2a0000000000000004454f530000000019656f73696f2d636f7265206973207468652062657374203c33"}],"transaction_extensions":[]}

Signing Digest
571c6056fb8b5a6289fe7249994a7efbc84653a40fce7d74314a9253cc4736a1

Public Key from Signing Digest
"PUB_K1_82dtsN8K68pjyDR73nPtm81akA1nRHqNbwW25ietEEV7PJ9Qz6"

Signing Digest Verified
true
```