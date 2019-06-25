import { FieldNode, GraphQLResolveInfo, SelectionSetNode } from "graphql"

/**
* Get field name from node
*/
export const getFieldName = (node: FieldNode) => {
    return node.alias ? node.alias.value : node.name.value
}

/**
 * Traverses Graphql selectionSet for fields that were requrested by client
 *
 * *Inputs:*
 * @param info (see: https://tinyurl.com/y3wplolb)
 * @param selectionSet
 * @param {} fields - fields requested by client
 * @param {{}} relations - relations that client includes
 */
export const visitNodes = (info: GraphQLResolveInfo,
    selectionSet: SelectionSetNode,
    fields: string[],
    relations: { [relationName: string]: any }) => {
    for (const selection of selectionSet.selections) {
        if (selection.kind === 'Field') {
            const responseName = this.getFieldName(selection)
            if (selection.selectionSet) {
                relations[responseName] = []
                this.visitNodes(info, selection.selectionSet, relations[responseName], relations)
            } else {
                fields.push(responseName)
            }
        } else if (selection.kind === 'InlineFragment') {
            // @ts-ignore
            this.visitNodes(info, selection.selectionSet, fields, relations)
        } else if (selection.kind === 'FragmentSpread') {
            const fragment = info.fragments[selection.name.value]
            // @ts-ignore
            this.visitNodes(info, fragment.selectionSet, fields, relations)
        }
    }
}