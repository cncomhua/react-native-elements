import React from 'react';
import Link from '@docusaurus/Link';

const OpenCollective: React.FC<{}> = () => (
  <div className="container">
    <div className="text--center">
      <h1 className="hero__title gradient clip-text ">Our Sponsors</h1>
      <h4 className="subtitle ">Built with passion, backed by the community</h4>
    </div>

    <div className="row" id="sponsor">
      <div className="col col--6">
        <div className="backers-section text--center">
          <h3>Backers</h3>
          <p className="p--desc">
            Support us with a monthly donation and help us continue our
            activities.
          </p>

          <a
            href="https://opencollective.com/react-native-elements#backers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://opencollective.com/react-native-elements/backers.svg?width=695" />
          </a>
        </div>
      </div>

      <div className="col col--6">
        <div className="backers-section text--center">
          <h3>Sponsors</h3>
          <p className="p--desc ">
            Become a sponsor and get your logo on our README on GitHub with a
            link to your site.
            <a href="https://opencollective.com/react-native-elements#sponsor">
              Become a sponsor
            </a>
          </p>

          <a
            href="https://opencollective.com/react-native-elements#sponsors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://opencollective.com/react-native-elements/sponsors.svg" />
          </a>
        </div>
      </div>
    </div>

    <div className="text--center margin-vert--lg">
      <h1 className="hero__title gradient clip-text ">Be a sponsor Now</h1>
      <div className="text--center">
        <Link
          to="https://opencollective.com/react-native-elements"
          className="button button--secondary button--outline button--lg  margin-horiz--md margin-vert--sm "
        >
          Open Collective
          <svg
            style={{ margin: '0 5px -3px 8px ' }}
            width={20}
            fill="#7FADF2"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Open Collective</title>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.54 0 4.894-.79 6.834-2.135l-3.107-3.109a7.715 7.715 0 1 1 0-13.512l3.107-3.109A11.943 11.943 0 0 0 12 0zm9.865 5.166l-3.109 3.107A7.67 7.67 0 0 1 19.715 12a7.682 7.682 0 0 1-.959 3.727l3.109 3.107A11.943 11.943 0 0 0 24 12c0-2.54-.79-4.894-2.135-6.834z" />
          </svg>
        </Link>
        <Link
          to="https://github.com/sponsors/react-native-elements"
          className="button button--secondary button--outline button--lg margin-horiz--md margin-vert--sm "
        >
          GitHub Sponsor
          <svg
            style={{ margin: '0 5px -3px 8px ' }}
            width={20}
            fill="#EA4AAA"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub Sponsors</title>
            <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75zm-.919 15.275a30.766 30.766 0 0 1-4.703 3.316l-.004-.002-.004.002a30.955 30.955 0 0 1-4.703-3.316c-2.677-2.307-5.047-5.298-5.047-8.523 0-2.754 2.121-4.5 4.125-4.5 2.06 0 3.914 1.479 4.544 3.684.143.495.596.797 1.086.796.49.001.943-.302 1.085-.796.63-2.205 2.484-3.684 4.544-3.684 2.004 0 4.125 1.746 4.125 4.5 0 3.225-2.37 6.216-5.048 8.523z" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default OpenCollective;
