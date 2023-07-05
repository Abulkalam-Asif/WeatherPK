import React from 'react'
import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faLinkedin, faReact, faStackOverflow, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = (props) => {
  return (
    <>
      <div className={`footer ${props.page}_footer`} style={{ marginTop: props.margin_top }}>
        <div className="footer_text clr_p_low">
          <p>Copyright&copy; All rights reserved</p>
          <p>Created with&nbsp;
            <FontAwesomeIcon className="footer_icon" icon={faHeart} color="#FF0000" /> and&nbsp;
            <a href="https://react.dev/" target="_blank" rel="noreferrer" title="React"><FontAwesomeIcon className="footer_icon" color="#2babcf" icon={faReact} /></a> by&nbsp;
            <span className="clr_p_high footer_my_name">Abul Kalam</span>
          </p>
        </div>

        <div className="footer-separator"></div>

        <div className="footer_api_attribute">
          <span className="clr_p_low">Powered by</span><a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer" title="Free Weather API">
            <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="WeatherAPI.com" />
          </a>
        </div>

        <div className="footer-separator"></div>

        <div className="footer_links_source_code">
          <div>
            <p className="clr_p_low">Source code&nbsp;&nbsp;
              <a href="https://github.com/Abulkalam-Asif/WeatherPK" target="_blank" rel="noreferrer" title="Source Code"><FontAwesomeIcon className="footer_icon" icon={faFileCode} color="#fff" /></a>
            </p>
          </div>

          <div className="footer_links">
            <a href="https://github.com/Abulkalam-Asif/" target="_blank" rel="noreferrer" title="GitHub"><FontAwesomeIcon className="footer_icon" icon={faGithub} color="#211F1F" /></a>
            <a href="https://stackoverflow.com/users/13206887/abulkalam-asif" target="_blank" rel="noreferrer" title="Stack Overflow"><FontAwesomeIcon className="footer_icon" icon={faStackOverflow} color="#F47F24" /></a>
            <a href="https://www.linkedin.com/in/muhammad-abul-kalam-asif-b86552177/" target="_blank" rel="noreferrer" title="LinkedIn"><FontAwesomeIcon className="footer_icon" icon={faLinkedin} color="#0A66C2" /></a>
            <a href="https://www.facebook.com/muhammadabulkalam.asif.98" target="_blank" rel="noreferrer" title="Facebook"><FontAwesomeIcon className="footer_icon" icon={faFacebook} color="#0165E1" /></a>
            <a href="https://twitter.com/abulkalam_asif" target="_blank" rel="noreferrer" title="Twitter"><FontAwesomeIcon className="footer_icon" icon={faTwitterSquare} color="#1D9BF0" /></a>
          </div>
        </div>

      </div >
    </>
  )
}

export default Footer