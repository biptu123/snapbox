import React, { useCallback, useEffect, useState } from "react";
import homeFaqImg from "../../assets/images/home-faq.png";
import Hero from "./Hero";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import AboutSnapbox from "./AboutSnapbox";
import { useInView } from "react-intersection-observer";
import Features from "./Features";
import Experience from "./Experience";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Function to start the animation
  const startAnimation = useCallback(() => {
    const animationDuration = 2000; // Duration in milliseconds
    const animationSteps = 100; // Number of steps
    const stepSize = Math.ceil(value / animationSteps);
    let currentStep = 0;

    const interval = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = prevCount + stepSize;
        if (nextCount >= value) {
          clearInterval(interval);
          return value;
        }
        return nextCount;
      });
      currentStep++;
      if (currentStep >= animationSteps) {
        clearInterval(interval);
        setCount(value);
      }
    }, animationDuration / animationSteps);

    return () => clearInterval(interval);
  }, [value]);

  useEffect(() => {
    if (inView) {
      // Reset count before starting animation
      setCount(0);
      // Start the animation when in view
      startAnimation();
    }
  }, [inView, startAnimation]);

  return <span ref={ref}>{count}</span>;
};
const Home = () => {
  return (
    <Layout>
      <div>
        <div id="arrow">
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </div>
        <Hero />
        <section id="feature-sec" className="">
          <div className="text-center">
            <h5 className="common-h5">CARE FEATURES</h5>
            <h2 className="common-h2">
              Provide Awesome Service With Our Tools
            </h2>
          </div>
          {/*text-center*/}

          <Features />
          {/* <AboutSnapbox /> */}

          <section id="why-choose-us">
            <div className="container">
              <div className="why-choose-col">
                <h5 className="common-h5">WHY CHOOSE US</h5>
                <h2 className="common-h2">Boosts Your Website Traffic!</h2>
                <p>
                  We are passionate about our work. Our designers stay ahead of
                  the curve to provide engaging and user-friendly website
                  designs to make your business stand out. Our developers are
                  committed to maintaining the highest web standards so that
                  your site will withstand the test of time. We care about your
                  business, which is why we work with you.
                </p>
                <button className="common-btn" type="button">
                  DISCOVER MORE
                </button>
              </div>
              <div className="count-col">
                <div className="stat">
                  <div className="count-sub-col">
                    <div className="milestone-counter">
                      <span className="stat-count highlight">
                        <AnimatedNumber value={2000} />
                      </span>
                      <div className="milestone-details">Happy Customers</div>
                    </div>
                    {/*milestone-counter*/}
                  </div>
                  {/*count-sub-col*/}
                  <div className="count-sub-col">
                    <div className="milestone-counter">
                      <span className="stat-count highlight ">
                        {" "}
                        <AnimatedNumber value={100} />%
                      </span>
                      <div className="milestone-details">Orders Completed</div>
                    </div>
                    {/*milestone-counter*/}
                  </div>
                  {/*count-sub-col*/}
                  <div className="count-sub-col">
                    <div className="milestone-counter">
                      <span className="stat-count highlight">
                        {" "}
                        <AnimatedNumber value={90} />
                      </span>
                      <div className="milestone-details">Awards Win</div>
                    </div>
                    {/*milestone-counter*/}
                  </div>
                  {/*count-sub-col*/}
                </div>
                {/*stat*/}
                <div className="stat-info-par">
                  <div className="stat-info-sub-par">
                    <div className="stat-info-div">
                      <p>
                        Unlock business growth with Unique Snapbox's tailored
                        Marketing and Sales Strategy. Drive engagement,
                        conversions, and revenue through our expertise
                      </p>
                    </div>
                    {/*stat-info-div*/}
                  </div>
                  {/*stat-info-sub-par*/}
                  <div className="stat-info-sub-par">
                    <div className="stat-info-div">
                      <p>
                        Strategize for success with Unique Snapbox. Our expert
                        guidance helps shape your business strategy for growth,
                        innovation, and lasting impact.
                      </p>
                    </div>
                    {/*stat-info-div*/}
                  </div>
                  {/*stat-info-sub-par*/}
                  <div className="stat-info-sub-par">
                    <div className="stat-info-div">
                      <p>
                        Unique Snapbox: Crafting Digital Success. Websites, SEO,
                        Ads - Your Growth Partners
                      </p>
                    </div>
                    {/*stat-info-div*/}
                  </div>
                  {/*stat-info-sub-par*/}
                </div>
                {/*stat-info-par*/}
              </div>
              {/*count-col*/}
              <div className="clear" />
            </div>
            {/*container*/}
          </section>

          <Experience />

          <section id="faq-par">
            <div className="container">
              <div className="faq-que-col">
                <h5 className="common-h5">EXPERINCE</h5>
                <h2 className="common-h2">Pay for Qualified Services</h2>
                <div id="faq-accordion">
                  <h3>Why do we use it ?</h3>
                  <p>
                    apture attention and convey your message with our creative
                    poster design services. Make your brand stand out visually.
                  </p>
                  <h3>Who we use it ?</h3>
                  <p>
                    Unlock growth and innovation as we navigate change together,
                    shaping a brighter future for your endeavors.
                  </p>
                  <h3>can we use it ?</h3>
                  <p>
                    {" "}
                    Facilitate the learning of new systems, tools, and processes
                    · Improve employee performance
                  </p>
                  <h3>What Three Solutions are ?</h3>
                  <p>
                    Consulting. The word conjures images of business suits,
                    boardrooms and hefty reports. It’s notorious for being one
                    of those jobs your friends don’t understand. However, it’s a
                    lucrative and dynamic field well worth investigating. If
                    you’ve ever been interested in consulting but too afraid to
                    ask what it entails, we’ve got you. This guide will
                    demystify the industry and give you the essential knowledge
                    to embark on this promising career path or hire a business
                    consultant.
                  </p>
                  <h3>Do or Not ?</h3>
                  <p>
                    {" "}
                    Keep your friends close and your enemies closer! Provide a
                    consistent and great service, Adopt a never say die
                    attitude, Be prepared to sacrifice – your life is now your
                    work, When you start making big bucks – invest it in your
                    business, not a new car, lastly Read the book The E Myth
                    Revisited
                  </p>
                </div>
              </div>
              {/*faq-que-col*/}
              <div className="faq-bg-col">
                <div className="faq-img-par">
                  <img src={homeFaqImg} alt="faq" className="img-responsive" />
                  <div className="faq-img-info">
                    <i className="fa fa-lightbulb-o" />
                    <h2>
                      Have a project in mind? <br />
                      Let’s get to work.
                    </h2>
                    <p>
                      Find out how it works and ask any <br /> questions you may
                      have.
                    </p>
                    <a href="#">
                      Get In Touch <i className="fa fa-long-arrow-right" />
                    </a>
                  </div>
                  {/*faq-img-info*/}
                </div>
                {/*faq-img-par*/}
              </div>
              {/*faq-bg-col*/}
              <div className="clear" />
            </div>
            {/*container*/}
          </section>
          <section id="price-table">
            <div className="text-center">
              <h5 className="common-h5">PRICING PLAN</h5>
              <h2 className="common-h2">Services for Our Clients</h2>
            </div>
            <div className="basic-price-col">
              <div className="basic-price-info">
                <h4>Free Plan</h4>
                <div className="price">
                  <p>₹0</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>Free registration</li>
                    <li>
                      <strike>USB card</strike>
                    </li>
                    <li>Free user pannel</li>
                    <li>
                      <strike>Customer service</strike>
                    </li>
                    <li>
                      <strike>Referral bonus</strike> (Suitable price)
                    </li>
                    <li>Validity upto 15 days</li>
                  </ul>
                </div>
                {/*price-list*/}
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="basic-price-col rec-price">
              <div className="basic-price-info">
                <h4>Standard Plan</h4>
                <div className="price">
                  <p>899</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>Professional business dashboard</li>
                    <li>One year free online portal</li>
                    <li>Smart USB card</li>
                    <li>One year warrenty</li>
                    <li>Free One year business consulting service (6 calls)</li>
                    <li>Upto INR 100 referal bonus</li>
                    <li>12 months validity</li>
                  </ul>
                </div>
                {/*price-list*/}
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="basic-price-col">
              <div className="basic-price-info">
                <h4>Premium Plan</h4>
                <div className="price">
                  <p>₹1199</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>Professional business dashboard</li>
                    <li>Upto INR 200 referal bonus</li>
                    <li>Free user panel</li>
                    <li>Mat - finish card with 18 months of validity</li>
                    <li>Premium customer service support</li>
                    <li>
                      Free one year business consulting service (10 calls)
                    </li>
                  </ul>
                </div>
                {/*price-list*/}
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="clear" />
          </section>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
