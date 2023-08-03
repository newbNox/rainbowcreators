import {Metadata} from 'next/head';
import Header from '../../components/header';

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
            </article>
          </section>
        </main>
      </>
    );
  }