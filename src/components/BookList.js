import React, { Component } from 'react';
import {http} from '../interceptor';
import {GET_BOOKS} from '../queries/queries';


class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bookList: [],
        isFetch: true
    }
}
  componentDidMount() {
    http
      .post('', { query: GET_BOOKS})
      .then(result => {
        this.setState({
          bookList: result.data.data.books,
          isFetch: false
        })
      });
  }

  displayBooks(){
    let {bookList, isFetch} = this.state;
    if(isFetch){
        return( <div>Loading books...</div> );
    } else {
        return bookList.map(book => {
            return(
                <li key={ book.id }>{ book.name } </li>
            );
        })
    }
}
    render(){
        return(
            <div>
                <ul id="book-list">
                { this.displayBooks() }
                </ul>
            </div>
        );
    }
}

export default BookList;