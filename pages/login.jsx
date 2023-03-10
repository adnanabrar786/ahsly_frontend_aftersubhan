import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../app/features/loginSlice";
import { fetchWishlist } from "../app/features/wishlistSlice";
import { fetchCartItems } from "../app/features/cartSlice";

import Tracking from "../components/Tracking";

import login from "../styles/Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const loginClickHandler = (e) => {
    e.preventDefault();

    const userObj = { email, password };

    axios
      .post(`${process.env.NEXT_PUBLIC_baseURL}/users/login`, userObj,
        { withCredentials: true }
      ).then(({ data }) => {
        if (data.success) {
          dispatch(setLogin(data.authData));
          dispatch(fetchWishlist(data.authData.user_id));
          dispatch(fetchCartItems(data.authData.user_id));
          router.push("/");
        } else {
          toast.error(data.message);
        }
      }).catch(err => console.log("err: ", err));
  };

  return (
    <div className={login.login_wrapper}>
      <div className={login.login_form_wrapper}>
        <div className={login.heading_para}>
          <h2>Account Login</h2>
        </div>
        <div className={login.login_signup}>
          <div className={login.login_track}>
            <div className={login.login_form}>
              <p>Returning Customer</p>
              <p>
                If you are a registered user, please enter your email and
                password.
              </p>
              <p>Required*</p>
              <div className={login.email + " " + login.input_wrapper}>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={login.password + " " + login.input_wrapper}>
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={login.button}>
                <button onClick={loginClickHandler}>login</button>
              </div>
              <div className={login.forgot}>
                <div className={login.forgot_password}>
                  <p>Forgot Password</p>
                </div>
                <div className={login.rememberme + " " + login.chex}>
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                  // onChange={loginChangeHandler}
                  // checked={loginData.remember}
                  />
                  <label htmlFor="offers">Remember me</label>
                </div>
              </div>
            </div>
            <Tracking />

            {/* <div className={login.tracking_wrapper}>
              <div className={login.tracking_form}>
                <div className={login.or}>
                  <h4>or</h4>
                </div>
                <div className={login.check_order}>
                  <h4>Check Order</h4>
                  <div className={login.radio}>
                    <input type="radio" name="store" id="store" value="store" />
                    <label htmlFor="store">In-Store</label>
                    <input
                      type="radio"
                      name="store"
                      id="online"
                      value="online"
                    />
                    <label htmlFor="online">Online</label>
                  </div>
                </div>
                <p>
                  See your order even if you are not a registered user. Enter
                  the order number and the billing address ZIP code.
                </p>
                <p className={login.req}>Required Information*</p>
                <div className={login.inputs_wrapper}>
                  <div className={login.order_num + " " + login.inputs}>
                    <label htmlFor="order_num.">Order Number*</label>
                    <input
                      type="phone"
                      id="order_num"
                      name="orderNumber"
                      placeholder="Order Number"
                    />
                  </div>
                  <div className={login.order_email + " " + login.inputs}>
                    <label htmlFor="order_email.">Order Email*</label>
                    <input
                      type="email"
                      id="order_email"
                      name="orderEmail"
                      placeholder="Order Email"
                    />
                  </div>
                  <div className={login.zip + " " + login.inputs}>
                    <label htmlFor="zip">Billing Zip Code*</label>
                    <input
                      type="number"
                      id="zip"
                      name="zip"
                      placeholder="Order Zip Code"
                    />
                  </div>
                  <button>Check Status</button>
                </div>
              </div>
            </div> */}
          </div>
          <div className={login.signup}>
            <p>New Customers</p>
            <p>
              Create an Ashley online account today! You will be able to
              access express checkout, create and save shopping lists, view
              order history and much more...
            </p>
            <div className={login.button}>
              <Link href="/signup">
                <a>
                  <button>create account now</button>
                </a>
              </Link>
            </div>
            <p>Benefits of Creating an Account</p>
            <h5>News and exclusive offers!</h5>
            <p>
              Sign up to receive email updates on special promotions, new
              product announcements, gift ideas and more.
            </p>
            <h5>Order History</h5>
            <p>
              Receive important information about your order. You can even track
              it up to the minute it arrives.
            </p>
            <h5>Faster Checkout</h5>
            <p>
              Save your billing and shipping information to make it easier to
              buy your favorite gear.
            </p>
            <p className={login.readmore}>(read more about security)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
