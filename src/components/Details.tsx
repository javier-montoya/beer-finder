import { Image, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Beer, Measurement } from '../types/beers';
import '../styles/details.scss';

export interface DetailProps {
  beer: Beer
}

const Details = (props: DetailProps) => {
  const { beer } = props;

  const instanceOfMeasurement = (object: any): object is Measurement => {
    if (typeof object === 'object' && object !== null) {
      return 'value' in object && 'unit' in object;
    }
    return false;
  }

  const generateInfoWidgets = () => {
    let infoWidgts: JSX.Element[] = [];

    Object.entries(beer).forEach(([key, value], index) => {
      const parsedKey = key
        .replace(/_/g, ' ')
        .replace(/(?: |\b)(\w)/g, (key) => key.toUpperCase());

      let badgeContents = '';

      if (typeof value === 'number') {
        badgeContents = `${parsedKey}: ${value}`;
      } else if (instanceOfMeasurement(value)) {
        badgeContents = `${parsedKey}: ${value.value} ${value.unit}`;
      }

      if (badgeContents) {
        infoWidgts.push(
          <Badge className="detail-badge" key={`badge-detail-${index}`} bg="secondary" >
            {badgeContents}
          </Badge>
        )
      }
    });

    return infoWidgts;
  }

  return (
    <Container>

      <Row className="justify-content-md-center">
        <Col md="3">
          <Card>
            <Card.Body>
              <div className="d-flex flex-column align-items-center text-center">
                <Image src={beer.image_url} alt="Beer" height="150" />
                <div className="mt-3">
                  <h4>{beer.name}</h4>
                  <p className="mb-1">{beer.tagline}</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div className="badges-container">
            {generateInfoWidgets()}
          </div>
        </Col>

        <Col md="6">
          <Card className="detail-card">
            <Card.Body>
              <p className="text-muted font-size-sm">{beer.description}</p>
            </Card.Body>
          </Card>

          <Card className="detail-card">
            <Card.Body className="text-small">
              <h5 className="bottom-margin">Ingredients </h5>

              <span> Malt</span>
              <ul>
                {
                  beer.ingredients.malt.map((malt, index) =>
                    <li key={"malt-" + index}>{`${malt.name}, ${malt.amount.value} ${malt.amount.unit}`}</li>)
                }
              </ul>

              <span> Hops</span>
              <ul>
                {
                  beer.ingredients.hops.map((hop, index) =>
                    <li key={"hop-" + index}>{`${hop.name}, ${hop.amount.value} ${hop.amount.unit} - ${hop.add}`}</li>)
                }
              </ul>

              <span> Yeast</span>
              <ul>
                <li>{beer.ingredients.yeast}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="9">
          <Card className="detail-card">
            <Card.Body>
              <h5 className="bottom-margin">Method </h5>

              <p className="bottom-margin">
                {`Ferment at ${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}`}
              </p>

              <span> Temperature Instructions</span>
              <ul>
                {
                  beer.method.mash_temp.map((mashTemp, index) => {
                    return (
                      <li key={"mash-temp-" + index}>{`Boil for ${mashTemp.duration} minutes at ${mashTemp.temp.value} ${mashTemp.temp.unit}`}</li>
                    )
                  })
                }
              </ul>

              <span>{beer.method.twist}</span>

            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>

  );
}

export default Details;
