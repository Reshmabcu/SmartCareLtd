import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';

class SubscriptionForm extends React.Component {
  render() {
    return (
      <div id="mc_embed_signup">
        {/* <form > */}
          <div id="mc_embed_signup_scroll">
            <h2>Place your personal details here</h2>
            <div className="mc-field-group">
              <label >Name    :
                <input type="text" name="NAME" className="required" id="mce-NAME"/>
              </label>
            </div><br />
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email   :
                <input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
              </label>
            </div><br />
            <div className="mc-field-group">
              <label >DOB     :
                <input type="text" name="NAME" className="required" id="mce-NAME"/>
              </label>
            </div><br />
            <div className="mc-field-group">
              <label >Name    :
                <input type="text" name="NAME" className="required" id="mce-NAME"/>
              </label>
            </div><br />
            {/* <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
              <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
            </div> */}
            
            <div ><button class="s1" > submit</button></div>
          </div>
        {/* </form> */}
      </div>
    );
  }
}

export default SubscriptionForm;