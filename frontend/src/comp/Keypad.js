import React, { Component } from "react";
import Axios from "axios";
import $ from "jquery";
import SuperHero from "./SuperHeroes";

export default class Keypad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: false,
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  callSuperHero = async (number) => {
    const inputArr = number.toString().split("");
    const input = number.substring(2);
    if (inputArr[0] !== "0" && inputArr !== " ") {
      alert("Invalid Number ");
      const telNumber = $("#telNumber");
      $(telNumber).val("");
      return;
    }
    const { data } = await Axios.post(
      `http://localhost:1234/superHero/${input}`
    );
    console.log(data);
    if (data.message === "okay") {
      alert(`The Superman ${data.hero} in On the way to help you`);
      const telNumber = $("#telNumber");
      $(telNumber).val("");
      this.setState({ hero: true });
      this.setState({ name: data.hero.toLowerCase() });
      return;
    }
    const telNumber = $("#telNumber");
    $(telNumber).val("");
    this.setState({ hero: false });
    return alert(
      `Sorry no superhero available for this numbber try diffrent one`
    );
  };
  componentDidMount() {
    const callSuperHero = this.callSuperHero;
    $(document).ready(function () {
      $(".num").click(function () {
        const num = $(this);
        const text = $.trim(
          num.find(".txt").clone().children().remove().end().text()
        );
        const telNumber = $("#telNumber");
        if (text === "#") {
          $(telNumber).val(telNumber.val() + " ");
          return;
        }
        if (text === "*") {
          const value = $(telNumber).val();
          callSuperHero(value);
          return;
        }
        $(telNumber).val(telNumber.val() + text);
      });
    });
  }

  render() {
    return (
      <>
        {this.state.hero === true ? (
          <SuperHero superHero={this.state.name} />
        ) : null}
        <div className="container callingButh">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 phone">
              <div className="row1">
                <div className="col-md-12">
                  <input
                    type="tel"
                    name="name"
                    id="telNumber"
                    className="form-control tel"
                    onChange={this.handleChange}
                  />
                  <div className="num-pad">
                    <div className="span4">
                      <div className="num">
                        <div className="txt">1</div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          2{" "}
                          <span className="small">
                            <p>ABC</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          3
                          <span className="small">
                            <p>DEF</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          4{" "}
                          <span className="small">
                            <p>GHI</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          5{" "}
                          <span className="small">
                            <p>JKL</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          6{" "}
                          <span className="small">
                            <p>MNO</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          7{" "}
                          <span className="small">
                            <p>PQRS</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          8{" "}
                          <span className="small">
                            <p>TUV</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          9{" "}
                          <span className="small">
                            <p>WXYZ</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          *
                          <span className="small">
                            <p>SEND</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          0{" "}
                          <span className="small">
                            <p>ZERO</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="span4">
                      <div className="num">
                        <div className="txt">
                          #
                          <span className="small">
                            <p>SPACE</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
