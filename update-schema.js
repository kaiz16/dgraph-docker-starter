const { default: axios } = require("axios");
const process = require("process");
const fs = require("fs");
const DGRAPH_ADMIN_ENDPOINT = process.argv[2];
const FILE = process.argv[3];
const deploy = async () => {
    const query = JSON.stringify({
        query: `
        mutation UpdateGQLSchema($schema: String!){ 
            updateGQLSchema(input: { set: { schema: $schema } }){ 
                gqlSchema{ 
                    schema 
                } 
            } 
        }
        `,
        variables: {
            schema: fs.readFileSync(FILE, { encoding: "utf-8" }),
        },
    });

    const { data } = await axios.post(DGRAPH_ADMIN_ENDPOINT, query, {
        headers: {
            "content-type": "application/json",
            "X-Dgraph-AuthToken": process.argv[4],
        },
    });
    console.log(data);
};
deploy();
