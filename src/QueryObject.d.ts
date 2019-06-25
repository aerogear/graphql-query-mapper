/**
 * Contains parsed GraphQL query object and helper methods
 */
export declare class QueryObject {
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
    constructor(fields: string[], relations: {
        [relationName: string]: any;
    });
    /**
     * Check if object has relations
     */
    hasRelations(): boolean;
    /**
     * Checks if object has specified relation
     */
    hasRelation(name: string): any;
    /**
     * Returns root fields in format acceptable for most of the sql queries
     * @param separator - separates variables (default ,)
     */
    getRootFields(separator: any): string;
    /**
      * Returns relation fields in format acceptable for most of the sql queries.
      * Method works with PostgresDB, MySQL and any other database that supports
      * this syntax.
      *
      * @param mapper - argument that maps composite field to single one.
      * By default `as` for PostgreSQL. Use `on`for mysql.
      * @param separator - separates variables (default ,)
      */
    getRelationFields(relation: any, mapper: any, separator: any): any;
    /**
     * Expands single key structure returned from database to graph that can
     * be returned by resolver. Method pics all fields that starts with relation name.
     * For example 'relation__field' and puts them into nested relation structure.
     */
    expandToGraph(data: any): any;
}
