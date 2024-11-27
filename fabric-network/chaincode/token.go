package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
    contractapi.Contract
}

type Asset struct {
	UID			string `json:"uid"`
    Owner       string `json:"owner"`
    TokenAddress string `json:"tokenAddress"`
    AmountOrId  string `json:"amountOrId"`
    TokenType   string `json:"tokenType"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
    return nil
}

func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, uid string, owner string, amount string) error { 
	asset := Asset{ 
		UID: uid, 
		Owner: owner, 
		Amount: amount 
		} 

	assetJSON, err := json.Marshal(asset) 
	if err != nil 
	{ return err 
		} 
		
	return ctx.GetStub().PutState(asset.UID, assetJSON) 
}

func main() {
    chaincode, err := contractapi.NewChaincode(new(SmartContract))
    if err != nil {
        fmt.Printf("Error creating asset-locker chaincode: %s", err)
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting asset-locker chaincode: %s", err)
    }
}
