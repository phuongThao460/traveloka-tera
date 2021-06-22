/* eslint-disable react/no-direct-mutation-state */
import { Component, createRef } from "react";
import "../../style/pages/LoginForm.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTk: 0,
      errorName: "",
    };
    this.loginNameRef = createRef();
    this.loginPWRef = createRef();
  }
  confirmLogin = () => {
    axios
      .post("https://gift-api-v1.herokuapp.com/partner/login", {
        username: this.loginNameRef.current.value,
        password: this.loginPWRef.current.value,
      })
      .then((result) => {
        this.state.idTk = result.data;
        if (result.data === "Username or Password not correct") {
          alert(result.data);
        } else {
          window.localStorage.setItem("idTk", result.data);
          window.localStorage.setItem(
            "username",
            this.loginNameRef.current.value
          );
          this.setState(this);
          if (this.state.id !== "0") {
            this.props.history.push("/AddHomeBlock/" + this.state.idTk);
          }
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  confirmLogin2 = () => {
    if (
      this.loginNameRef.current.value === "" ||
      this.loginPWRef.current.value === ""
    ) {
      this.state.errorName = "Phải nhập tên đăng nhập và mật khẩu!";
      this.setState(this);
    } else {
      axios.post("https://oka1kh.azurewebsites.net/api/partner/login", {
        partnerUsername: this.loginNameRef.current.value,
        partnerPass: this.loginPWRef.current.value,
      }).then((response) => {
        var username = response.data.data.partnerUsername;
        axios.get("https://oka1kh.azurewebsites.net/api/partners").then(
          (response2) => {
            var lsPartner = response2.data.Partner;
            lsPartner.forEach((item) => {
              if (item.partnerUsername === username) {
                alert("ID partner: " + item.partnerId);
                window.localStorage.setItem("idTk", item.partnerId);
                window.localStorage.setItem("username",this.loginNameRef.current.value);
                this.props.history.push("/AddHomeBlock/" + item.partnerId);
              }
            });
          }
        );
      });
    }
  };
  render() {
    return (
      <div className="flexbox">
        <div className="container">
          <div className="card">
            <h3>Traveloka Tera</h3>
            <div className="card-body">
              <h4 className="card-title">Welcome back!</h4>

              <p className="card-text">
                Log in to manage your accommodation from checking reservations
                to managing room availability!
              </p>
              <div className="login-form">
                <span className="form-label">Your email address</span>
                <i className="fa fa-envelope icon"></i>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter your email address here"
                  ref={this.loginNameRef}
                ></input>

                <span className="form-label">Your password</span>
                <i className="fa fa-lock fa-lg position-absolute icon"></i>
                <input
                  type="password"
                  placeholder="Enter your password here"
                  ref={this.loginPWRef}
                ></input>
                <a className="login-form-forgot" href="/#">
                  Forgot your password
                </a>

                <button onClick={() => this.confirmLogin()} id="btn-login">
                  Log in
                </button>
              </div>
              <div className="line-spacing"></div>

              <p>
                Not yet a partner?{" "}
                <Link
                  to="/home"
                  style={{ color: "#5899d6", fontWeight: "600" }}
                >
                  Register here
                </Link>
              </p>

              <div className="line-spacing"></div>

              <div className="icon">
                <a href="/#">
                  <img src="../../images/ggplay.png" alt="logostore" />
                </a>
                <a href="/#">
                  <img src="../../images/appstore.png" alt="logostore" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginForm;
