import {Metadata} from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
  title: 'Rainbow Creators : Partner program',
}

export default function Page() {
    return (
      <>
        <Header subTitle="Partner program is made for you"/>
        <main>
          <section>
            <article>
                <h1>Partner program is our way of giving you your own customizable space in our page.</h1>
                <p>
                    Even though the it is called "Partner program", we want to think of it as symbiosis. Giving you the space to promote your love of this community and to connect with people alike. As our partner you get full control over your little space on our page, able to connect your Discord community and other fun stuff!
                </p>
                <hr />
                <div className="container text-center">
                  <div className="row row-eq-height row-eq-height-xs features featuredItems">
                    <div className="col-xl-3 col-md-6">
                      <div className='feature feature-xs-left'>
                        <div className='feature-icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 576 512"><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"/></svg>
                        </div>
                        <div className='feature-content'>
                          <div className='feature-title'>Top of the page</div>
                          <div className='feature-desc'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </article>
          </section>
        </main>
        <Footer />
      </>
    );
  }