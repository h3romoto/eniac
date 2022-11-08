import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { Logo } from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h3>
            ENIAC, Your <span>First</span> PaaS
          </h3>
          <p>
            I'm baby williamsburg pinterest cardigan neutra gastropub. VHS fit
            cred, umami subway tile blue bottle succulents kickstarter bespoke.
            Master cleanse glossier taxidermy, cardigan heirloom letterpress
            paleo hoodie cronut authentic bruh craft beer. Stumptown roof party
            gastropub fashion axe cred, banjo everyday carry. Vegan celiac
            thundercats, schlitz 90's poutine hot chicken keytar. Blue bottle
            tumblr neutra shaman, next level ascot cronut celiac fixie bicycle
            rights. Quinoa fit tattooed, small batch synth slow-carb unicorn.
            Glossier roof party keytar gochujang hexagon. Pabst thundercats
            activated charcoal taiyaki jean shorts fanny pack af, umami
            messenger bag plaid gentrify stumptown hashtag cred. Wolf pug before
            they sold out coloring book intelligentsia photo booth bespoke
            pickled mumblecore lyft. Austin bitters paleo vice, lomo
            letterpress tousled hell of drinking vinegar man bun twee pour-over
            coloring book live-edge. Tattooed fixie blue bottle bruh sus.
            Dreamcatcher distillery williamsburg la croix kombucha same ugh
            taiyaki live-edge portland snackwave. Wolf VHS you probably haven't
            heard of them, pour-over cliche edison bulb biodiesel tousled
            bespoke kogi narwhal literally. Schlitz slow-carb snackwave
            actually. Aesthetic tonx crucifix pickled marfa vexillologist
            letterpress four loko plaid raclette selvage. Typewriter everyday
            carry knausgaard, biodiesel next level jean shorts hell of sriracha.
    
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="eniac paas" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

// styled component
const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`
