import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = ({showOffCanvas}) => {

  return (
    <Container className="text-center my-5 pt-5">
      <Helmet>
        <title>Welcome to Asim Space. Enjoy Free bingo</title>
      </Helmet>
      <Row>
        <Col sm="12" md="6">
          <Card className="border-0">
            <CardBody>
              <Card.Text>
                <div class="jumbotron jumbotron-fluid">
                  <h1 class="display-3 mb-4">Do you know?</h1>
                  <p class="lead">Bingo originated in Italy and is descended from Lo Giuoco del Lotto d'Italia,
                    the Italian national lottery, which has been played since 1530.</p>
                  <Link className="btn btn-primary btn-lg rounded-0 my-5" to="/play-bingo">Let's Play Bingo!</Link>
                </div>     
              </Card.Text>
            </CardBody>
          </Card>       
        </Col>

        <Col sm="12" md="6">
          <Card className="border-0">
            <CardBody>
              <Card.Text>
                <div class="jumbotron jumbotron-fluid">
                  <img src="./bingo-bg.png" alt="Bingo" className="img-fluid mx-auto w-50 d-block" />
                  <span onClick={showOffCanvas} className="btn btn-success btn-lg rounded-0 my-5" style={{cursor: 'pointer'}}> How to Play?</span>
                </div>     
              </Card.Text>
            </CardBody>
          </Card>
        </Col>  
      </Row>
    </Container>
  );
};

export default Home;