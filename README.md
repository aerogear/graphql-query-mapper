# GraphQL Query Mapper

Library to query your data in resolvers and map them to expected types.

## Query Mapping 

Query mapping will prevent from server side database overfetching data by 
providing list of the fields that were requested in the client side query.
Developers can use them to perform targeted queries against their database and rest endpoints.

Library exposes following methods:

-  getQueryObject - provides list of fields that user queried with additional helpers for database access

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

## API

`getQueryObject` returns following type

```typescript

    /**
     * Query fields specified in client side query
     */
    fields: string[];

    /**
     * All relations that are part of the query
     */
    relations: {
        [relationName: string]: any;
    };

    /**
     * Check if object has relations
     */
    hasRelations(): boolean;

    /**
     * Checks if object has specified relation
     */
    hasRelation(name: string): boolean;

    /**
     * Returns root fields in format acceptable for most of the sql queries
     * @param separator - separates variables (default ,)
     */
    getRootFields(separator?: string): string;

    /**
     * Returns relation fields in format acceptable for most of the sql queries.
     * Method works with PostgresDB, MySQL and any other database that supports
     * this syntax.
     *
     * @param mapper - argument that maps composite field to single one.
     * By default `as` for PostgreSQL. Use `on`for mysql.
     * @param separator - separates variables (default ,)
     */
    getRelationFields(relation: string, mapper?: string, separator?: string): any;

    /**
     * Expands single key structure returned from database to graph that can
     * be returned by resolver. Method pics all fields that starts with relation name.
     * For example 'relation__field' and puts them into nested relation structure.
     */
    expandToGraph(data: any): any;
```

## Notes

Project maintained by AeroGear GraphQL Team:
https://github.com/aerogear/graphql-home