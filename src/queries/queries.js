const GET_AUTHORS = `
    {
        authors {
            name
            id
        }
    }
`;

const GET_BOOKS = `
    {
        books {
            name,
            id
        }
    }
`;

const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const ADD_BOOK = `
    mutation ($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name,
            id
        }
    }
`;

const GET_BOOK = `
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;
export {
    GET_AUTHORS,
    GET_BOOKS,
    ADD_BOOK,
    GET_BOOK
}