import React from "react";
import homeImg from "../../assets/images/expand-home-img.png";
import homeFaqImg from "../../assets/images/home-faq.png";
import serviceImg1 from "../../assets/images/home-faeture-img/service_img1.png";
import serviceImg2 from "../../assets/images/home-faeture-img/service_img2.png";
import serviceImg3 from "../../assets/images/home-faeture-img/service_img3.png";
import serviceImg4 from "../../assets/images/home-faeture-img/service_img4.png";
import Hero from "./Hero";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div>
        <div id="arrow">
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </div>
        <Hero />
        <section id="feature-sec">
          <div className="text-center">
            <h5 className="common-h5">CARE FEATURES</h5>
            <h2 className="common-h2">
              Provide Awesome Service With Our Tools
            </h2>
          </div>
          {/*text-center*/}
          <section className="faeture-col-par">
            <div className="container">
              <div className="feature-col">
                <h3>Discover, Digital merketing</h3>
                <img
                  src={serviceImg1}
                  className="img-responsive"
                  alt="service"
                />
                <h4>Discover, Explore &amp; understanding the product</h4>
                {/*                </div>feature-col*/}
              </div>
              {/*feature-col*/}
              <div className="feature-col">
                <h3>Discover, Data Entry Work</h3>
                <img
                  src={serviceImg2}
                  className="img-responsive"
                  alt="service"
                />
                <h4>Discover, Explore &amp; Work with us</h4>
                {/*                </div>feature-col*/}
              </div>
              {/*feature-col*/}
              <div className="feature-col">
                <h3>Discover, Free Consulting Services</h3>
                <img
                  src={serviceImg3}
                  className="img-responsive"
                  alt="service"
                />
                <h4>Discover, Explore &amp; Unlock Growth of your Buisness</h4>
                {/*                </div>feature-col*/}
              </div>
              {/*feature-col*/}
              <div className="feature-col">
                <h3>Discover, SEO</h3>
                <img
                  src={serviceImg4}
                  className="img-responsive"
                  alt="service"
                />
                <h4>Discover, Explore &amp; Boost your Website Ranking</h4>
                {/*                </div>feature-col*/}
              </div>
              {/*feature-col*/}
              <div className="clear" />
            </div>
          </section>
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
                      <span className="stat-count highlight">2000</span>
                      <div className="milestone-details">Happy Customers</div>
                    </div>
                    {/*milestone-counter*/}
                  </div>
                  {/*count-sub-col*/}
                  <div className="count-sub-col">
                    <div className="milestone-counter">
                      <span className="stat-count highlight ">100,</span>
                      <div className="milestone-details">Orders Completed</div>
                    </div>
                    {/*milestone-counter*/}
                  </div>
                  {/*count-sub-col*/}
                  <div className="count-sub-col">
                    <div className="milestone-counter">
                      <span className="stat-count highlight">90</span>
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
          <section id="expand">
            <div className="text-center">
              <h5 className="common-h5">EXPERINCE</h5>
              <h2 className="common-h2">Pay for Best Services</h2>
            </div>
            {/*text-center*/}
            <div className="expand-img-col">
              <div className="expand-img">
                <img src={homeImg} alt="expand" className="img-responsive" />
                <div className="expand-img-info">
                  <i className="fa fa-mobile-phone" />
                  <a href="#">
                    Get In Touch <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            {/*expand-img-col*/}
            <div className="expand-img-info-col">
              <div className="progress-bar-col">
                <div className="col-sm-4">
                  <div className="progressbar">
                    <div className="second circle" data-percent={100}>
                      <strong />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="progressbar">
                    <div className="second circle" data-percent={100}>
                      <strong />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="progressbar">
                    <div className="second circle" data-percent={100}>
                      <strong />
                    </div>
                  </div>
                </div>
              </div>
              {/*progress-bar-col*/}
              <div className="progress-info-col">
                <div className="progress-info">
                  <h3>Website development</h3>
                  <p>
                    Create an impactful online presence with our Website
                    Development services.{" "}
                  </p>
                </div>
                {/*progress-info*/}
                <div className="progress-info">
                  <h3>SEO Management</h3>
                  <p>
                    Enhance your online visibility with our SEO Management.{" "}
                  </p>
                </div>
                {/*progress-info*/}
                <div className="progress-info">
                  <h3>Social Media Advertisement</h3>
                  <p>
                    Amplify your reach through our Social Media Advertisement
                    services.
                  </p>
                </div>
                {/*progress-info*/}
              </div>
              {/*progress-info-col*/}
            </div>
            {/*expand-img-info-col*/}
            <div className="clear" />
            {/*clear*/}
          </section>
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
          <section id="project">
            <div className="text-center">
              <h5 className="common-h5">FEATURED PROJECTS</h5>
              <h2 className="common-h2">Our Case Studies</h2>
            </div>
            <div className="owl-carousel owl-theme">
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-one.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-two.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-three.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-four.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-one.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="owl-img-par">
                  <img
                    src="images/portfolio/portfolio-two.jpg"
                    className="img-responsive"
                  />
                  <div className="owl-img-info">
                    <h3>SEO</h3>
                    <p>Marketing</p>
                  </div>
                </div>
              </div>
            </div>
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
                  <p>₹2450</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                  </ul>
                </div>
                {/*price-list*/}
                <button type="button" className="price-btn">
                  Get Started
                </button>
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="basic-price-col rec-price">
              <div className="basic-price-info">
                <h4>Standart Plan</h4>
                <div className="price">
                  <p>₹2450</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                  </ul>
                </div>
                {/*price-list*/}
                <button type="button" className="price-btn">
                  Get Started
                </button>
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="basic-price-col">
              <div className="basic-price-info">
                <h4>Premium Plan</h4>
                <div className="price">
                  <p>₹2450</p>
                </div>
                {/*price*/}
                <div className="price-list">
                  <ul>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                    <li>SEO Audits</li>
                  </ul>
                </div>
                {/*price-list*/}
                <button type="button" className="price-btn">
                  Get Started
                </button>
              </div>
              {/*basic-price-info*/}
            </div>
            {/*basic-price-col*/}
            <div className="clear" />
          </section>
          <section id="blog">
            <div className="text-center">
              <h5 className="common-h5">BLOG</h5>
              <h2 className="common-h2">Read Our Lates News</h2>
            </div>
            <div className="container">
              <div className="blog-col">
                <img
                  src="images/blog/blog-4.jpg"
                  alt="blog4"
                  className="img-responsive"
                />
                <span>May 16 2020</span>
                <h3>
                  Assam’s Entrepreneurial Revolution: Mukhyamantri Sva-Niyojan
                  Yojana Unveiled
                </h3>
                <a href="#">Read More</a>
              </div>
              {/*blog-col*/}
              <div className="blog-col">
                <img
                  src="images/blog/blog-2.jpg"
                  alt="blog1"
                  className="img-responsive"
                />
                <span>May 16 2020</span>
                <h3>How to Increase Your ROI Through scientific SEM?</h3>
                <a href="#">Read More</a>
              </div>
              {/*blog-col*/}
              <div className="blog-col">
                <img
                  src="images/blog/blog-3.jpg"
                  alt="blog1"
                  className="img-responsive"
                />
                <span>May 16 2020</span>
                <h3>How to Increase Your ROI Through scientific SEM?</h3>
                <a href="#">Read More</a>
              </div>
              {/*blog-col*/}
              <div className="clear" />
            </div>
            {/*container*/}
          </section>
          <section id="contact">
            <div className="container">
              <div className="form-par">
                <h2>Get IN Touch With US !</h2>
                <form>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="f-name form-com"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="em-input form-com"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="phone-input form-com"
                    placeholder="Mobile No"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Website"
                    className="web-input form-com"
                  />
                  <input
                    type="submit"
                    defaultValue="submit"
                    className="submit-btn"
                  />
                </form>
              </div>
            </div>
            {/*container*/}
          </section>
          {/*contact*/}

          <script src="js/jquery-ui.min.js" />
          <script src="js/extrenaljq.js" type="text/javascript" />
        </section>
      </div>
    </Layout>
  );
};

export default Home;
