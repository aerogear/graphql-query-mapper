import { visitNodes } from "./SelectionSetParser";
import { GraphQLResolveInfo } from "graphql"
import { QueryObject } from './QueryObject';


/**
* Extracts fields that were requested in query. For example
*
* @param info (see: https://tinyurl.com/y3wplolb)
* @return {QueryObject} containing list of fields and relationships
*
*  _Example output_:
*  `js
*  {
*   fields:   [ 'key1', 'key2' ]
*   relations: {
*      parent: ['key1']
*   }
*  }
*  `
*/
export const getQueryObject = (info: GraphQLResolveInfo) => {
  const fields = []
  const relations = {}
  if (info) {
    const fieldNodes = info.fieldNodes
    if (fieldNodes || fieldNodes.length !== 0) {
      visitNodes(info, fieldNodes[0].selectionSet, fields, relations)
    }
  }
  return new QueryObject(fields, relations);
}

