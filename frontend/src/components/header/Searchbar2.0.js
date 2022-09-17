import React, {Component, useEffect, useState} from "react";
import "./searchbar.css"
import styled from "styled-components";
import {TextInput} from "@mantine/core";
import {Link, useLocation} from "react-router-dom";

class Searchbar2 extends Component{
    constructor(props){
        super(props);
        this.state={
            error: null,
            results: [],
            query: ''
        }
        this.updateQuery = this.updateQuery.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }
componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevState.query !== this.state.query){
            fetch("https://backend-velasiraptor-gvom4czscq-oa.a.run.app/search", {
                method: 'POST',
                headers: {"Content-Type": "text/plain"},
                body: this.state.query
            }).then((res) => res.json())
                .then((result) => {
                    if (result.err !== undefined){
                        this.setState({error: result});
                    }else {
                        this.setState({results: result});
                        this.props.setResult(result);
                    }});

        }
        if (prevState !== this.state.results){
            this.updateResults()
        }
}
updateResults(){
        this.props.setResult(this.state.results);
        //navigateTo Results
}
updateQuery(queryInfo){
        this.setState({query: queryInfo})
}

render() {
    return (
            <div>
                <label htmlFor={'search-form'}>
                    <input
                        inputMode={"text"}
                        name={"search-form"}
                        id={"search-form"}
                        className={"searchbar"}
                        placeholder={`Search for NFT...`}
                    onChange={e => this.updateQuery(e.target.value.toString())}
                    />
                </label>
            </div>
        );
    }
};
const SearchIcon = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #7f77e0;
  border-radius: 50px;
  padding: 9px;
`;
export default Searchbar2;