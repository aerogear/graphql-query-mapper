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
export declare const getQueryFields: (info: any) => QueryObject;
