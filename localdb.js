class Database {
      uniqueId() {
        return crypto.randomUUID();
      }
      async listDocuments(collectionName, query) {
        try {
          let collection = JSON.parse(localStorage.getItem(collectionName)) || [];
          if (!query) {
            return collection;
          }

          let filteredData = collection.filter(doc => {
            return Object.entries(query).every(([key, value]) => doc[key] === value);
          });

          return filteredData;
        } catch (error) {
          throw error;
        }
      }

      async createDocument(collectionName, collectionId, data) {
        try {
          let collection = JSON.parse(localStorage.getItem(collectionName)) || [];
          let newDocument = { 
            $id: collectionId || this.uniqueId(), 
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(), ...data };
          localStorage.setItem(collectionName, JSON.stringify([...collection, newDocument]));
          return newDocument;
        } catch (error) {
          throw error;
        }
      }

      async getDocument(collectionName, documentId) {
        try {
          let collection = JSON.parse(localStorage.getItem(collectionName)) || [];
          let doc = collection.find(doc => doc.$id === documentId);
          if (doc) {
            return doc;
          } else {
            throw { code: 404, message: 'No data available' };
          }
        } catch (error) {
          throw error;
        }
      }

      async updateDocument(collectionName, documentId, data) {
        try {
          let collection = JSON.parse(localStorage.getItem(collectionName)) || [];
          let updatedCollection = collection.map(doc => {
            if (doc.$id === documentId) {
              return { ...doc, ...data, updatedAt: new Date().toUTCString() };
            }
            return doc;
          });

          localStorage.setItem(collectionName, JSON.stringify(updatedCollection));
          return updatedCollection;
        } catch (error) {
          throw error;
        }
      }

      async deleteDocument(collectionName, documentId) {
        try {
          let collection = JSON.parse(localStorage.getItem(collectionName)) || [];
          let updatedCollection = collection.filter(doc => doc.$id !== documentId);

          localStorage.setItem(collectionName, JSON.stringify(updatedCollection));
          return updatedCollection;
        } catch (error) {
          throw error;
        }
      }
    }
