import Footer from '../components/footer';
import Header from '../components/header';
import TwitchLiveStreams from '../components/twitchStreams';

export const metadata = {
  title: 'Rainbow Creators',
}

export default function Page() {
  return (
    <>
      <Header subTitle="The landing page of all LGBTQIA+ content creators" />
      <main>
        <section>
          <article>
            <TwitchLiveStreams tag='LGBTQIA' />
          </article>
        </section>
      </main>
      <Footer/>
    </>
  );
}