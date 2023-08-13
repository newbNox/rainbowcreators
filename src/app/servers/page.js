import {Metadata} from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import rustImg from '../../public/rust_header.webp'
import { Montserrat } from 'next/font/google'
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import CopyToClipboardButton from '../../components/copyToClipboard';
import { getApiUrl } from '../lib/getApiUrl';

const montserrat = Montserrat({
  weight: ["900"],
  style: 'italic',
  subsets: ["latin"],
  display: "swap"
})

export const metadata = {
  title: 'Rainbow Creators : Servers',
  description: 'Our community servers for you to play on and enjoy.'
}

async function getServerData(){
    const apiPath = "rust";
    const apiURL = await getApiUrl(apiPath);
    const res = await fetch(apiURL, {
      next: {revalidate: 300}
    });

    const data = await res.json();

    return data;
}

export default async function Page() {
    //const serverData = await getServerData(); <--- This needs fixing so we can get some dynamic server information
    return (
      <>
        <Header subTitle="Our community servers for you to play on"/>
        <main>
          <section className='container-fluid'>
            <article>
                <h1 className='headline'>Rainbow Creators Official Community Servers</h1>
                <p>All of our servers are open to everyone without needing to fill out any whitelist forms.</p>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col align-self-start">
                      <div className="card" style={{width: "30rem"}}>
                        <div className='card-img-caption'>
                            <p className='card-text online'><FontAwesomeIcon icon={faWifi} /> Online</p>
                            <p className={"card-title " + montserrat.className}>[EU] Rust Rainbow | 2x | SOLO / DUO</p>
                            <Image src={rustImg} width="1000" height="150" className="card-img-top" alt="..."/>
                        </div>
                        <div className="card-body">
                          <p className="card-text"></p>
                        </div>
                        <div className="card-footer text-body-secondary">
                          <CopyToClipboardButton text="rust.rainbowcreators.live"/> IP: rust.rainbowcreators.live
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