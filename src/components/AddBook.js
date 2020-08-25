import React, { Component } from 'react';
import {http} from '../interceptor';


const GET_AUTHORS = `
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            isFetch: true
        }
    }

    componentDidMount() {
        http
          .post('', { query: GET_AUTHORS})
          .then(result => {
            this.setState({
                authorList: result.data.data.authors,
              isFetch: false
            })
          });
      }

    displayAuthors(){
        let {authorList, isFetch} = this.state;
        if(isFetch){
            return( <option disabled>Loading authors</option> );
        } else {
            return authorList.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }

    render(){
        return(
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default AddBook;