import React, { Component } from "react";
import appContext from "../../context/app";
import "./modeBtn.css";
class ModeBtn extends Component {
  static contextType = appContext;
  render() {
    const { mode, changeMode } = this.context;
    return (
      <div
        className={`change-mode-btn-${mode} change-btn`}
        onClick={changeMode}
      >
        <div className="center">
          <span className="material-symbols-rounded">{`${mode}_mode`}</span>
        </div>
      </div>
    );
  }

}

export default ModeBtn;
