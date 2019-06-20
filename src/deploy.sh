#!/usr/bin/env bash

STACK="MALPERCIO-NET"
BUCKET="malpercio.net"

# Run sam to deploy package
sam build -t "$1".template.yaml -b ./build/resources --use-container -m ./requirements.txt
sam package --template-file ./build/resources/template.yaml --s3-bucket "$BUCKET-$1" --output-template-file "$1".packaged.yaml
sam deploy --template-file "$1".packaged.yaml --stack-name "$STACK-$1" --capabilities CAPABILITY_NAMED_IAM --parameter-overrides StageName="$1"
