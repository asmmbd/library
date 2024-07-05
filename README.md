## localdb 

localdb is a JavaScript library for local storage.

## Installation

Use localdb using cdn

```javascript
https://cdn.jsdelivr.net/gh/asmmbd/library@main/localdb.js
```

## Usage

```javascript
const database = new Database()

// Get data from local storage.
const response = database.getDocument(collectionId, documentId)
response.then(data => console.log(data))

// Get all data from local storage.
const response = database.listDocuments(collectionId)
response.then(data => console.log(data))

// Update data on local storage.
const response = database.getDocument(collectionId, documentId, data)
response.then(data => console.log(data))

// Delete data from local storage.
const response = database.deleteDocument(collectionId, documentId)
response.then(data => console.log(data))
