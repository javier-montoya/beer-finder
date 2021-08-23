import React, { useState } from 'react';
import { Form, Button, Card, Table, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from 'axios';
import { baseUrl } from '../constants';
import { Beer } from '../types/beers';
import '../styles/search.scss';

interface SearchProps {
  onBeerSelect: (beer: Beer) => void;
}

const Search = (props: SearchProps) => {
  const { onBeerSelect } = props;

  const [hasSearched, setHasSearched] = useState(false);
  const [beers, setBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchBeers = async (name: string) => {
    setLoading(true);

    if (!hasSearched)
      setHasSearched(true);

    if (name === '') {
      setBeers([]);
    } else {
      try {
        const searchResult = await axios.get(`${baseUrl}beers`, { params: { beer_name: name } });
        setBeers(searchResult.data);
      } catch (e) {
        setErrorMessage(e.Message);
      }
      setLoading(false);
    }
  }

  const generateTableBody = () => {
    if (!beers?.length) {
      return null;
    }

    return beers.map((beer, idx) => {
      return (
        <tr className="result-row" key={"beer-" + idx} onClick={() => onBeerSelect(beer)}>
          <td>{beer.id}</td>
          <td>{beer.name}</td>
          <td>{beer.tagline}</td>
        </tr>
      )
    })
  }

  return (
    <Container>
      <Row className="justify-content-md-center search-margin">
        <Col xs lg="6">
          <Card className="full-width">
            <Card.Body>
              <Form.Label>Beer Name</Form.Label>
              <div className="fill-width flex-space-between">
                <input className="search-input-width" type="text" placeholder="Punk IPA" onChange={(e) => setSearchTerm(e.target.value)} />
                <Button variant="dark" type="button" onClick={() => searchBeers(searchTerm)}>
                  Search
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {
        loading &&
        <Row className="justify-content-md-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      }

      {
        !loading &&
        <Row className="justify-content-md-center">
          {
            !!errorMessage &&
            <div className="center">
              <span>{errorMessage}</span>
            </div>
          }
          {
            !hasSearched && !beers?.length &&
            <div className="center">
              <span>Search for any beer you'd like!</span>
            </div>
          }
          {
            hasSearched && !beers?.length &&
            <div className="center">
              <span>No beers found with that name, please try a different one.</span>
            </div>
          }

          {
            !!beers?.length &&
            <Col xs lg="10">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Tagline</th>
                  </tr>
                </thead>
                <tbody>
                  {generateTableBody()}
                </tbody>
              </Table>
            </Col>
          }
        </Row>
      }


    </Container>
  );
}

export default Search;
