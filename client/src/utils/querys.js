import gql from "graphql-tag";


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
      },
    }`;