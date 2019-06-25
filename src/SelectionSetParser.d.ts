/**
* Get field name from node
*/
export declare const getFieldName: (node: any) => any;
/**
 * Traverses Graphql selectionSet for fields that were requrested by client
 *
 * *Inputs:*
 * @param info (see: https://tinyurl.com/y3wplolb)
 * @param selectionSet
 * @param {} fields - fields requested by client
 * @param {{}} relations - relations that client includes
 */
export declare const visitNodes: (info: any, selectionSet: any, fields: string[], relations: {
    [relationName: string]: any;
}) => void;
