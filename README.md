# GraphQL Query Mapper

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphql-query-mapper/raw/master/resources/animation.gif">
  <br/>

  `GraphQL Query Mapper` transform resolver info object into structure that can be 
  used to filter data based on fields queried by client. </br></br>
  QueryMapper will help you to build GraphQL API without overfetching data on the server.
</p>



# Example use case

When building public GraphQL API external developers can often missuse the queries. 
For example `getProfile` query that does expensive fetch from different servers can be used 
only to fetch `username` for home page. To prevent from overfetching we can extract 
information about required fields from the info object and avoid expensive queries.

## Query Mapping 

Query mapping will prevent from server side database overfetching data by 
providing list of the fields that were requested in the client side query.
Developers can use them to perform targeted queries against their database and rest endpoints.

Library exposes following methods:

`getQueryObject`: provides list of fields that user queried with additional helpers for database access

Example:
```javascript
import { getQueryObject} from 'graphql-query-mapper'

const resolvers = {
  Query: {
    models (_, params, context, info) {
      const queryData = getQueryObject(info)
      // Example database queries ()
      console.log(`${queryData.getRootFields()}`)
    }
  }
}
```

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
     * be returned by resolver. Method picks all fields that starts with relation name.
     * For example 'relation__field' and puts them into nested relation structure.
     */
    expandToGraph(data: any): any;
```


## Limitations

Derived fields  (for example `fullname` that consist of the `firstName`+`secondName` from database ) will now require additional checks in the resolver.

## Roadmap

- [x] Parsing info object
- [x] Relational data query filtering
- [ ] NoSQL data query filtering

## License

Apache-2.0

## Notes

Project maintained by AeroGear GraphQL Team:
https://github.com/aerogear/graphql-home