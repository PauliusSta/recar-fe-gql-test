import gql from "graphql-tag";

/*const UPDATE_PARTS = gql`
   mutation update_parts($id: string!, $isCompleted: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { is_completed: $isCompleted }) {
       affected_rows
     }
   }id: ID!
input: EditPartInput!
 `;*/

export const EDIT_PARTS = gql`
      mutation editPart($id: ID!, $input: EditPartInput!) {
        editPart (id: $id, input: $input) {
          part {
            id
            name
            price
            manufacturer
            model
            year
            color
          }
        }
      }`;

export const REMOVE_PART = gql`
       mutation deletePart($id: ID!) {
         deletePart( id: $id ) {
            part {
              id
              name
              price
              manufacturer
              model
              year
              color
            }
         }
       }`;

export const ADD_PART = gql`
        mutation createPart($input: CreatePartInput!) {
          createPart (input: $input) {
            part {
              id
              name
              price
              manufacturer
              model
              year
              color
            }
          }
      }`;

export const GET_PARTS = gql`
      query parts($filters: PartsFilterInput!, $sortBy: PartsSortByInput!) {
        parts (filters: $filters, sortBy: $sortBy) {
          id
          name
          price
          manufacturer
          model
          year
          color
      }
    }`;