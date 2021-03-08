import React from "react";
import PropTypes from "prop-types";
import Button from "../PrimaryButton/Button";

const theme = {
  default: "#40c4ff",
  hover: "#00b0ff",
  disabled: "#40c4ff"
};

const PrimaryButton = ({
    onClick,
    fullWidth,
    disabled = true,
    children,
    ...props
  }) => {
    return (
      <Button {...{ fullWidth, theme, disabled, onClick, ...props }}>
        {children}
      </Button>
    );
  };
  export default PrimaryButton;
  
  PrimaryButton.propTypes = {
    /** Whatever components will be rendered inside the button  */
    children: PropTypes.any,
  
    /** Whether or not the button should take up all of the alloted space */
    fullWidth: PropTypes.bool,
  
    /** Whether or not the button is disabled */
    disabled: PropTypes.bool,
  
    /** Method that is called when button is clicked*/
    onClick: PropTypes.func.isRequired
  };
  