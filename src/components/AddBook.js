import React, { Component } from 'react';
import {http} from '../interceptor';
import {GET_AUTHORS, ADD_BOOK} from '../queries/queries';



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            isFetch: true,
            name: '',
            genre: '',
            authorId: ''
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

    submitForm(e){
        e.preventDefault()
        console.log(this.state);
        http.post('', {
            query: ADD_BOOK
            .replace('$name', `"${this.state.name}"`)
            .replace('$genre', `"${this.state.genre}"`)
            .replace('$authorId', `"${this.state.authorId}"`),
        }).then(result => {
            console.log('res---', result)
    }).catch(err => {
        console.log('err', err)
    })
}

    render(){
        return(
            <form id="add-book">
                 <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button onClick= {(e) => this.submitForm(e)}>+</button>
            </form>
        );
    }
}

export default AddBook;