import React, { Component } from 'react';
import { GET_BOOK } from '../queries/queries';
import { http } from '../interceptor';


class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           bookId: null,
           book: null
        }
    }
    componentDidUpdate() {
        let {bookId} = this.props;
        if(bookId != this.state.bookId) {
            http.post('',{
                query: GET_BOOK,
                variables: {
                    id: bookId
                }
            }).then(result => {
                this.setState({book: result.data.data.book, bookId})
            })
        }
    }
    displayBookDetails(){
        const { book } = this.state;
        if(book){
            return(
                <div>
                    <h2>{ book.name }</h2>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default BookDetails;