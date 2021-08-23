import { useState } from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Beer } from '../types/beers';
import SearchPage from './Search';
import DetailsPage from './Details';

const App = () => {
    const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);

    return (
        <>
            <Navbar className="custom-nav-bar" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#" onClick={() => { setSelectedBeer(null) }}>
                        Beer Finder
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {
                !!selectedBeer &&
                <DetailsPage beer={selectedBeer} />
            }

            {
                !selectedBeer &&
                <SearchPage onBeerSelect={(beer: Beer) => setSelectedBeer(beer)} />
            }
        </>
    );
}

export default App;
