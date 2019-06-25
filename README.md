# graphql-query-mapper
Library to query your data in resolvers and map them to expected types.

## Query Mapping 

Query mapping will prevent from server side database overfetching data by 
providing list of the fields that were requested in the client side query.
Developers can use them to perform targeted queries against their database and rest endpoints.

When query filtering is enabled context will contain following methods:
-  getQueryFields - provides list of fields that user queried
-  buildQueryObject - provides additional helpers for database access

Example:
```javascript
import { getQueryObject} from 'graphql-query-mapper'

const resolvers = {
  Query: {
    dogs (_, params, context, info) {
      const queryData = getQueryObject(info)
      // Example database queries
      console.log(`SQL ROOT QUERY: 
                   select ${queryData.getRootFields()} from Dog`)
      if (queryData.hasRelation('mother')) {
        console.log(`SQL RELATION QUERY: 
                    select ${queryData.getRelationFields('mother')} from DoggyParents`)
      }
      // return results of 2 db queries
    }
  }
}