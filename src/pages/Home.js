import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="container text-center my-5 pt-5">
      <Helmet>
        <title>Welcome to Asim Space. Enjoy Free bingo</title>
      </Helmet>
      <div className="row">
          <div className="col">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-3 mb-4">Do you know?</h1>
              <p class="lead text-muted">Bingo originated in Italy and is descended from Lo Giuoco del Lotto d'Italia, the Italian national lottery, which has been played since 1530.</p>
            </div>
          </div>
            <Link className="btn btn-primary btn-lg rounded-0" to="/play-bingo">Let's Play Bingo!</Link>
          </div>
      </div>
    </div>
  );
};

export default Home;