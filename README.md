# Xillio API content script examples

This project contains examples of Xillio API content script.

To develop content scripts you develop them locally using a local instance of nodejs. You can use the `testlocal` command to test your content script. With `uploadscript` and `updatescriptdefinition` you can add your script to a configuration Xillio. With `testapi` you can test your newly created or updated content script. See below for a description of these commands.

To prepare your environment to use the scripts that interact with Xillio you need to run the following steps.

1. Run `npm install` to install dependencies
2. Create a '.env' file with the following information

```env
TENANT=https://<yourtenant>.xill.io
USERNAME=<user>
PASSWORD=<password>
CLIENTID=<clientid>
CLIENTSECRET=<clientsecret>
```

Please enter the appropriate information for your Xillio environment.

## Test contentscript locally

You can use the `testlocal` command to test a content script.

### Usage

```sh
./testlocal <content script> <input file>
```

### Examples

```sh
./testlocal scripts/identity.js input/json-2-xml-test.json
```

Expected output:

```json
{
    "test": "this is a string value",
    "more": {
        "complex": "this is also a string value",
        "other": 1
    },
    "many more": [
        1, 2, 3
    ],
    "weird names?": [
        {
            "with a lot  of sp@@@@@ce": 1
        }
    ]
}
```

```sh
./testlocal scripts/json-2-xml.js input/json-2-xml-test.json
```

Expected output:

```xml
<?xml version="1.0" ?><json><test>this is a string value</test><more><complex>this is also a string value</complex><other>1</other></more><many_more>1</many_more><many_more>2</many_more><many_more>3</many_more><weird_names.><with_a_lot__of_sp.....ce>1</with_a_lot__of_sp.....ce></weird_names.></json>
```

## Upload script

Run `uploadscript <configurationId> <mimeType> <contentScriptFileName>` to upload the content script to the specified configuration.

## Update script definition

Run `updatescriptdefinition <configurationid> <mimeType> <description> [<passEntity>] [type]` to update the description, passEntity or type field for a content script.

## Test the uploaded script

Run `testapi <configurationid> <mimeType> <path>` to test your script. The mimeType should match the mimeType of a configured content script.
