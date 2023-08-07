import Footer from '../components/footer';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
  title: 'Rainbow Creators',
  description: 'The landing page of all LGBTQIA+ content creators.'
}

const formatViewerCount = (count) => {
  if (count < 1000) {
    return count;
  } else {
    const countInK = (count / 1000).toFixed(1);
    return `${countInK}K`;
  }
};

const truncateTitle = (str) => {
  if (str.length > 75) {
    return str.substring(0, 75) + "...";
  } else {
    return str;
  }
};

async function getStreams(){
  const apiURL = `http://localhost:3000/api/twitch`
  const res = await fetch(apiURL);

  const data = await res.json();
  return data.data;
}

export default async function Page() {
  const streams = await getStreams();
  return (
    <>
      <Header subTitle="The landing page of all LGBTQIA+ content creators" />
      <main>
        <section>
          <article>
            <div className="container">
              <div className="row">
                {streams.map((stream) => (
                    <div className="col-lg-4 d-flex align-items-stretch" key={stream.id}>
                      <div className="card">
                        <div className='card-header'><b>{stream.display_name}</b></div>
                        <div className='card-img-caption'>
                          <p className='card-text'><FontAwesomeIcon icon={faEye} className="me-1" /> {formatViewerCount(stream.viewer_count)}</p>
                          <img src={stream.thumbnail_url.replace("-{width}x{height}", "")} className="card-img-top rounded-0" alt="..." />
                        </div>
                        <div className="card-body justify-content-between d-flex flex-column">
                          <p className="card-text">{truncateTitle(stream.title)}</p>
                          <div>
                            <a href={`https://twitch.tv/${stream.broadcaster_login}`} target='_blank' className="btn btn-dark btn-sm mt-auto">
                              <FontAwesomeIcon icon={faPlay} className="me-2" />
                              Watch the live
                            </a>
                          </div>
                        </div>
                        <div className="card-footer text-body-secondary">
                          {stream.game_name}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}