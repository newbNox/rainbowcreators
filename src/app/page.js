import Footer from '../components/footer';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getApiUrl } from './functions/getApiUrl';

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
  const apiPath = "twitch";
  const apiURL = await getApiUrl(apiPath);
  const res = await fetch(apiURL, {
    next: {revalidate: 300}
  });

  const entry = await res.json();
  return entry;
}

export default async function Page() {
  const liveData = await getStreams();
  return (
    <>
      <Header subTitle="The landing page of all LGBTQIA+ content creators" />
      <main>
        <section>
          <article>
            <h1 className='headline text-center'>RANDOM PICKS LIVE NOW</h1>
            <div className="container">
              <hr />
              <div className="row">
              {liveData.map((entry, index) => (
                <div className="col-lg-4 d-flex align-items-stretch" key={index}>
                  <div className="card">
                    <div className='card-header'><b>{entry.channel.display_name}</b></div>
                    <div className='card-img-caption'>
                    {entry.stream ? (
                        <>
                          <p className='card-text'><FontAwesomeIcon icon={faEye} className="me-1" /> {formatViewerCount(entry.stream.viewer_count)}</p>
                          <img src={entry.stream.thumbnail_url.replace("-{width}x{height}", "")} className="card-img-top rounded-0" alt="..." />
                        </>
                      ) : (
                        <img src={entry.channel.thumbnail_url.replace("-{width}x{height}", "")} className="card-img-top rounded-0" alt="..." />
                    )}
                    </div>
                    <div className="card-body justify-content-between d-flex flex-column">
                      <p className="card-text">{truncateTitle(entry.stream ? entry.stream.title : entry.channel.title)}</p>
                      <div>
                        {entry.stream && (
                          <a href={`https://twitch.tv/${entry.stream.user_name}`} target='_blank' className="btn btn-dark btn-sm mt-auto">
                            <FontAwesomeIcon icon={faPlay} className="me-2" />
                            Watch the live
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="card-footer text-body-secondary">
                      {entry.stream ? entry.stream.game_name : entry.channel.game_name}
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