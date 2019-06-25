
/**
 * Contains parsed GraphQL query object and helper methods
 */
export class QueryObject {
    /**
     * Query fields specified in client side query
     */
    public fields: string[]
    /**
     * All relations that are part of the query
     */
    public relations: { [relationName: string]: any }

    constructor(fields: string[], relations: { [relationName: string]: any }) {
        this.fields = fields;
        this.relations = relations;
    }

    /**
     * Check if object has relations
     */
    public hasRelations() {
        return this.relations.keys() !== 0
    }
    
    /**
     * Checks if object has specified relation
     */
    public hasRelation(name: string) {
        return !!this.relations[name]
    }

    /**
     * Returns root fields in format acceptable for most of the sql queries
     * @param separator - separates variables (default ,)
     */
    public getRootFields(separator: string  = ',') {
        return this.fields.map((field) => {
            return `${field}`
        }).join(separator)
    }

    /**
      * Returns relation fields in format acceptable for most of the sql queries.
      * Method works with PostgresDB, MySQL and any other database that supports
      * this syntax.
      *
      * @param mapper - argument that maps composite field to single one.
      * By default `as` for PostgreSQL. Use `on`for mysql.
      * @param separator - separates variables (default ,)
      */
    getRelationFields(relation: string, mapper: string  = 'as', separator: string  = ',') {
        if (this.relations[relation]) {
            return this.relations[relation].map((field) => {
                return `${field} ${mapper} ${relation}__${field}`
            }).join(separator)
        }
    }

    /**
     * Expands single key structure returned from database to graph that can
     * be returned by resolver. Method picks all fields that starts with relation name.
     * For example 'relation__field' and puts them into nested relation structure.
     */
    expandToGraph(data: any) {
        const relationKeys = Object.keys(this.relations);
        for (const relation of relationKeys) {
            for (const element of data) {
                element[relation] = {}
                for (const key in element) {
                    if (key.startsWith(`${relation}__`)) {
                        const originalKey = key.replace(`${relation}__`, '')
                        element[relation][originalKey] = element[key]
                    }
                }
            }
        }
        return data
    }
}


